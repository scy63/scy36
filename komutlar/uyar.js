const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
var prefix = ayarlar.prefix;
module.exports.run = async (bot, message, args) => {
  if (!message.member.roles.find("id", "681901236823392371"))
    return message.channel.send(
      "Bu komutu kullanabilmek için gerekli yetkiye sahip görünmüyorsun"
    ).then(msg => msg.delete(5000));
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);
  if (!user) return message.reply("Kime Uyarı Rolü Vermek İstersin?");
  //1//                                   //2//                                   //3//
  let sebep = args[1];
  if (!sebep) return message.reply("Sebep Yazman Gerek.");

  user.addRole("681901238819881047");

  const ky = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setDescription(
      ` <a:uyar:682209547011751936> ${user}, Adlı Kullanıcı **"${sebep}"** Sebebiyle ** Uyarı** Almış Bulunmakta. \n <a:uyar:682209547011751936> Devam Ettirdiği Takdirde Karantinaya Atılacaktır.`
    )
    .setColor("#f80000")
    .setTimestamp();
  message.channel.send(ky);

  let sa = new Discord.RichEmbed()
    .setColor("#ffa0a0")
    .setDescription(
      ` <a:uyar:682209547011751936> Merhaba ${user},ꁮ  Imperial  Sunucusunda  **"${sebep}"** Sebebiyle **Uyarı** Aldınız. \n <a:uyar:682209547011751936> Uyarı Rolünü Veren  Yetkili İse ${message.author.tag}`
    )
    .setFooter(`Adalet Mülkün Temelidir.`);
  user.send(sa);

  const sChannel = message.guild.channels.find(
    c => c.name === "cezalı-log"
  );
  let modlog = new Discord.RichEmbed()
    .setColor("#ffa0a0")
    .setDescription(
      ` <a:uyar:682209547011751936> ${user}, Adlı Kullanıcı **"${sebep}"** Sebebiyle **Uyarı** Almıştır. \n Uyarı Veren Yetkili ${message.author.tag}`
    )
    .setFooter(`Adalet Mülkün Temelidir.`);
  sChannel.send(modlog);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["uyarı"],
  permLevel: 0
};
exports.help = {
  name: "uyar",
  description: "uyarı 1 2 3 veya karantina veriri.",
  usage: "ewq"
};
