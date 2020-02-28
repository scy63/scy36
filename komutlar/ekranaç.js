const Discord = require('discord.js');

exports.run = (client, message, args, msg) => {
            if (message.channel.type === "dm") return;  

  if(message.author.bot || message.channel.type === "dm") return;
  const voiceChannel = message.member.voiceChannel;
  if (!voiceChannel) return message.channel.send("Lütfen Bir Odaya Giriniz");
  return message.channel.send (
      new Discord.RichEmbed().setDescription(
      `[Lütfen Buraya Tıklayınız](https://discordapp.com/channels/${message.guild.id}/${
          voiceChannel.id
      }) Ekranın Açıldığı Kanal - '${voiceChannel.name}'`
      )
  );
  
  };
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yayınaç', 'canlıaç'],
  permLevel: 2
};

exports.help = {
  name: 'ekranaç',
};