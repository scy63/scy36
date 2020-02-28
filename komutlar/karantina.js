const Discord = require("discord.js");
const ms = require("ms");


module.exports.run = async (bot, message, args) => {
if (message.channel.type == "dm") return;


if(!message.member.roles.has("681901236823392371")) return message.channel.send(`Bu komudu kullanabilmek için gerekli yetkiye sahip görünmüyorsun!`).then(msg => msg.delete(5000));

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Bu Komutu Kullanmak İçin : jail <Kullanıcı> <Süre> Olarak Yazmalısınız.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Hata: Kişiyi jaile atamıyorum yetkim yetmiyor! ");
let muterole = message.guild.roles.find(r => r.name === "Silivri");

  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Silivri",
        color: "#ac6c6c",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          CONNECT: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  let mutetime = args[1];
  if(!mutetime) return message.reply("Bu komutu kullanmak için .jail @<Kullanıcı> <Süre> <sebep> olarak yazmalısınız.");

  await(tomute.addRole(muterole.id));
  message.reply(`Tarafından <@${tomute.id}> kişisi  **${ms(ms(mutetime))}**  süresiyle karantinaya atıldı!`);
                    tomute.send(`<@${tomute.id}> **ᴳᴼᴰ †** Adlı Sunucuda **\`${ms(ms(mutetime))}\`** Süresiyle Karantinaya Atıldın Bir Yanlışlık Olduğunu Düşünüyorsan Yetkiliye Yazabilirsin.`)

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> Adlı Kişinin Cezası Dolduğu İçin Karantina'dan Çıkarıldı.`);
                        tomute.send(`<@${tomute.id}> **ᴳᴼᴰ †** ᴳᴼᴰ † Adlı Sunucuda Karantina Süren Doldu Konuşmaya Devam edebilirsin.`)

  }, ms(mutetime));

}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['karantina'],
  permLevel: 0
};

exports.help = {
  name: 'jail',
  description: 'Bir kullanıcıyı belirtilen süreyle susturur.',
  usage: 'jail @Kullanıcı -süre-'
};