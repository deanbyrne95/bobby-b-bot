const Discord = require("discord.js");
const quotes = require("./quotes.json");
const keywords = require("./keywords.json");
const activities = require("./activities.json");

const client = new Discord.Client();

client.on("ready", () => {
    const activity = JSON.parse(getRandomArrayItem(activities.activity));
    client.user.setActivity(activity.name, { type: activity.type });
})

client.on("message", function (message) {
    if (message.author.bot) return;
    const fixedMessage = message.content.toLowerCase();
    const triggered = keywords.some(word => fixedMessage.includes(word.toLowerCase()));
    if (!triggered) {
        return;
    }
    message.react("👑");
    message.channel.send(getRandomQuote());
});


function getRandomQuote() {
    return getRandomArrayItem(quotes);
}

function getRandomArrayItem(array) {
    const rand = JSON.stringify(array[Math.floor(Math.random() * array.length)]);
    return rand;
}


// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret