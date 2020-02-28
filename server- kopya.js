const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./ayarlar.json');
const chalk = require('chalk');
const ms = require("parse-ms");
const fs = require('fs');
const moment = require('moment');
const db = require('quick.db')
require('./util/eventLoader')(client);

var prefix = settings.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


function cpanel1() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`670700416815726623`).setName(`💫  ⸶ ᴰᵂᴬᴿᴷᴬ   `);
            cpanel2();
        }, 3000);
      });
}

  function cpanel2() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`670700416815726623`).setName(`⸶ ᴰᵂᴬᴿᴷᴬ  Families 💕 `);
            cpanel3();
        }, 3000);
      });
  }
  function cpanel3() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`670700416815726623`).setName(`🔥 Ateş  `);
            cpanel1();
        }, 3000); //Hızı düşürmeyin
      });
  }
 
 client.on('ready', async message => {
   cpanel1();
 })

client.on('message', async message => {
   if(message.author.bot || message.channel.type === "dm") return;
            if(message.content.includes('discord.gg')){ 
              [message.channel.bulkDelete(1),message.reply("** Discord linki atamazsın. **").then(msg => msg.delete(9000))]
        if(!message.channel.guild) return;
        message.delete()
          var command = message.content.split(" ")[0];
       }
})
	client.on("messageDelete", async (message, channel) => {
if(message.author.bot || message.channel.type === "dm") return;
  
  if (message.author.bot) return;
  
  var user = message.author;
  
  let sChannel2 = message.guild.channels.find(c => c.name === "silinen-mesaj")
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`Mesaj silindi.`, message.author.avatarURL)
  .addField("Kullanıcı Tag", message.author.tag, true)
  .addField("Kanal Adı", message.channel.name, true)
  .addField("Silinen Mesaj", "```" + message.content + "```")
  .setThumbnail(message.author.avatarURL)
  .setFooter(`Bilgilendirme  • bügün saat ${message.createdAt.getHours()+3}:${message.createdAt.getMinutes()}`, `${client.user.displayAvatarURL}`)
  sChannel2.send(embed);
  
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
if(newMessage.author.bot || newMessage.channel.type === "dm") return;
  let sChannel3 = newMessage.guild.channels.find(c => c.name === "guncellenen-mesaj")
  if (oldMessage.content == newMessage.content) return;
  let embed = new Discord.RichEmbed()
  .setColor("BLUE")
  .setAuthor(`Mesaj Düzenlendi`, newMessage.author.avatarURL)
  .addField("Kullanıcı", newMessage.author)
  .addField("Eski Mesaj", oldMessage.content, true)
  .addField("Yeni Mesaj", newMessage.content, true)
  .addField("Kanal Adı", newMessage.channel.name, true)
  .setThumbnail(newMessage.author.avatarURL)
  .setFooter(`Bilgilendirme  • bügün saat ${newMessage.createdAt.getHours()+3}:${newMessage.createdAt.getMinutes()}`, `${client.user.displayAvatarURL}`)
  sChannel3.send(embed)
});
module.exports = async (member, client) => {
  let tag = await db.fetch(`tag_${member.guild.id}`);
  let tagyazi;
  if (tag == null) tagyazi = member.setNickname(`${member.user.username}`)
  else tagyazi = member.setNickname(`${tag} | ${member.user.username}`)
};

module.exports = async (member, client) => {
  let tag = await db.fetch(`tag_${member.guild.id}`);
  let tagyazi;
  if (tag == null) tagyazi = member.setNickname(`${member.user.username}`)
  else tagyazi = member.setNickname(`${tag} | ${member.user.username}`)
};

client.on("message", message => {
    if (message.channel.type === "dm") {
        if (message.author.bot) return;
        const dmlog = new Discord.RichEmbed()
         .setTitle(`${client.user.username} - Dm Mesaj`)
         .setColor('RANDOM')
        .addField("Mesajı Gönderen:",` **${message.author}**`)
        .addField(`ID'si`, message.author.id)
        .addField(`**Gönderilen Mesaj**`, message.content)
        .setThumbnail(message.author.avatarURL) 
        .setTimestamp()
        
   client.channels.get("638506946487517245").send(dmlog);
  }
 });





// client.on("userUpdate", function(oldUser, newUser){

  //    if(oldUser.username !== newUser.username) {
//   v     let takmaad =  client.guilds.get("634437923500195853").members.get(newUser.id).displayName
// let kanal =client.channels.get('634438768551526427')
// 
    //     if(!newUser.username.includes("★") && client.guilds.get("634437923500195853").members.get(newUser.id).roles.has("634438732006817800")) {
     //       if(!client.guilds.get("634437923500195853").members.get(newUser.id).removeRole("634438732006817800")) return 
     //      client.guilds.get("634437923500195853").members.get(newUser.id).removeRole("634438732006817800")
     //      
    //         let değişeceksembol1 = takmaad.replace(/taglı sembol/g, "X");
   // v         client.guilds.get("634437923500195853").members.get(newUser.id).setNickname(değişeceksembol1)   
    //         kanal.send(`**${newUser}, "⛥" tagını çıkardığı için Bot tarafından <@&634438732006817800> rolü alındı!**`)
       
    //     } 
     //     if(newUser.username.includes("⛥") && !client.guilds.get("634437923500195853").members.get(newUser.id).roles.has("634438732006817800")) {
         
  //        
  //          if(!client.guilds.get("634437923500195853").members.get(newUser.id).addRole("634438732006817800"))   return 
 //  v          client.guilds.get("634437923500195853").members.get(newUser.id).addRole("634438732006817800")
  //           let değişeceksembol2 = takmaad.replace(/tagsız sembol/g, "XX");//amk kodu
 //            client.guilds.get("634437923500195853").members.get(newUser.id).setNickname(değişeceksembol2)    
 //           kanal.send(`**${newUser}, "⛥" tagını aldığı için Bot tarafından <@&634438732006817800> rolü verildi!**`) 
//         
//          }
 // //      }
//          })

/*

------------------------------------
client.on("userUpdate", async(old, nev) => {
  if(old.username !== nev.username) {
  if(!nev.username.includes("⸶") && client.guilds.get("631268400081141760").members.get(nev.id).roles.has("631269151603949568")) {
    client.guilds.get("631268400081141760").members.get(nev.id).removeRole("631269151603949568")
    client.channels.get('638506945090945074').send(`**${nev}, **"⸶"** tagını çıkardığı için Ðark Place †   tarafından <@&631269151603949568> rolü alındı!**`)
    } 
     if(nev.username.includes("⸶") && !client.guilds.get("631268400081141760").members.get(nev.id).roles.has("631269151603949568")) {
    client.channels.get('638506945090945074').send(`**${nev}, **"⸶"** tagını aldığı için Ðark Place †  tarafından <@&631269151603949568> rolü verildi!**`) 
   client.guilds.get("631268400081141760").members.get(nev.id).addRole("631269151603949568")
     }
}
  })
  -----------------------------------------
*/

	

///////////////////////////////////////////////////////////////////////////////////RENK KODLARI///////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////OTO CEVAP/////////////////////////////////////////////////////////////////


client.on('message', async message => {
   if(message.author.bot || message.channel.type === "dm") return;
            if(message.content.toLowerCase() === ('!tag')){ 
              [message.channel.send("**⸶**")] 
       }
})

client.on('message', async message => {
   if(message.author.bot || message.channel.type === "dm") return;
            if(message.content.toLowerCase() === ('!link')){ 
              [message.channel.send('https://discord.gg/Gjp2xKE')] 
       }
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const invites = {};


const wait = require('util').promisify(setTimeout);

client.on('ready', () => {

  wait(1000);


  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});


client.on('guildMemberAdd', member => {
  


    const kanall = member.guild.channels.get("637419513410879521")
    
    if (!kanall) {

}

  member.guild.fetchInvites().then(guildInvites => {
    
    const ei = invites[member.guild.id];
  
    invites[member.guild.id] = guildInvites;
 
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);

    const davetçi = client.users.get(invite.inviter.id);
 
             var zaman = new Date();
       var kullaniciBilgisi = member.user.createdAt;
       if(zaman.getMonth() === kullaniciBilgisi.getMonth() && zaman.getFullYear() === kullaniciBilgisi.getFullYear() && zaman.getDay() === kullaniciBilgisi.getDay()){
            member.addRole(member.guild.roles.get("637385938334384161"), "Çünkü güvenli değil.");
            member.removeRole(member.guild.roles.get("637385939496468493"), "Çünkü güvenli değil Kayıtsız");
       member.guild.channels.get("634806560182239252").send(member.user + ' adlı hesap reklam hesabı olabilir Jaile atıyorum Haberiniz olsun. <@&637385929887186974>');
               const wtfaga = new Discord.RichEmbed()
      .setColor("AQUA")
       .setDescription(` <a:notick:637420793545883650> Hoşgeldin, <@${member.user.id}> Seninle ${member.guild.members.size}** Kişiyiz!\n <a:uyar:637420869937004564> Kaydının yapılması için sesli odaya gelip ses vermen gerekli.\n <a:notick:637420793545883650> Kayıt sorumluları seninle ilgilenecektir.\n <a:uyar:637420869937004564> Kayıt Sorumluların robot olmadığından emin olup lütfen beklemede kalın.\n Kurallar'ı okumayı ihmal etmeyin <#637385957787697171>.\n <@&637385929887186974> \n <a:notick:637420793545883650> <@${member.user.id}>  Adlı kişiyi davet eden kullanıcı <@${davetçi.id}>  **__${invite.uses}__ adet daveti var.** \n <a:tiks:637420580626235413> **__Yeni açılmış hesap tespit edildi.__`);
    client.channels.get("637385955929751554").send(wtfaga)
       member.send(` Sunucuda hesabınız yeni olduğu için Hapishaneye atıldınız.  \n  Bir yetkiliye ulaşıp sunucuya giriş yapabilirsiniz.`)
        }
        else{
      const himt = new Discord.RichEmbed()
      .setColor("AQUA")
       .setDescription(` <a:selam:637421616804134933> Hoşgeldin, <@${member.user.id}> Seninle ${member.guild.members.size}** Kişiyiz!\n <a:tiks:637420580626235413> Kaydının yapılması için sesli odaya gelip ses vermen gerekli.\n <a:kalp:637421680381132817> Kayıt sorumluları seninle ilgilenecektir.\n <a:yldz:637420654974599175> Kayıt Sorumluların robot olmadığından emin olup lütfen beklemede kalın.\n  <a:ok:637421645384122370>  <#637385957787697171> Kanalından Kurallar'ı okumayı ihmal etmeyin. \n <@&637385929887186974> \n <a:kalp:637421680381132817> <@${member.user.id}>  Adlı kişiyi davet eden kullanıcı <@${davetçi.id}> **${invite.uses} ** adet daveti var.** \n <a:tiks:637420580626235413> Hesap Güvenli.`);
    client.channels.get("637385955929751554").send(himt)
    member.addRole("637385939496468493")
        }
    
  const anan = new Discord.RichEmbed()
  .setColor(0x36393E)
  .setDescription(`\`\`${member.user.tag}\`\` **adlı kullanıcı sunucuya katıldı. \n Davet eden kullanıcı:** \`\`${davetçi.tag}\`\` \n(\`\`${invite.uses}\`\` **adet daveti var** )`)
  kanall.send(anan)
    

  })
}); 


client.on('guildMemberAdd', member => {
  member.setNickname(`Ðρ † ${member.user.username}`);
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const express = require('express');
const app = express();
const http = require('http');
    app.get("/", (request, response) => {
    console.log(` az önce pinglenmedi. Sonra ponglanmadı... ya da başka bir şeyler olmadı.`);
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);

//////////////


client.on('guildMemberAdd',async member => {
  
  const kanall = member.guild.channels.get("669960911704031243")///güvenlik kanalı
  let user = client.users.get(member.id);
  
  
  ///kanal a
  const embed = new Discord.RichEmbed()
  .setColor('RED')
  .setAuthor('Şüpheli Uyarısı',member.user.avatarURL)
  .setDescription(` <a:notick:638521823621021716> Hoşgeldin, <@${member.user.id}> Seninle ${member.guild.members.size}** Kişiyiz!\n <a:uyar:638521973428715540> Kaydının yapılması için sesli odaya gelip ses vermen gerekli.\n <a:notick:638521823621021716> Kayıt sorumluları seninle ilgilenecektir.\n <a:uyar:638521973428715540> Kayıt Sorumluların robot olmadığından emin olup lütfen beklemede kalın.\n Kurallar'ı okumayı ihmal etmeyin <#631269188979261447>.\n <@&631269147527086090> \n <a:notick:638521823621021716>  \n <a:uyar:638521973428715540> **__Yeni açılmış hesap tespit edildi.__`);
  
  //kullanıcıya
  const embed2 = new Discord.RichEmbed()
  .setColor('RED')
  .setAuthor('! Hesap Güvenliği !',member.user.avatarURL)
  .setDescription(`Selam **${user.username}**, \nHesabın 3 günden az bir süre içerisinde açıldığından dolayı cezalı permi verildi.`)
  
  

    const t = new Date().getTime() - user.createdAt.getTime();
    const gün = moment(t).format('dddd');  
      if (t < 259200000)  {
      user.send(embed2)
      member.addRole("669960654643265556")
      member.removeRole("669960669013213219")
      kanall.send(embed)
}else{
    if (t > 259200000)     
  client.channels.get("669960925654024203").send(` ** <a:tik:670617111478927392> Hoşgeldin, <@${member.user.id}> Seninle **${member.guild.members.size}** Kişiyiz!\n
<a:loading:670707173839339550> Kaydının yapılması için sesli odaya gelip ses vermen gerekli.\n 
<a:dnya:670612632927076392> <@&669960649899769891> seninle ilgilenecektir.\n  
<a:tik:670617111478927392>   Kayıt Sorumluların robot olmadığından emin olup lütfen beklemede kalın.\n 
<a:dnenmor:670612628934230017>  <#669960947158220830> Kanalından Kurallar'ı okumayı ihmal etmeyin. \n
a:tik:670617111478927392> __Hesap Güvenli__. **`);
  member.addRole("669960669013213219")
  member.send(" **⸶ Dwarka Sunucusuna Hoşgeldin, **⸶** Tagını Alarak Bizlere Destek Olabilirsin. ** ")

}
});




/////////////////

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === settings.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});


client.login(settings.token);
