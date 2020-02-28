const Discord = require("discord.js");

exports.run = async (client, message, args) => {
              if (message.channel.type === "dm") return;  
  if (!message.member.roles.has("681901240422236177"))
        return message.channel.send(`Bu Komutu Kullanmak için gerekli yetkiye sahip görünmüyorsun! `).then(msg => msg.delete(5000)); 
  let member = message.mentions.members.first();
  let isim = args.slice(1).join(" ");
let yaş = args.slice(1).join(" | ");
  if (!member) return message.channel.send("Bir üye etiketlemelisin");
  if (!isim) return message.channel.send("Bir isim yazmalısın");
  if (!yaş) return message.channel.send("Bir yaş yazmalısın")
  member.setNickname(`ꁮ ${yaş}`);
  const embed = new Discord.RichEmbed()
    .addField(
      `• Eylem Nick Değiştirme.`,
      `Nicki Değiştirilen kullanıcı : ${member.user} \n Yeni kullanıcı adı : \`ꁮ ${yaş}\``
    )

    .setFooter(`Değiştiren Yetkili ${message.author.tag}`, message.author.avatarURL)
    .setThumbnail(member.user.avatarURL);
  message.channel.send(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["isim"],
  permLevel: 0
};
exports.help = {
  name: "nick",
  description: "Birinin nickini değiştirir.",
  usage: "nick <yeni nick>"
};
