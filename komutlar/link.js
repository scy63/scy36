const Discord = require("discord.js");

exports.run = (client, message, args) => {
            if (message.channel.type === "dm") return;  
  message.delete();
  if (!message.member.hasPermission("CREATE_INSTANT_INVITE")) return;
  message.channel.createInvite({maxAge: 0}).then(invite => {
    message.react("tiks")
    let embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(`**Sunucumuzun Davet Linki Dostlarına Atarak Bize Destek Olabilirsin**: ${invite}`);
    message.channel.send(embed).then(message => message.delete(10000));
  });
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['https://discord.gg/3M9q85J','https://discord.gg/3M9q85J','https://discord.gg/3M9q85J'],
  permLevel: 0
};

exports.help = {
  name: 'link',
  description: 'Sunucu Davet link.',
  usage: 'https://discord.gg/3M9q85J'
};