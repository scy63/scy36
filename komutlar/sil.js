const Discord = require('discord.js');
exports.run = function(client, message, args) {
  if(message.author.bot || message.channel.type === "dm") return;

  if (!message.guild) {
    return message.author.send('temizle komutu sadece sunucularda kullanılabilir.');
  }
  let mesajsayisi = parseInt(args.join(' '));
  if (isNaN(args[0])) {
            message.reply("Kaç mesaj sileceğimi belirtmedin.")
            return
        }

        if (args[0].length > 99) {
            message.channel.send(" 99'dan fazla mesaj silemem.")
            return
        }
  message.channel.bulkDelete(mesajsayisi + 1);
  message.channel.send('' + mesajsayisi + ' Adet Mesajı Temizledim <a:tiks:682209623054614569>  ')
  message.react('682209623054614569')

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'sil',
  description: 'Belirlenen miktar mesajı siler.',
  usage: 'temizle <temizlenecek mesaj sayısı>'
};