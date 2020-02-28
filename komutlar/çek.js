const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  if (!message.member.roles.has("681901240422236177"))
           return message.channel.send(`Bu Komutu Kullanmak için gerekli yetkiye sahip görünmüyorsun! `).then(msg => msg.delete(5000)); 

  if (!message.member.voiceChannel) {
    return message.channel.send("Ses kanalında olman lazım!");
  }
  let kullanıcı = message.mentions.users.first();
  if (!kullanıcı)
    return message.channel.send("**Kullanıcıyı etiketlemelisin.**");
  let rol = message.mentions.roles.first();
  let member = message.guild.member(kullanıcı);
  if (!member.voiceChannel)
    return message.channel
      .send("Etiketlenen kullanıcı bir ses kanalında değil")
      .then(m => m.delete(5000));
  const voiceChannel = message.member.voiceChannel.id;
  if (!voiceChannel) return;
  member.setVoiceChannel(voiceChannel);
  message.react("");
  const voiceChannel1 = message.member.voiceChannel.name;
  let embed = new Discord.RichEmbed()
    .setColor("#000000")
    .setDescription(
      message.author +
        " **Tarafından** " +
        kullanıcı +
        " **Kullanıcısı** `" +
        voiceChannel1 +
        "`** Sesli Kanalına Çekildi.**"
    )
    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
    .setTimestamp();
  message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  kategori: "KULLANICI KOMUTLARI",
  permLevel: 0
};
exports.help = {
  name: "çek",
  description: " ",
  usage: "çek"
};
