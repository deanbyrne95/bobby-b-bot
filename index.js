const Discord = require("discord.js");
const quotes = require("./quotes.json");

const client = new Discord.Client();
const keywords = ["Robert", "Bobby"];
const activities_list = ["with Bessies Tits", "King of the Seven Kingdoms"];

client.on("ready", () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        client.user.setActivity(activities_list[index]);
    }, 10000);
})

client.on("message", function(message) { 
    if (message.author.bot) return;
    const fixedMessage = message.content.toLowerCase();
    const triggered = keywords.some(word => fixedMessage.includes(word.toLowerCase()));
    if (!triggered) {
        console.log("NOT TRIGGERED!");
        return;
    }
    
    message.channel.send(get_random_quote());
});

function get_random_quote() {
     // Returns random quote from quotes file
     var random = quotes.quote[Math.floor(Math.random() * quotes.quote.length)];
     console.log(random);
     return random;
}

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret