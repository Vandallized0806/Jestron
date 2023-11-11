const { Client, Events, GatewayIntentBits } = require(`discord.js`);

const express = require('express');


const Discord = require("discord.js");
const Canvacord = require("canvacord");
const client = new Discord.Client({intents: ['Guilds', 'GuildMessages', 'MessageContent', `GuildMembers`]});
allowedMentions: { parse: ['users'] } 
const fs = require("fs");
const prefix = "J!";
client.commands = new Discord.Collection();
const commands = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"));
for (file of commands) {
    const commandName = file.split(".")[0]
    const command = require(`./Commands/${commandName}`)
    client.commands.set(commandName, command)
}
client.on('ready', () => {
        console.log(`Jestron is running in ${client.user.tag}`);
  });
  

client.on('guildMemberAdd', async member => {
    if (member.guild.id != '1157857065893642252') return;    

    const WELCOMEchannel = member.guild.channels.cache.get('1161446921106366507'); 
    const welcome = "https://media.discordapp.net/attachments/1157857066912841791/1165722725361393734/welcome.jpg?ex=6547e2e3&is=65356de3&hm=ad1ae9510ad9ee077f009134&="
    const welcomeCard = new Canvacord.Welcomer()
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator)
        .setMemberCount(member.guild.memberCount)
        .setAvatar(member.user.displayAvatarURL({ format: 'png' }))
        .setColor("border", "#f50000")
        .setColor("username-box", "#0a0000")
        .setColor("discriminator-box", "#006aff")
        .setColor("message-box", "#002aff")
        .setColor("title", "#002aff")
        .setColor("avatar", "#002aff")
        .setBackground(`https://image.freepik.com/free-vector/golden-bright-shining-light-effect-with-stars-background_110633-521.jpg`)

    const card = await welcomeCard.build();

    const attachment = new Discord.AttachmentBuilder(card, welcome);

    WELCOMEchannel.send({
        content: `Welcome to our server, for the amazing Discord bot Jestron, ${member.user}!`,
        files: [attachment],
    });
});

client.on('guildMemberRemove', async member => {
    if (member.guild.id != '1157857065893642252') return;    

    const BYEchannel = member.guild.channels.cache.get('1165688168876621874'); 
    const bye = "||https://media.discordapp.net/attachments/1157857066912841791/1165721764320530463/Bye.jpg?ex=6547e1fe&is=65356cfe&hm=245b65ba4331f332297712c80fd445a5a9cd172ba649ad0194c30ab1b5f18b62&=||"
    const goodbyeCard = new Canvacord.Leaver()
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator)
        .setMemberCount(member.guild.memberCount)
        .setAvatar(member.user.displayAvatarURL({ format: 'png' }))
        .setColor("border", "#f50000")
        .setColor("username-box", "#0a0000")
        .setColor("discriminator-box", "#006aff")
        .setColor("message-box", "#002aff")
        .setColor("title", "#002aff")
        .setColor("avatar", "#002aff")
        .setBackground(`https://image.freepik.com/free-vector/golden-bright-shining-light-effect-with-stars-background_110633-521.jpg`);

    const theCard = await goodbyeCard.build();

    const byeAttachment = new Discord.AttachmentBuilder(theCard, bye);

    BYEchannel.send({
        content: `We are sorry to see you go, ${member.user}!`,
        files: [byeAttachment],
    });
});







client.on("messageCreate", message => {
    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const commandName = args.shift()
        const command = client.commands.get(commandName)
        if (!command) return
        command.run(client, message, args)
    }
  if (message.content.startsWith("!")) {
    const WRONGPREFIX = "!"
    const CORRECTPREFIX = "J!"
    message.reply(`My prefix is ${CORRECTPREFIX} not ${WRONGPREFIX}`)
  }
})

client.on('ready', async () => {
     client.user.setActivity({name: `Happy Spook-tober 🎃 | J!about/J!help`, type: Discord.ActivityType.Playing})
   }
)

client.login(process.env.token)
