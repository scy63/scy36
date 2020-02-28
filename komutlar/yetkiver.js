const Discord = require('discord.js');

exports.run = async(client, message, args, ops, member) => {
            if (message.channel.type === "dm") return;  
    const emoji = (client.emojis.find("name", "tiks"))
    let verifyroless = message.guild.roles.find(`id`, "676807990321348619");
    if (!message.member.roles.find("id", "676807990321348619")) {
        return message.channel.send(`Bu Komutu Kullanmak için **⸶ Yetki Alım** Rolüne Sahip Olman Lazım `) 
    }

    let toverify = message.guild.member(message.mentions.users.first());
    let vUser = message.guild.member(message.mentions.users.first());
    let user = message.mentions.users.first();
   message.react(emoji);
  vUser.addRole('676808008206123028')
  vUser.addRole('676808008206123028')
    
  
  

  let embed = new Discord.RichEmbed() 
  .setColor('#3f0a47')
  .setDescription( `${vUser} adlı Kullanıcıya <@&676808008206123028> <@&676808008206123028> adlı roller verildi.${emoji}`)
  message.channel.send(embed)
 
  let embed2 = new Discord.RichEmbed() 
  .setColor('#3f0a47')
  .setDescription( `${vUser} Tebrikler ᴳᴼᴰ † sunucuda yetkili oldun!.${emoji}`)
   vUser.send(embed2)
  
  
const sChannel = message.guild.channels.find(c=> c.name ==="kayıt-log")
  let modlog = new Discord.RichEmbed() 
  .setColor('BLACK')
    .setDescription( `${vUser} adlı Kullanıcıya <@&676808008206123028> <@&676808008206123028> adlı roller verildi.${emoji} \n\n İşlemi Gerçekleştiren Yetkili : ${message.author.tag} ${emoji}`)
.setFooter(`Developer - Sadist`)
   sChannel.send(modlog)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yetki'],
};

exports.help = {
  name: 'yetki-ver',
  description: 'Kullanıcı İçin Doğrulandı Rolünü Verir.',
  usage: 'erkek'
};
