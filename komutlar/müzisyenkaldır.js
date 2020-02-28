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
 vUser.removeRole('681901251901915147')
  
  let embed = new Discord.RichEmbed() 
  .setColor('#01fce4')
  .setDescription( `${vUser} adlı Kullanıcıya <@&681901251901915147> adlı rol alındı.${emoji}`)
  message.channel.send(embed)
 
const sChannel = message.guild.channels.find(c=> c.name ==="│kayıt-log")
  let modlog = new Discord.RichEmbed() 
  .setColor('#01fce4')
    .setDescription(` ${vUser} adlı Kullanıcının <@&681901251901915147> adlı rol alındı.${emoji} \n\n İşlemi Gerçekleştiren Yetkili : ${message.author.tag} ${emoji} `)
.setFooter(`Developer - Scy`)
   sChannel.send(modlog)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
};

exports.help = {
  name: 'vocalkaldır',
  description: 'Kullanıcı İçin Doğrulandı Rolünü Verir.',
  usage: 'erkek'
};
