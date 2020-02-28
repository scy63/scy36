const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const http = require("http");
const express = require("express");
require("./util/eventLoader")(client);
const path = require("path");
const request = require("request");
const snekfetch = require("snekfetch");
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
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
    } catch (e) {
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
    } catch (e) {
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
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);
0;

/*/
client.on("message", msg => {
  if (msg.content.toLowerCase() === "!tag") {
    msg.reply("ꁮ");
  }
});




/*/
/*/hg
client.on("guildMemberAdd", member => {
  let emb = new Discord.RichEmbed()
    .setImage(
      "https://cdn.discordapp.com/attachments/645788983233609738/670641327897051136/sunucu_pp.gif"
    )
    .setColor("BLACK");
  member.guild.channels
    .get("676808218344685578")
    .send(
      ` <a:ameteratsuerdm:679382349154091009> **Hoşgeldin, <@${member.user.id}> Seninle Beraber ``${member.guild.members.size}`` Kişiyiz!**\n<a:sharingan:679382238231789568> **Kaydının yapılması için sesli odaya gelip ses vermen gerekli.**\n<a:ameteratsuerdm:679382349154091009> <@&669960649899769891> **Rolündeki Yetkililer Seninle İlgilencektir.** \n<a:sharingan:679382238231789568>**Şimdiden iyi eğlenceler !tag yazarak tagımızı alabilir ve ailemize katılabilirsin.** `,
      emb
    );
  var rol = member.guild.roles.get("676808017869668396");
  member.addRole(rol.id);
});
/*/



client.on('ready', () => {

  setInterval(() => {

    let guild = client.guilds.get("681896321883570181")

    let voiceChannels = guild.channels.filter(c => c.type === 'voice')
    let count = 0
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size

    let kız = guild.roles.find(x => x.name === '│Angels')
    let erkek = guild.roles.find(x => x.name === 'ꇁ Man')
    let kayıtsız = guild.roles.find(x => x.name === 'Member')
    let taglı = guild.roles.find(x => x.name === 'ꇁ Neopotia Family')
    let booster = guild.roles.find(x => x.name === 'Imperial Booster')

    let say = new Discord.RichEmbed()
    .setColor(`#36393F`)
    .setThumbnail(guild.iconURL)
    .setImage(`https://cdn.discordapp.com/attachments/682330301111861302/682330415830532099/1.gif`)
    .setDescription(`
<a:aleria_ok:680463395354574899> **Toplam Üye:** \`${guild.members.size}\`
<a:aleria_ok:680463395354574899> **Çevrimiçi Üye:** \`${guild.members.filter(member => member.presence.status !== 'offline').size}\`
<a:aleria_ok:680463395354574899> **Sesli Üye:** \`${count}\`

<a:aleria_boost:668382691711909908> **Booster Üye:** \`${booster.members.size}\`
<a:aleria_kristal:668382729783738388> **Taglı Üye:** \`${taglı.members.size}\`

<a:aleria_kirmiziyildiz:682327439816392871> **Kız Üye:** \`${kız.members.size}\`
<a:aleria_maviyildiz:682327426226847756> **Erkek Üye:** \`${erkek.members.size}\`

<a:aleria_cehennem:666665712642818050> **Kayıtsız Üye:** \`${kayıtsız.members.size}\``)

    client.channels.get(`682708264009334936`).fetchMessage(`682575684199120919`).then(msg => (msg.edit(say)))

  }, 15000)
});






client.on('ready', ()=>{
client.channels.get('681901622447702084').join()
})