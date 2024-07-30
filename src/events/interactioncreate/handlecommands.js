const {devs,testServer}=require('../../../config.json');
const getLocalCommand = require('../../utils/getLocalCommand');

module.exports=async(client,interaction)=>{

    if (!interaction.isChatInputCommand())return;

    const localcommands=getLocalCommand();

    try {
        const commandobject=localcommands.find(
            (cmd)=>cmd.name===interaction.commandName
        )

        if(!commandobject)return;

        if(!commandobject.devonly){
            if(!devs.includes(interaction.member.id)){
                interaction.reply({
                    content:'only developers are allowed to ru this command',
                    ephemeral:true,
                });
                return;
            }

        }

        
        if(!commandobject.testonly){
            if(!devs.includes(interaction.member.id)){
                interaction.reply({
                    content:'this command cannot be ran here',
                    ephemeral:true,
                });
                return;
            }
        
        
        }
        if (commandobject.permissionsRequired?.length){
            for(const permission of commandobject.permissionsRequired ){
                if(!interaction.member.permissions.has(permission)){
                    interaction.reply({
                        content:'not enough permission',
                        ephemeral:true,
                    });
                    return;
                }
            }
        }
        if (commandobject.botPermissions?.length){
            for(const permission of commandobject.botPermissions ){
                const bot =interaction.guild.members.me; 

                if(!bot.permissions.has(permission)){
                    interaction.reply({
                        content:'i dont have enough permission',
                        ephemeral:true,
                    });
                    return;
                }
            }
        }
        
        await commandobject.callback(client,interaction)
    
    

}
    catch (error) {
        console.log(error)
    }
   
}
// const { devs, testServer } = require('../../../config.json');
// const getLocalCommand = require('../../utils/getLocalCommand');

// module.exports = async (client, interaction) => {
//     console.log('Interaction received:', interaction.commandName); // Log when interaction is received



//     if (!interaction.isChatInputCommand()) return;

//     const localCommands = getLocalCommand();

//     try {
//         const commandObject = localCommands.find(
//             (cmd) => cmd.name === interaction.commandName
//         );

//         if (!commandObject) return;

//         if (commandObject.devOnly && !devs.includes(interaction.member.id)) {
//             await interaction.reply({
//                 content: 'Only developers are allowed to run this command',
//                 ephemeral: true,
//             });
//             return;
//         }

//         if (commandObject.testOnly && interaction.guild.id !== testServer) {
//             await interaction.reply({
//                 content: 'This command cannot be run here',
//                 ephemeral: true,
//             });
//             return;
//         }

//         if (commandObject.permissionsRequired?.length) {
//             for (const permission of commandObject.permissionsRequired) {
//                 if (!interaction.member.permissions.has(permission)) {
//                     await interaction.reply({
//                         content: 'Not enough permissions',
//                         ephemeral: true,
//                     });
//                     return;
//                 }
//             }
//         }

//         if (commandObject.botPermissions?.length) {
//             for (const permission of commandObject.botPermissions) {
//                 const bot = interaction.guild.members.me;

//                 if (!bot.permissions.has(permission)) {
//                     await interaction.reply({
//                         content: 'I do not have enough permissions',
//                         ephemeral: true,
//                     });
//                     return;
//                 }
//             }
//         }

//         // Defer reply to allow for long-running tasks
//         await interaction.deferReply();
//         await commandObject.callback(client, interaction);
//     } catch (error) {
//         console.log(error);
//         // Ensure the interaction has replied or deferred reply in case of an error
//         if (!interaction.deferred && !interaction.replied) {
//             await interaction.reply({
//                 content: 'An error occurred while processing this command.',
//                 ephemeral: true,
//             });
//         } else if (interaction.deferred && !interaction.replied) {
//             await interaction.editReply('An error occurred while processing this command.');
//         }
//     }
// };
// const { devs, testServer } = require('../../../config.json');
// const getLocalCommands = require('../../utils/getLocalCommands');

// module.exports = async (client, interaction) => {
    
//   if (!interaction.isChatInputCommand()) return;

//   const localCommands = getLocalCommands();

//   try {
//     const commandObject = localCommands.find(
//       (cmd) => cmd.name === interaction.commandName
//     );

//     if (!commandObject) {
//         interaction.reply({
//           content: 'Unknown command.',
//           ephemeral: true,
//         });
//         return;
//       }
//     await interaction.deferReply(); 
//     if (commandObject.devOnly) {
//       if (!devs.includes(interaction.member.id)) {
//         interaction.editReply({
//           content: 'Only developers are allowed to run this command.',
//           ephemeral: true,
//         });
//         return;
//       }
//     }

//     if (commandObject.testOnly) {
//       if (!(interaction.guild.id === testServer)) {
//         interaction.editReply({
//           content: 'This command cannot be ran here.',
//           ephemeral: true,
//         });
//         return;
//       }
//     }

//     if (commandObject.permissionsRequired?.length) {
//       for (const permission of commandObject.permissionsRequired) {
//         if (!interaction.member.permissions.has(permission)) {
//           interaction.editReply({
//             content: 'Not enough permissions.',
//             ephemeral: true,
//           });
//           return;
//         }
//       }
//     }

//     if (commandObject.botPermissions?.length) {
//       for (const permission of commandObject.botPermissions) {
//         const bot = interaction.guild.members.me;

//         if (!bot.permissions.has(permission)) {
//           interaction.editReply({
//             content: "I don't have enough permissions.",
//             ephemeral: true,
//           });
//           return;
//         }
//       }
//     }

//     await commandObject.callback(client, interaction);
//   } catch (error) {
//     console.log(`There was an error running this command: ${error}`);
//   }
// };

// const { devs, testServer } = require('../../../config.json');
// const getLocalCommands = require('../../utils/getLocalCommand');

// module.exports = async (client, interaction) => {
//     if (!interaction.isChatInputCommand())return;
//   const localCommands = getLocalCommands();
   

//   try {
//     const commandObject = localCommands.find(
//       (cmd) => cmd.name === interaction.commandName
//     );

//     if (!commandObject) {
//       interaction.reply({
//         content: 'Unknown command.',
//         ephemeral: true,
//       });
//       return;
//     }

//     console.log(`Received interaction: ${interaction.commandName}`);

//     await interaction.deferReply();

//     console.log(`Deferred reply sent`);

//     try {
//       // Simulate a delay to test latency
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       console.log(`Sending response`);

//       interaction.editReply({
//         content: 'Response sent!',
//         ephemeral: true,
//       });
//     } catch (error) {
//       console.log(`Error sending response: ${error}`);
//     }
//   } catch (error) {
//     console.log(`Error processing interaction: ${error}`);
//   }
// };