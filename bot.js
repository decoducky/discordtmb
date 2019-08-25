var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var recipes = {
    "shield": "https://www.digminecraft.com/armor_recipes/images/make_shield.png",
    "notch-apple": "https://www.digminecraft.com/food_recipes/images/make_golden_apple2.png",
    "golden-apple": "https://i.pinimg.com/originals/b7/ba/3c/b7ba3c7bf80b7719d1f7a003f5f6bba1.png",
    "eye-of-ender": "https://www.dummies.com/wp-content/uploads/449083.image1.jpg",
    "ender-chest": "https://www.dummies.com/wp-content/uploads/449082.image0.jpg",
    "book": "https://bugs.mojang.com/secure/attachment/136052/Book%20Crafting.PNG"
};
var addedgamertags = [];

function sleep(millisecondsToWait) {
    var now = new Date().getTime();
    while (new Date().getTime() < now + millisecondsToWait) {
        /* do nothing; this will exit once it reaches the time limit */
        /* if you want you could do something and exit */
    }
}

var mode = 0;

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.split(' ');
        var cmd = args[0];

        var parone = args[1];
        var partwo = args[2];

        switch (cmd) {
            case '!help':
                if (parone == null) {
                    bot.sendMessage({
                        to: channelID,
                        message: '! for commands like \'help\', and ? for recipes like \'book\''
                    });
                    if (mode == 1) {
                        bot.sendMessage({
                            to: channelID,
                            message: channelID
                        });
                    }
                    break;
                }
                if (parone.substring(0, 1) == '!') {
                    parone = parone.substring(1);
                }
                
                if (mode == 1) {
                    bot.sendMessage({
                        to: channelID,
                        message: channelID
                    });
                }
                
                

                switch (parone) {
                    case 'addgamertag':
                        bot.sendMessage({
                            to: channelID,
                            message: 'To add a gamertag: !addgamertag (gamertag)'
                        });
                        break;
                    case 'help':
                        bot.sendMessage({
                            to: channelID,
                            message: 'The help command.'
                        });
                        break;
                    case 'addrecipe':
                        bot.sendMessage({
                            to: channelID,
                            message: 'To add a recipe like: !addrecipe (recipe name) (url to image of how to make it)'
                        });
                        break;
                    default:
                        bot.sendMessage({
                            to: channelID,
                            message: 'I\'m not sure that command exists.'
                        });
                        break;
                }
                
                // Just add any case commands if you want to..
                break;
            case '!addgamertag':
                if (mode == 1) {
                    bot.sendMessage({
                        to: channelID,
                        message: channelID
                    });
                }
                if (parone != null) {
                    addedgamertags.push(parone);
                    bot.sendMessage({
                        to: channelID,
                        message: 'Added ' + parone + ' gamertag.'
                    });
                }
                else {
                    bot.sendMessage({
                        to: channelID,
                        message: 'You need to add your gamertag like: !addgamertag (gamertag)'
                    });
                }
                break;
            case '!addrecipe':
                if (mode == 1) {
                    bot.sendMessage({
                        to: channelID,
                        message: channelID
                    });
                }
                recipes[parone] = partwo;
                bot.sendMessage({
                    to: channelID,
                    message: 'Added recipe.'
                });
                break;
            case '!leave':
                if (mode == 1) {
                    bot.sendMessage({
                        to: channelID,
                        message: channelID
                    });
                }
                logger.info(recipes);
                if (user = 'SonicThrone59' || user == 'decoducky') {
                    bot.sendMessage({
                        to: channelID,
                        message: 'Logged Off'
                    }
                    );
                    bot.sendMessage();
                }
                break;
            case "!let's-go":
                if (mode == 1) {
                    bot.sendMessage({
                        to: channelID,
                        message: channelID
                    });
                }
                for (var i = 0; i < 100; i++) {
                    bot.sendMessage({
                        to: channelID,
                        message: 'WORLD ' + Math.random()
                    });
                    sleep(1000);
                }
                break;
            case '!mode':
                if (parone == null) {
                    bot.sendMessage({
                        to: channelID,
                        message: 'Current mode is: ' + mode
                    });
                    break;
                }
                var modes = {
                    "normal": 0,
                    "debug": 1
                }
                mode = modes[parone];
                break;

        }

        // Just add any case commands if you want to..
    }


    if (message.substring(0, 1) == '?') {
        if (mode == 1) {
            bot.sendMessage({
                to: channelID,
                message: channelID
            });
        }
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        {
            /*
            switch (cmd) {
                // !ping
                case 'shield':
                    bot.sendMessage({
                        to: channelID,
                        message: '1 iron, and 6 planks'
                    });
                    break;
                case 'sword':
                    bot.sendMessage({
                        to: channelID,
                        message: '2 or either planks, iron, gold, diamond, and 1 stick'
                    });
                    break;
                case 'eyeofender':
                    bot.sendMessage({
                        to: channelID,
                        message: '1 ender pearl, and 1 blaze powder'
                    });
                    break;
                case 'book':
                    bot.sendMessage({
                        to: channelID,
                        message: '3 paper, and 1 leather. Book + Quill you need a ink sac and book'
                    });
                    break;
                case 'boat':
                    bot.sendMessage({
                        to: channelID,
                        message: '5 planks, and 1 wooden shovel'
                    });
                    break;
                case 'map':
                    bot.sendMessage({
                        to: channelID,
                        message: '9 paper'
                    });
                    break;
                case 'notch-apple':
                    bot.sendMessage({
                        to: channelID,
                        message: '72 gold, and 1 apple'
                    });
                    break;
                case 'golden-apple':
                    bot.sendMessage({
                        to: channelID,
                        message: '8 gold, and 1 apple'
                    });
                    break;
                case 'glowstone':
                    bot.sendMessage({
                        to: channelID,
                        message: '9 paper'
                    });
                    break;
                default:
                    bot.sendMessage({
                        to: channelID,
                        message: 'I HAVE\'T LEARNT THAT!!!!!'
                    });
                    
                // Just add any case commands if you want to..
                */
        }
        if (cmd in recipes) {
            bot.sendMessage({
                to: channelID,
                message: recipes[cmd]
            });
        } else {
            bot.sendMessage({
                to: channelID,
                message: 'I cannot do this. If you go tell SonicThrone59, he will see to it.'
            });
        }
    }
    if (message == "world time") {
        bot.sendMessage({
            to: channelID,
            message: 'YES!!!!! Let\'s go!'
        });
    }

    
});
bot.on('guildMemberAdd', function (user, userID, channelID, memeber, evt) {
    bot.sendMessage({
        to: channelID,
        message: 'Hey ' + memeber + ', can you go !addgamertag (your gamertag) for us?'
    });
})