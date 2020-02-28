const Discord = require('discord.js');

exports.run = async(client, message, args, ops, member) => {
            if (message.channel.type === "dm") return;  
    const emoji = (client.emojis.find("name", "tiks"))
    let verifyroless = message.guild.roles.find(`id`, "681901240422236177");
    if (!message.member.roles.find("id", "681901240422236177")) {
        return message.channel.send(`Bu Komutu Kullanmak için gerekli yetkiye sahip görünmüyorsun! `).then(msg => msg.delete(5000));
    }

    let toverify = message.guild.member(message.mentions.users.first());
    let vUser = message.guild.member(message.mentions.users.first());
    let user = message.mentions.users.first();
   message.react(emoji);
  vUser.addRole('681901243605844115')
  vUser.addRole('681901261846741103')
  vUser.addRole('681901263021277242')
  vUser.removeRole("681901244302098526")
  vUser.removeRole("681901264006545420")
  vUser.removeRole("681901264706994285")  
  vUser.removeRole('681901244880912531')
    
  
  

  let embed = new Discord.RichEmbed() 
  .setColor('#fbb2b6')
  .setDescription( `${vUser} adlı Kullanıcıya <@&681901243605844115> adlı rol verildi.${emoji}`)
  message.channel.send(embed)
 
  let embed2 = new Discord.RichEmbed() 
  .setColor('#fbb2b6')
  .setDescription( `${vUser} adlı Kullanıcı Olarak **Kadın** Rolüyle giriş yaptınız .${emoji}`)
   vUser.send(embed2)
  
  
const sChannel = message.guild.channels.find(c=> c.name ==="│kayıt-log")
  let modlog = new Discord.RichEmbed() 
  .setColor('BLACK')
    .setDescription( `${vUser} adlı Kullanıcıya <@&681901243605844115> adlı rol verildi.${emoji} \n\n İşlemi Gerçekleştiren Yetkili : ${message.author.tag} ${emoji}`)
.setFooter(`Developer - Scinêly`)
   sChannel.send(modlog)
  
  
  
  
  
    const çenıl = message.guild.channels.find(c=> c.name ==="general-chat")
  let scinely = new Discord.RichEmbed() 
  .setColor('BLACK')
    .setDescription( `${vUser} Hoşgeldin,Seninle birlikte, ${message.guild.memberCount} üyeye ulaştık.\n<#681901364800127000> odasından kurallara bakmayı unutma. ${emoji}`)
.setFooter(`Developer - Scinely`)
   çenıl.send(scinely)
  
  
  
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['k'],
};

exports.help = {
  name: 'kadın',
  description: 'Kullanıcı İçin Doğrulandı Rolünü Verir.',
  usage: 'erkek'
};
