const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const filter = m => m.content.includes("discord");
module.exports.run = async (client, message, args) => {
  const msg = message;
  const reactionFilter = (reaction, user) => {
    return (
      ["682209562866090004"].includes(reaction.emoji.id) &&
      user.id === msg.mentions.users.first().id
    );
    return (
      ["681050348387172513"].includes(reaction.emoji.id) &&
      user.id === msg.mentions.users.first().id
    );
  };
  if (!msg.mentions.users.first())
    return message.channel
      .send(
        new Discord.RichEmbed()
          .setDescription(`Gitmek İstediğin Kullanıcıyı Etiketlemelisin.`)
          .setColor("RANDOM")
      )
      .then(m => m.delete(5000));
  if (msg.mentions.users.first().id === "673966717277569038")
    return message.channel
      .send(
        new Discord.RichEmbed()
          .setDescription(` Birdaha Bunu Deneme..`)
          .setColor("AQUA")
      )
      .then(m => m.delete(3000));
  msg.channel
    .send(
      new Discord.RichEmbed()
        .setDescription(
          `${msg.author} Adlı Kullanıcı Bulunduğunuz Sesli Kanalına Gelmek İstiyor Kabul Ediyor Musunuz?`
        )
        .setColor("RANDOM")
        .setAuthor(`${message.guild.name}`, `${message.guild.iconURL}`)
    )
    .then(async asd => {
      await asd.react("682209562866090004");
      await asd.react("682209563470200913");
      asd
        .awaitReactions(reactionFilter, {
          max: 1,
          emoji: client.emojis.get("682209563470200913"),
          time: 15000,
          errors: [`emoji`, "time"]
        })
        .then(async c => {
          if (!msg.guild.member(msg.mentions.users.first()).voiceChannel) {
            msg.channel.send(
              new Discord.RichEmbed()
                .setDescription(
                  `Kullanıcı İsteği Kabul Etti Fakat Bir Ses Kanalında Değil..`
                )
                .setColor("BLACK")
            );
            return;
          }
          await msg.member
            .setVoiceChannel(
              msg.guild.member(msg.mentions.users.first()).voiceChannelID
            )
            .then(msg => msg.delete());
        })
        .catch(async e => {
          await asd.delete();
        });
    });
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["gıt"],
  permLevel: 3,
  kategori: "sunucu"
};

exports.help = {
  name: "git",
  description: "",
  usage: ""
};
