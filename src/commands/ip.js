const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
        .setDescription("WantedNetwork")
        .setColor("#ff0000")
        .setThumbnail(bicon)
        .addField("Het IP van WantedNetwork is:", "play.wantednetwork.net");

    message.channel.send(botembed);
}

module.exports.help = {
    name:"ip"
}
