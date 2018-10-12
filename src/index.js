const Discord = require("discord.js")
const config = require("./config.json")
const bot = new Discord.Client();
const fs = require("fs");
bot.commands = new Discord.Collection();
if(config.token === "tokenhere") return console.log("Go to https://www.discordapp.com/developers and generate a token for this bot");

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });

});


bot.on("ready", () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("!help | WantedNetwork", {type: "PLAYING"});

});

bot.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    let content = message.content.split(" ");
    let command = content[0];
    let args = content.slice(1);
    let prefix = config.prefix;
    
    let commandfile = bot.commands.get(command.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
})


bot.login(config.token)
