const Discord = require("discord.js");
const bot = new Discord.Client();

// bot_textID dank_memes channel
var bot_textID = "test_memes";

// Ow3 memes channel
var OwID = "memes";    

// Channels to vote with te16 up & down emojis.
var te16Channels = ["dank_memes", "politik", "original_memes"];

// Game variables
var nameBank = [];
var cashBank = [];



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

 
  
    if(message.content.match("pop")){
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
    // Roulette Game


    if(message.content.startsWith("!wire") == true){
        
        var firstSpaceWire = message.content.indexOf(" ");
        var lastSpaceWire = message.content.lastIndexOf(" ");

        var wirePlayer = message.content.substring(firstSpaceWire + 1, lastSpaceWire);
        var wireAmount = message.content.substring(lastSpaceWire) -1;
        
        

        console.log();
        console.log("Wire Player: " + wirePlayer);
        console.log("Wire Amount: " + wireAmount);

    }


    if(message.content.startsWith("!play") == true){
          
        
        var lastSpace = message.content.lastIndexOf(" ");
        var choosenGame = message.content.substring(lastSpace + 1);

        if(choosenGame.toLowerCase() == "roulette"){
           
            var playerName = message.author.username;

            
            if(nameBank.indexOf(playerName) == -1){
                // New play, set up profile.
                nameBank.push(playerName);
                cashBank.push(1000);

                var savedNamePos = nameBank.indexOf(playerName);
                var playerBank = cashBank[savedNamePos];

                message.channel.send(playerName + " has registered to play Roulette! <:red_poker:364233887204769793> <:green_poker:364233886680743937> <:black_poker:364233886726619147>\n\nBank: <:gold_poker:364233886601052162>**" + playerBank + "** \n" +
                "```Type !roll [amount] [ Red (x2) | Black (x2) | Green x (14) ] \nex. roll 150 on red: !roulette 150 red" + "```\n");





            

            } else {
                // Old player
                var savedNamePos = nameBank.indexOf(playerName);
                var playerBank = cashBank[savedNamePos];

                message.channel.send(playerName + " status. <:red_poker:364233887204769793> <:green_poker:364233886680743937> <:black_poker:364233886726619147>\n\nBank: <:gold_poker:364233886601052162>**" + playerBank + "** \n" +
                "```Type !roll [amount] [ Red (x2) | Black (x2) | Green x (14) ] \nex. roll 150 on red: !roulette 150 red" + "```\n");
                
            }
            return;
        }
            
        message.channel.send("There is currently only one game:\n**Roulette:**\n\n```Commands:\n!play roulette - Register to play, then you can roll-on!\n!roll [amount] [ Red (x2) | Black (x2) | Green x (14)] - roll with your credits!\n!bank - See your bank, and how much money you have left...\n!leaderboard - See the leaderboard for the roulette mini-game.\n ```");
        console.log(message.author.username + " used !play");
    }

    if(message.content.startsWith("!roll") == true || message.content.startsWith("roll") == true){ 

        var playerName = message.author.username;  




        if(nameBank.indexOf(playerName) == -1){

        var playerName = message.author.username;

            
        if(nameBank.indexOf(playerName) == -1){
                // New play, set up profile.
                nameBank.push(playerName);
                cashBank.push(1000);

                var savedNamePos = nameBank.indexOf(playerName);
                var playerBank = cashBank[savedNamePos];

                message.channel.send(playerName + " has registered to play Roulette! <:red_poker:364233887204769793> <:green_poker:364233886680743937> <:black_poker:364233886726619147>\n\nBank: <:gold_poker:364233886601052162>**" + playerBank + "** \n" +
                "```Type !roll [amount] [ Red (x2) | Black (x2) | Green x (14) ] \nex. roll 150 on red: !roulette 150 red" + "```\n");
            }
        }
        
        var savedNamePos = nameBank.indexOf(playerName);
        var playerBank = cashBank[savedNamePos];
        
        

        var firstSpace = message.content.indexOf(" ");
        var lastSpace = message.content.lastIndexOf(" ");

        var gambleAmount = message.content.substring(firstSpace, lastSpace);

        if(gambleAmount == " all"){
            gambleAmount = playerBank;
        } else {
            gambleAmount = Math.floor(gambleAmount);
        }
            
        var bet = message.content.substring(lastSpace + 1).toLowerCase();
        var betColor;
        var winMultiplier = 2;
        
        

        var moneyWon;


        
        
        if(bet == "black" || bet == "red" || bet == "green"){
            // Correct bet was entered.
        } else {
        
            
            message.reply("You entered the wrong value for roll. => [ Red (x2) | Black (x2) | Green x (14)]");
            return;
        }
        
        
        

        if(gambleAmount > playerBank){
            
            message.reply("You tried to roll "+ gambleAmount + ". But you only have " + playerBank + ".");
            return;
        }


        if(gambleAmount < 1){
            
            message.reply("Minimum betting amount is 1 Credit.");
            return;
        }

        if(isFinite(gambleAmount) == false){
         
           message.reply("The betting amount must be a number.");
            return;
        }

      

        

        playerBank = playerBank - gambleAmount;
       
        // 1-7 = red, 8-14 = black, 0 = green.

        var roll = Math.floor(Math.random()*14)
   
        
        if (roll != 0 || roll <= 7){
        
            betColor = "red";
            winMultiplier = 2;
            chipEmoji = "<:red_poker:364233887204769793>";
        }

        if(roll == 0){
           
            betColor = "green";
            winMultiplier = 14;
            chipEmoji = "<:green_poker:364233886680743937>";
        }
        
        if(roll >= 8){
          
            betColor = "black";
            winMultiplier = 2;
            chipEmoji = "<:black_poker:364233886726619147>";
        }

        var playerAt = "<@" + message.author.id + ">";
        if (bet == betColor){
            // Player won
            
            playerBank = playerBank + gambleAmount * winMultiplier;
            moneyWon = gambleAmount * winMultiplier - gambleAmount;
           
            

            console.log("ROULETTE: " + playerName + " won " + moneyWon + ". Betted " + gambleAmount);
            message.channel.send(" " + chipEmoji + chipEmoji + chipEmoji + "***" + playerAt + " won " + moneyWon + "! *** (Placed: "+ gambleAmount +", on: " + bet.toUpperCase() + ") The roulette rolled " + roll + " " + "\nBank: " + playerBank + "<:gold_poker:364233886601052162>");

        } else if (bet != betColor) {
            // You lost
            console.log("ROULETTE: " + playerName + " lost " + gambleAmount);
            message.channel.send(" " + chipEmoji + playerAt + " lost " + gambleAmount + " (Placed: "+ gambleAmount +", on: " + bet.toUpperCase() + ")  The roulette rolled " + roll + "\nBank: " + playerBank + "<:gold_poker:364233886601052162>");
        }
        
       
        if(playerBank == 0){
            var rockBottom = true;
        }
        cashBank[savedNamePos] = playerBank;
        
        if(rockBottom == true){
            message.reply("You reached 0. You have no more money left. Wait until the bot is restarted, or we invent a new feature to gain credits back. :( . \nBank: " + playerBank + "<:gold_poker:364233886601052162>");
        }
        
        
        message.delete();

        
    }

    if(message.content.startsWith("!bank") == true){

        var playerName = message.author.username;  
        var savedNamePos = nameBank.indexOf(playerName);
        var playerBank = cashBank[savedNamePos];

        if(savedNamePos !== -1){
        message.channel.send("Bank for " + playerName + ".\n**<:gold_poker:364233886601052162>" + playerBank + "**");
        } else {
            message.channel.send(playerName + " is not registered as a player. Play the game by typing !play roulette");
        }
    }


    if(message.content.startsWith("!leaderboard") == true || message.content.startsWith("!lead") == true){

        var tempCashBank = cashBank.slice();

        findTopFive();

        var firstPlaceMoney = tempCashBank[0];
        var secondPlaceMoney = tempCashBank[1];
        var thirdPlaceMoney = tempCashBank[2];

        firstPlace = cashBank.indexOf(firstPlaceMoney);
        secondPlace = cashBank.indexOf(secondPlaceMoney);
        thirdPlace = cashBank.indexOf(thirdPlaceMoney);

        firstPlace = nameBank[firstPlace];
        secondPlace = nameBank[secondPlace];
        thirdPlace = nameBank[thirdPlace];

        if(firstPlace == undefined){
            message.channel.send("There are no current records this session. Start playing and be number one ```\n!play roulette```");
            return;
        }

        if(secondPlace == undefined){
            secondPlaceMoney = "?";
            secondPlace = "?"
        }
        if(thirdPlace == undefined){
            thirdPlaceMoney = "?";
            thirdPlace = "?"
        }

        // Display leaderboard:

        message.channel.send("***Leaderboard for Roulette:***\n<:gold_poker:364233886601052162>** 1. " + firstPlace + " - " + 
        firstPlaceMoney + "** \n<:silver_poker:364271767860019201> 2." + secondPlace + " - " + secondPlaceMoney + 
        "\n<:bronze_poker:364271767901962241> 3." + thirdPlace + " - " + thirdPlaceMoney + "\n```Play: !play roulette```");




        function findTopFive(){
            tempCashBank .sort(function(a,b){
                  if(a < b){ return 1; } 
                  else if(a == b) { return 0; } 
                  else { return -1; }
              });
          }
    }
})



bot.login("token");
console.log("Bot is turned on ( ͡° ͜ʖ ͡°)");
