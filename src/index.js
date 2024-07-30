const { Client, IntentsBitField, EmbedBuilder, ActivityType } = require('discord.js');
const eventhandler = require('./handlers/eventhandler');
require('dotenv').config();
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

// let status=[
//     {
//         name:"my first bot",
//         type:ActivityType.Streaming,
//         url:'https://www.youtube.com/watch?v=OqxHy8sCtvA&list=PLpmb-7WxPhe0ZVpH9pxT5MtC4heqej8Es&index=6'

//     },
//     {
//         name:"custom status 1",

//     },
//     {
//         name:"custom status 2",
//         type:ActivityType.Watching,


//     }
// ]

// Handle client ready event
// client.on('ready', () => {
//     console.log(`Logged in as ${client.user.tag}!`);
//   //status of bot what it is doing
//     setInterval(() => {
//         let random=Math.floor(Math.random()*status.length)
//         client.user.setActivity(status[random]);
//     }, 10000);
// });


// client.on('messageCreate', (message) => {
//     if (message.author.bot){
//         return;
//     }


//     if (message.content==='hello'){
//         message.reply('hey!')
//      }
// });

// //replyig to messages
// client.on('interactionCreate',(interaction)=>{
//     if(!interaction.isChatInputCommand())
//     return;

//     if(interaction.commandName==='hey'){
//         interaction.reply('hey! ')
//     }
// })
// //making of embeds
// client.on('interactionCreate',(interaction)=>{
//     if(!interaction.isChatInputCommand())
//     return;

//     if(interaction.commandName==='embed'){
//         const embed=new EmbedBuilder()
//         .setTitle("embed title")
//         .setDescription('this is an embed description')
//         .setColor('Random')
//         .addFields({name:'field title',value:'some random value',inline:true})
//     interaction.reply({embeds:[embed]})
//     }

// })


// //addition of numbers
// client.on('interactionCreate',(interaction)=>{
//     if(!interaction.isChatInputCommand())
//     return;
// })
//     if(interaction.commandName==='add'){
//         const num1=interaction.options.get('first-number').value;
//         const num2=interaction.options.get('second-number').value;
//         interaction.reply(`the sum is ${num1+num2}`)
//     }

// })

// //selection of roles
// client.on('interactionCreate',async(interaction)=>{
//     try {
//         if(!interaction.isButton())
//     return;
//     await interaction.deferReply({ephemeral : true});



//     const role=interaction.guild.roles.cache.get(interaction.customId)
//     if(!role){
//         interaction.editReply(
//             {
//                 content:'i couldnt find that role',

//             }

//         )
//         return;
//     }

//     const hasRole=interaction.member.roles.cache.has(role.id);

//         await interaction.member.roles.remove(role);
//         await interaction.editReply(`the roles ${role} has been removed`);
//         return;
//     }

//     await interaction.member.roles.add(role);
//     await interaction.editReply(`the roles ${role} has been added`);

//     } catch (error) {
//         console.log(error)
//     }
// })

client.on('interactionCreate', async interaction => {
    console.log('Interaction received:', interaction.commandName); // Log when interaction is received

    try {
        const commandHandler = require('./events/interactioncreate/handlecommands'); // Correct path based on structure
 // Adjust the path if necessary
        await commandHandler(client, interaction);
    } catch (error) {
        console.error('Error handling interaction:', error);
    }
});

//handling events
eventhandler(client);

// // Login to Discord with the token
client.login(process.env.BOT_TOKEN)
    .catch(error => {
        console.error('Login failed:', error);
    });