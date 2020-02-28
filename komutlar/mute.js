const Discord = require("discord.js");
const ms = require("ms");
const ayarlar = require("../ayarlar.json");
const prefix = ayarlar.prefix;

var mutelirolu = "Muted";

module.exports.run = async (bot, message, args) => {
  if (message.channel.type === "dm") return;
  if (!message.member.roles.find("id", "681901235648856083"))
    return message.channel.send("**Yeterli yetkiye sahip değilsin**").then(msg => msg.delete(5000));
  let mutekisi = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!mutekisi) return message.reply(`Bir Kullanıcı etiketleyiniz `);
  let muterol = message.guild.roles.find(`name`, mutelirolu);
  if (!muterol) {
    try {
      muterol = await message.guild.createRole({
        name: "mutelirolu",
        color: "#000000",
        permissions: []
      });
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterol, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }
  let mutezaman = args[1]
    .replace(`s`, `s`)
    .replace(`m`, `m`)
    .replace(`h`, `h`)
    .replace(`d`, `d`);

  if (!mutezaman) return message.reply(`Doğru bi zaman gir`);

  let guild = message.guild;
  let reason = args.slice(2).join(" ");
  const member = message.guild.member(mutekisi);
  if (reason.length < 1)
    return message.reply("****Mute Sebebini Yazarmısın ?**");
  if (message.mentions.users.size < 1)
    return message
      .reply("**Kimi Mute atıcağımı Yzarmısın ?**")
      .catch(console.error);
  if (member.hasPermission("ADMINISTRATOR"))
    return message.reply("__Yönetici Bir Kişiyi Muteleyemem__").then(msg => {
      msg.delete(9000), message.delete(9000);
    });

  await mutekisi.addRole(muterol.id);
  message.react("tiks");
  message.channel.send(
    `<@${mutekisi.id}> kullanıcısı __**"${
      args[1]
    }"**__ süresi boyunca __${reason}__ sebebiyle **"Mutelendi"** <a:uyar:682209547011751936>`
  );
  mutekisi.send(
    `**${message.guild.name}** adlı Sunucuda __**"${
      args[1]
    }"**__ süresi boyunca __${reason}__ sebebiyle **"Mutelendiniz"**  <a:uyar:682209547011751936>`
  );
  const sChannel = message.guild.channels.find(c => c.name === "cezalı-log");
  let modlog = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(
      `<@${
        mutekisi.id
      }> adlı kişi Mutelendi <a:uyar:682209547011751936> \n Muteleyen Yetkili: **${
        message.author.username
      }#${
        message.author.discriminator
      }** \n Sebebi : **"${reason}"** \n Zamanı : __**"${args[1]}"**__ `
    )
    .setFooter(``);
  sChannel.send(modlog);

  setTimeout(function() {
    mutekisi.removeRole(muterol.id);
    mutekisi.send(
      `__${message.guild.name}__ adlı sunucudaki **"Mute"** Süreniz sona ermiştir. <a:uyar:682209547011751936>`
    );

    const sChannel = message.guild.channels.find(
      c => c.name === "cezalı-log"
    );
    let modlog = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(
        `<@${mutekisi.id}> adlı Kullanıcının "Mute" süresi doldu <a:uyar:682209547011751936>`
      )
      .setFooter(``);
    sChannel.send(modlog);
  }, ms(mutezaman));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sustur"],
  permLevel: 0
};

exports.help = {
  name: "mute"
};
