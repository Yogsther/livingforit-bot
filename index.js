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

var resetTimer;


bot.on('ready', () => {
    bot.user.setUsername("Livingforit Bot");
    bot.user.setGame("!help | Livingforit.xyz/bot");
  })



bot.on("message", (message) => {

    if(message.author.bot == true){
        return;
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
        message.reply("**I'm working as intended.** *v.0.4* 👌👌👌");
        
    }

    if(message.content == "!help"){
        
        var personalGreeting = randomGreeting("greeting");
        
                message.channel.send({embed: {
                    color: 0xf5db1f,
                    author: {
                      name: "Help - " + personalGreeting,
                      icon_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Info_icon-72a7cf.svg/2000px-Info_icon-72a7cf.svg.png",
                    },
                    title: "Roulette commands",
                    description: "```!roll [amount] [black (x2) | red (x2) | green (x14)]\n!bank - Gives you your bank status!\n!leaderboard - See top 3 wealthiest people on the server.\n!startpot - Start a new jackpot.\n!add [amount] - Bet in on a jackpot.\n!wire [username] [amount] - Send money to another person.\n!moneymaker - Add money to your account by clicking an emote!```",                                                                   
        
                    fields: [
                      {
                        name: "More",
                        value: "[Check out my website!](http://www.Livingforit.xyz/bot)\n[Add me to your server!](https://discordapp.com/oauth2/authorize?client_id=363749001788522496&scope=bot&permissions=1341643969)"
                      },
                      {
                        name: "Other commands",
                        value: "```!help - Gives you this menu.\n!botstatus - Gives you the status of the bot. ```"
                      }
                    ],
                    
                  }
                });
    }
    
    if(message.content.match("<@363749001788522496>") || message.content.match("bot")){
        console.log("Bot was mentioned: " + message);
        message.reply(randomResponse("response"));
    }

    if(message.channel.type == "dm"){
        console.log("Private message recived: " + message);
        message.reply(randomResponse("response"));
    }

    if(message.content == "test"){

        
          
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

var poolActive;
var poolPlayers = [];
var poolMoney = [];

var poolPlayersChance = [];
var poolWinner = [];
var poolWinnerProcentage;

var poolStarter;
var pot;


// Bot on reactions, for money maker & more


bot.on('messageReactionAdd', (reaction, user) => {
         
        if(reaction.emoji.id == "365558365499293696" && user.bot == false){
            moneyMakerAuthor = reaction.message.content;
            moneyMakerAuthor = moneyMakerAuthor.substring(4, moneyMakerAuthor.length - 1);
            // Get account
            var savedNamePos = nameBank.indexOf(moneyMakerAuthor);
            var playerBank = cashBank[savedNamePos];
            // Add money to account
            cashBank[savedNamePos] = playerBank + 1;
        }
    });


bot.on('messageReactionRemove', (reaction, user) => {
        
       if(reaction.emoji.id == "365558365499293696" && user.bot == false){
           moneyMakerAuthor = reaction.message.content;
           moneyMakerAuthor = moneyMakerAuthor.substring(4, moneyMakerAuthor.length - 1);
           // Get account
           var savedNamePos = nameBank.indexOf(moneyMakerAuthor);
           var playerBank = cashBank[savedNamePos];
           // Add money to account
           cashBank[savedNamePos] = playerBank + 1;
       }
   });





bot.on("message", (message) => {
    // Roulette Game
    
    // React with emoji for Money Maker command.
    if(message.author.bot == true && message.content.match("MM-")){
        message.react(":add_money:365558365499293696");
    }
    

    

    // Money Maker 3000^tm
    if(message.content == "!money" || message.content == "!moneymaker"){

        var moneyMakerAuthor = message.author.username;
        var savedNamePos = nameBank.indexOf(moneyMakerAuthor);
        var playerBank = cashBank[savedNamePos];

        if(savedNamePos == -1){
            message.reply("You are not registered and already have 1000 Credits to claim by typing !bank or !roll");
            return;
        }

        // Send the moneymaker
        message.channel.send("*MM-" + message.author.username + "*",{embed: {
            color: 0xe9ce10,
            author: {
              name: "Money Maker 3000™",
              icon_url: "https://i.imgur.com/zKFte2R.png",
            },
            title: "Click the Emote to add credits to " + message.author.username  + "'s account."
          }
        });
        message.delete();
    }

    // Start pool
    if(message.content.startsWith("!startpot") == true || message.content.startsWith("!pot") == true){

        // Reset pool player, and money
        poolPlayers = [];
        poolMoney = [];
        pot = 0;
        
        // Part one pool
        if(poolActive == true){
            message.reply("A pool is already avtive. Try again shortly.");
            message.delete();
            return;
        }

        // Started pool.
        poolActive = true;

        poolStarter = message.author.username;

        

        // First pool send
        message.channel.send(".1", {embed: {
            color: 0xea484d,
            author: {
              name: "Jackpot",
              icon_url: "https://i.imgur.com/RZzp10h.png"
            },
            title: "Jackpot started by " + "test",
          
            description: "type: ```!add [amount] to bet.```",

            
            fields: [{
                name: "Pot",
                value: "test" + " <:gold_poker:364233886601052162>"
              },
              {
                name: "Players entered",
                value: "test"
              },
              {
                name: "Ending",
                value: "test"
              }
            ],
            
          }
        });
        console.log("Pool was started by " + message.author.username + "!");
        message.delete();

        }

        // Part two of pool

        if(message.content.startsWith(".1") == true && message.author.bot == true){
            
            // Set up main variables
            var speed = 3000;
            var redChip = "<:red_poker:364233887204769793>";
            var greenChip = "<:green_poker:364233886680743937>"
            var blackChip = "<:black_poker:364233886726619147>";
            var extraText;
            var numPlayersEntered;
            
           
            numPlayersEntered = poolPlayers.length;


            // Animate 0
            message.edit("",{embed: {
                color: 0xea484d,
                author: {
                  name: "Jackpot",
                  icon_url: "https://i.imgur.com/RZzp10h.png"
                },
                title: "Jackpot started by " + poolStarter,
              
                description: "type: ```!add [amount] to bet.```",
    
                
                fields: [{
                    name: "Pot",
                    value: pot + " <:gold_poker:364233886601052162>"
                  },
                  {
                    name: "Players entered",
                    value: numPlayersEntered
                  },
                  {
                    name: "Ending",
                    value: redChip + redChip + redChip + redChip + redChip
                  }
                ],
                
              }
            });
           
            
            setTimeout(() => { animate1();  }, speed);

            function animate1(){

                // Animate 1

                numPlayersEntered = poolPlayers.length;

                

                // ANIMATE LAYER 01
                message.edit("",{embed: {
                    color: 0xea484d,
                    author: {
                      name: "Jackpot",
                      icon_url: "https://i.imgur.com/RZzp10h.png"
                    },
                    title: "Jackpot started by " + poolStarter,
                  
                    description: "type: ```!add [amount] to bet.```",
        
                    
                    fields: [{
                        name: "Pot",
                        value: pot + " <:gold_poker:364233886601052162>"
                      },
                      {
                        name: "Players entered",
                        value: numPlayersEntered
                      },
                      {
                        name: "Ending",
                        value: greenChip + redChip + redChip + redChip + redChip
                      }
                    ],
                    
                  }
                });


                if(resetTimer == true){
                    
                    resetTimer = false;
                    animate1();
                    return;
                }
                setTimeout(() => { animate2();  }, speed);
            } 
            
            function animate2(){
                numPlayersEntered = poolPlayers.length;
               

                
            // ANIMATE LAYER 03
            message.edit("",{embed: {
                color: 0xea484d,
                author: {
                  name: "Jackpot",
                  icon_url: "https://i.imgur.com/RZzp10h.png"
                },
                title: "Jackpot started by " + poolStarter,
              
                description: "type: ```!add [amount] to bet.```",
    
                
                fields: [{
                    name: "Pot",
                    value: pot + " <:gold_poker:364233886601052162>"
                  },
                  {
                    name: "Players entered",
                    value: numPlayersEntered
                  },
                  {
                    name: "Ending",
                    value: greenChip + greenChip + redChip + redChip + redChip
                  }
                ],
                
              }
            });

             if(resetTimer == true){
                    resetTimer = false;
                    animate1();
                    return;
                }
            setTimeout(() => { animate3();  }, speed);
            }

            function animate3(){
                numPlayersEntered = poolPlayers.length;
                
                
                // ANIMATE LAYER 04
                message.edit("",{embed: {
                    color: 0xea484d,
                    author: {
                      name: "Jackpot",
                      icon_url: "https://i.imgur.com/RZzp10h.png"
                    },
                    title: "Jackpot started by " + poolStarter,
                  
                    description: "type: ```!add [amount] to bet.```",
        
                    
                    fields: [{
                        name: "Pot",
                        value: pot + " <:gold_poker:364233886601052162>"
                      },
                      {
                        name: "Players entered",
                        value: numPlayersEntered
                      },
                      {
                        name: "Ending",
                        value: greenChip + greenChip + greenChip + redChip + redChip
                      }
                    ],
                    
                  }
                });

                 if(resetTimer == true){
                    resetTimer = false;
                    animate1();
                    return;
                }
                setTimeout(() => { animate4();  }, speed);
                }

            function animate4(){
                numPlayersEntered = poolPlayers.length;
              
                
                // ANIMATE LAYER 05
                message.edit("",{embed: {
                    color: 0xea484d,
                    author: {
                      name: "Jackpot",
                      icon_url: "https://i.imgur.com/RZzp10h.png"
                    },
                    title: "Jackpot started by " + poolStarter,
                  
                    description: "type: ```!add [amount] to bet.```",
        
                    
                    fields: [{
                        name: "Pot",
                        value: pot + " <:gold_poker:364233886601052162>"
                      },
                      {
                        name: "Players entered",
                        value: numPlayersEntered
                      },
                      {
                        name: "Ending",
                        value: greenChip + greenChip + greenChip + greenChip + redChip
                      }
                    ],
                    
                  }
                });

                 if(resetTimer == true){
                    resetTimer = false;
                    animate1();
                    return;
                }
                setTimeout(() => { animate5();  }, speed);
                }
            function animate5(){
                numPlayersEntered = poolPlayers.length;
              

                
                // ANIMATE LAYER 06
                message.edit("",{embed: {
                    color: 0xea484d,
                    author: {
                      name: "Jackpot",
                      icon_url: "https://i.imgur.com/RZzp10h.png"
                    },
                    title: "Jackpot started by " + poolStarter,
                  
                    description: "type: ```!add [amount] to bet.```",
                    
                    fields: [{
                        name: "Pot",
                        value: pot + " <:gold_poker:364233886601052162>"
                      },
                      {
                        name: "Players entered",
                        value: numPlayersEntered
                      },
                      {
                        name: "Ending",
                        value: greenChip + greenChip + greenChip + greenChip + greenChip
                      }
                    ],
                    
                  }
                });

                 if(resetTimer == true){
                   resetTimer = false;
                    animate1();
                    return;
                }
                setTimeout(() => { animate6();  }, speed);
                }
            function animate6(){
                
                numPlayersEntered = poolPlayers.length;
              
                // Pick winner

                poolWinner = poolPlayersChance[Math.floor(Math.random()*poolPlayersChance.length)];

                // Give winner the pot

                var poolMoneyPos = nameBank.indexOf(poolWinner);
                var poolWinnerBank = cashBank[poolMoneyPos];
                
                poolWinnerBank = poolWinnerBank + pot;

                cashBank[poolMoneyPos] = poolWinnerBank;

                // Get percentage

                var winnersBetPos = poolPlayers.indexOf(poolWinner);
                var winnerBet = poolMoney[winnersBetPos];

                var winnerPercentage = winnerBet / pot;
                winnerPercentage = winnerPercentage * 100;
                winnerPercentage = Math.round(winnerPercentage);


                // ANIMATE LAYER 07 FINAL REVEAL
                message.edit("",{embed: {
                    color: 0x1c1c1c,
                    author: {
                      name: "Jackpot [OVER]",
                      icon_url: "https://i.imgur.com/SQLMIW4.png"
                    },
                    title: "Jackpot was by " + poolStarter,
                  
                    description: "To start a new jackpot, type: ```!startpot```",
                    
                    fields: [{
                        name: "Pot",
                        value: pot + " <:gold_poker:364233886601052162>"
                      },
                      {
                        name: "Players entered",
                        value: numPlayersEntered
                      },
                      {
                        name: "Winner",
                        value: "**" + poolWinner + " won the pot of ** " + pot + "<:gold_poker:364233886601052162> with a " + winnerPercentage + "% chance!"
                      }
                    ],
                    
                  }
                });
                


                poolActive = false;
                }


                // End of pool and winner will get choosen.
        }


    // Add money to pool

    	if(message.content.startsWith("!add") == true){
        
        if(poolActive != true){
            message.reply("There are no current pots open. Open one by typing !pot");
            return;
        }

        var playerName = message.author.username;
        var savedNamePos = nameBank.indexOf(playerName);
        var playerBank = cashBank[savedNamePos];

        var playerPoolMoney = message.content.lastIndexOf(" ");
        var playerPoolMoney = message.content.substring(playerPoolMoney + 1);

        var playerPoolNamePos = poolPlayers.indexOf(playerName);
        
        if(isFinite(playerPoolMoney) == false){
            message.reply("Value must be a number.");
            message.delete();
            return;
        }

        if(playerPoolMoney > playerBank){
            message.reply("You don't have enough funds to do this.");
            message.delete();
            return;
        }

        if(playerPoolMoney < 10){
            message.reply("Minimum bet is 10<:gold_poker:364233886601052162>");
            message.delete();
            return;
        }
        
        if(playerPoolNamePos != -1){
            // Player adding more.
            var lastDeposit = poolMoney[playerPoolNamePos];
            var newDeposit = Number(lastDeposit) + Number(playerPoolMoney);
            
            poolMoney[playerPoolNamePos] = newDeposit;
            playerBank = playerBank - Number(playerPoolMoney);
            cashBank[savedNamePos] = playerBank;

            message.channel.send(playerName + " added " + playerPoolMoney + "<:gold_poker:364233886601052162> more. Total: " + newDeposit + "<:gold_poker:364233886601052162>");
            console.log(playerName + " added " + newDeposit + " more.");
            
            pot = Number(pot) + Number(playerPoolMoney);

            // Set nameChanseArray
            var times = playerPoolMoney / 10;
            console.log("Times: " + times);
            for(var i=0; i < times; i++){
              poolPlayersChance.push(playerName);
            }
            


            message.delete();
            resetTimer = true;
            return;

        } 

        if(savedNamePos == -1){
            // Register player if he/she is not already.
            nameBank.push(playerName);
            cashBank.push(1000);

            var savedNamePos = nameBank.indexOf(playerName);
            var playerBank = cashBank[savedNamePos];

            
            message.channel.send(playerName + " was registered for Roulette.");
            message.delete();
            
        }
    
        // Clear to enter game.
        
        
        poolPlayers.push(playerName);
        poolMoney.push(Number(playerPoolMoney));

        playerBank = playerBank - playerPoolMoney;
        cashBank[savedNamePos] = playerBank;

        // Set pot
        pot = Number(pot) + Number(playerPoolMoney);

        // Set nameChanseArray
        var times = playerPoolMoney / 10;
        console.log("Times: " + times);
        for(var i=0; i < times; i++){
            poolPlayersChance.push(playerName);
        }
        



        message.channel.send(playerName + " joined in with " + playerPoolMoney + "<:gold_poker:364233886601052162>!");
        console.log(playerName + " joined in with " + playerPoolMoney);
        

        resetTimer = true;

        message.delete();

    }





    if(message.content.startsWith("!wire") == true){
     
        var firstSpaceWire = message.content.indexOf(" ");
        var lastSpaceWire = message.content.lastIndexOf(" ");

        var playerName = message.author.username;
        var wirePlayer = message.content.substring(firstSpaceWire + 1, lastSpaceWire);
        var wireAmount = message.content.substring(lastSpaceWire +1);
        
        // Bank of user sending the money
        var savedNamePos = nameBank.indexOf(playerName);
        var playerBank = cashBank[savedNamePos];

        if(playerName == wirePlayer){
            message.reply("You can't wire money to yourself.");
            return;
        }
       

        if(wireAmount < 1){
            
            message.reply("Minimum wire amount is 1 Credit.");
            return;
        }

        if(isFinite(wireAmount) == false){
         
           message.reply("The wire amount must be a number.");
            return;
        }


        if(savedNamePos == -1){
            message.channel.send("Sorry, you are not registered as a player. '!roll' or '!play roulette' to register.");
            return;
        }

        // Bank of user reciving the money
        var savedNamePosWire = nameBank.indexOf(wirePlayer);
        var wirePlayerBank = cashBank[savedNamePosWire];

        if(savedNamePosWire == -1){
            message.channel.send("Sorry, " + wirePlayer + " is not a registered as a player. '!roll' or '!play roulette' to register.");
            return;
        }

        if(playerBank < wireAmount){
            message.reply("You don't have enough funds to do this.");
            return;
        }

        // Everything is clear, and money is being sent.

        playerBank = playerBank - wireAmount;
        wireAmount = Number(wireAmount);
        wireAmount = Math.round(wireAmount);

        wirePlayerBank = Number(wirePlayerBank) + Number(wireAmount);



        cashBank[savedNamePos] = playerBank;
        cashBank[savedNamePosWire] = wirePlayerBank;


 

        message.channel.send(playerName + " sent " + wireAmount + " <:gold_poker:364233886601052162> => " + wirePlayer + "!");
        console.log(playerName + " sent " + wireAmount + " <:gold_poker:364233886601052162> => " + wirePlayer + "!");

        
        
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
            message.delete();
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
            message.reply("You reached 0. You have no more money left. To add more money, type !moneymaker.");
        }
        
        
        message.delete();

        
    }

    

    if(message.content.startsWith("!bank") == true){

        var playerName = message.author.username;  
        var savedNamePos = nameBank.indexOf(playerName);
        var playerBank = cashBank[savedNamePos];


        if(savedNamePos == -1){
            // Brand new, never saved
            nameBank.push(playerName);
            cashBank.push(1000);

            var savedNamePos = nameBank.indexOf(playerName);
            var playerBank = cashBank[savedNamePos];

            message.channel.send(playerName + " was registered for Roulette.");
    
        }
        // Old player, get bank.
        message.reply("\nBank for " + playerName + ".\n**<:gold_poker:364233886601052162>" + playerBank + "**");
        message.delete();
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
console.log("");
console.log("Livingforit-Bot is turned on.");
console.log("");
console.log("");

