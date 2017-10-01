const Discord = require("discord.js");
const bot = new Discord.Client();

// bot_textID dank_memes channel
var bot_textID = "test_memes";

// Ow3 memes channel
var OwID = "memes";    

// Channels to vote with te16 up & down emojis.
var te16Channels = ["dank_memes", "politik", "original_memes"];

// Game variables
var bank = [];


bot.on('ready', () => {
    bot.user.setGame("Livingforit.xyz/bot");
    bot.user.setUsername("Livingforit Bot");
    bot.user.setAvatar("profile.png");
  })



bot.on("message", (message) => {

    if(message.author.bot) return;

    if(message.content.startsWith("!nick") == true){

        // Change prefix of bot
        var lastSpace = message.content.lastIndexOf(" ");
        var newNick = message.content.substring(lastSpace + 1);
        // Change bot nick
        message.guild.members.get(bot.user.id).setNickname("[" + newNick + "] L.it bot");
        // Log changes
        console.log(message.author.username + " changed the nickname of the bot to " + newNick + ".");

    }    

    if(message.attachments.size > 0 && message.channel.name == bot_textID){
        // Sent message is an image.
        message.react("te16UP:280379483704524810");
        console.log("Added Up");
        setTimeout(() => { message.react("te16DOWN:280380352617250819"); }, 500);
        console.log("Added Down");
        console.log("TEST: An image was sent, and bot reacted with Up & Down");
    }

    if(message.attachments.size > 0 && message.channel.name == OwID){
        // Sent message is an image.
        message.react("overwatch_yes:303270352807788544");
        console.log("Ow3: An image was sent, and bot reacted with Up & Down");
        setTimeout(() => { message.react("overwatch_no:303270352157409300"); }, 500); 
    }

    if(message.attachments.size > 0 && te16Channels.indexOf(message.channel.name) != -1){
        // Sent message is an image.
        message.react("te16UP:280379483704524810");
        console.log(message.channel.name + " : An image was sent, and bot reacted with Up & Down");
        setTimeout(() => { message.react("te16DOWN:280380352617250819"); }, 500);
    }


    if(message.content.match("boi")){
        message.react("🅱");
        setTimeout(() => { message.react("🇴"); }, 500);
        setTimeout(() => { message.react("🇮"); }, 1000);
    }

    if(message.content.match("notu")){
        message.channel.send("Did someone here say **Notu.co?** *aka nut&go 👍, http://www.livingforit.xyz*");
        console.log("Somone, somewhere talked about Notu.co");
        
    }

 
  
    if(message.author.id == 160121235471073291 || message.content.match("pop")){
        message.react("popkrull:329354881238564866");
    }


    if(message.content == "!botstatus"){
        message.reply("**I'm working as intended.** *v.0.1* 👌👌👌");
        
    }

    if(message.content == "!help"){
        
        var personalGreeting = randomGreeting("greeting");
        message.channel.send("**Hello!** " + message.author.username + " ^-^ I'm the Livingfor.it Bot. " + personalGreeting + " What do I do?\n I send both upvotes and downvotes on memes, so people can vote on memes.\n```Commands: \n!help - Gives you this message.\n!botstatus - Tells you the status of the bot. \n!nick [prefix] - Change prefix of the bots nick. \n\nOther features: \nMention notuco in a message, and the bot will strike in and link you to the website. \n\nComing features: \n!meme - sends you a random meme.```\n\nCheck out my website for more information: **http://www.Livingforit.xyz/bot**");
        
    }
    
    if(message.content.match("<@363749001788522496>") || message.content.match("bot")){
        console.log("Bot was mentioned: " + message);
        message.reply(randomResponse("response"));
    }

    if(message.channel.type == "dm"){
        console.log("Private message recived: " + message);
        message.reply(randomResponse("response"));
    }




})






// Generate random response whenever bot is mentioned.
function randomResponse(){
        var allRespons = ["Ok!", "Got it! :ok_hand:", "Understood!", "I feel you.", "I'm with you.", "That is clear." ,
        "I got you homo.", "0100100100100000011101010110111001100100011001010111001001110011011101000110000101101110011001000010111000001010"
        , "I totally understand.", "No.", "Fine.", ":joy: :joy: :joy: :joy:", "Beep Bop", "What's wrong with the classics? I love Hasselhoff!",
        "Hahaha, good one!", "Dude, I'm on it!", "Roger!", "Uhm.. what?", "WHAT?"]
        var response = allRespons[Math.floor(Math.random()*allRespons.length)];
        return response;
}

function randomGreeting(){
    var allGreetings = ["Thanks for asking.", "I thank you.", "I thank you.", "I will help you.", "Let me help you here.", 
    "Listen here boi.", "Sit down.", "Listen closely.", "Listen up homo."]
    var greeting = allGreetings[Math.floor(Math.random()*allGreetings.length)];
    return greeting;
}



bot.on("message", (message) => {
// Play game
    if(message.content.startsWith("!play") == true){
          
        
        var lastSpace = message.content.lastIndexOf(" ");
        var choosenGame = message.content.substring(lastSpace + 1);

        if(choosenGame.toLowerCase() == "gamble"){
           
            var playerName = message.author.username;

            
            if(bank.indexOf(playerName) == -1){
                // New play, set up profile.
                bank.push(playerName);
                bank.push("1000");
                console.log("New player added. Bank: " + bank);
                
                var savedNamePos = bank.indexOf(playerName);
                var savedBankPos = savedNamePos + 1;
                var playerBank = bank[savedBankPos];

                console.log("Registred player found.");
                console.log("Your balance: " + playerBank);
                
                console.log("Type !gamble [amount] [ Red (x2) | Black (x2) | Green x (14)]");


            

            } else {
                // Old player
                var savedNamePos = bank.indexOf(playerName);
                var savedBankPos = savedNamePos + 1;
                var playerBank = bank[savedBankPos];

                console.log("Registred player found.");
                console.log("Your balance: " + playerBank);
                
                console.log("Type !gamble [amount] [ Red (x2) | Black (x2) | Green x (14)]");
                
                
            }
            return;
        }
            
        message.channel.send("Lists of games: Gamble");
        console.log(message.author.username + " used !play");
    }

    if(message.content.startsWith("!gamble") == true){ 
        
        var playerName = message.author.username;  

        var firstSpace = message.content.indexOf(" ");
        var lastSpace = message.content.lastIndexOf(" ");

        var gambleAmount = message.content.substring(firstSpace, lastSpace);
        var bet = message.content.substring(lastSpace).toLowerCase();;

        var savedNamePos = bank.indexOf(playerName);
        var savedBankPos = savedNamePos + 1;
        var playerBank = bank[savedBankPos];

        
        if(bet != "black" || bet != "red" || bet != "green"){
            console.log("Correct Bet was entered.");
        } else {
            console.log("You entered the wrong value for bet. => [ Red (x2) | Black (x2) | Green x (14)]");
            return;
        }
        

        if(Number(gambleAmount) > playerBank){
            console.log("You don't have enough credits to do this.");
            return;
        }


        
        console.log("Registred player found.");
        console.log("Your balance: " + playerBank);

        console.log(gambleAmount);
        console.log(bet);
    }





})

























bot.login("MzYzNzQ5MDAxNzg4NTIyNDk2.DLFvNw.5XoPuHVbu_3VM2UfXHs92HtpkFk");
console.log("Bot is on.");
