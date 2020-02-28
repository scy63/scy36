const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;
module.exports.run = async (bot, message, args) => {
  if (!message.member.roles.find('id', '681901236823392371')) return message.channel.send('Bu komutu kullanabilmek için gerekli yetkiye sahip görünmüyorsun!');
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!user) return message.reply("Kimin Uyarı Rolünü Kaldırmak İstersin?").then(msg => msg.delete(5000));
                             //1//                                   //2//                                   //3//
  let sebep = args[1]
  if(!sebep) return message.reply("Sebep Yazman Gerek.")
    user.removeRole("681901238819881047");
    
     const ky = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(` <a:uyar:682209547011751936> ${user}, Adlı Kullanıcınısının **"${sebep}"** Sebebiyle **Uyarısı** Kalkmıştır. \n <a:uyar:682209547011751936> Umarım Yaptığı Hatanın Yanlış Olduğunu Anlamıştır.`)
        .setColor('#f80000')
        .setTimestamp()
        message.channel.send(ky)

const sChannel = message.guild.channels.find(c=> c.id ==="681088702726144037")
  let modlog = new Discord.RichEmbed() 
  .setColor('#ffa0a0')
  .setDescription(` <a:uyar:682209547011751936> ${user}, Adlı Kullanıcınısının **"${sebep}"** Sebebiyle **Uyarısı** Kalkmıştır. \n Uyarıyı Kaldıran Yetkili ${message.author.tag}`)
  .setFooter(`Adalet Mülkün Temelidir.`)
   sChannel.send(modlog)
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'uyarıkaldır',
  description: 'uyarı 1 2 3 veya karantina veriri.',
  usage: 'ewq'
};
