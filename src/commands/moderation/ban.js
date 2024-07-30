// const {Client,Interaction,PermissionFlagsBits,  ApplicationCommandOptionType}=require('discord.js')

// module.exports={
//     /**
//      * 
//      * @param {Client} client 
//      * @param {Interaction} interaction 
//      */
    
    
//     callback:async(client,interaction)=>{
//         const targetUserId=interaction.options.get('target-user').value;
//         const reason=interaction.options.get('reason')?.value ||"no reason provided";

//         await interaction.deferReply();
//         const targetUser=await interaction.guild.members.fetch(targetUserId);


//         if(!targetUser){
//             await interaction.editReply("that user doesn't exist in this server")
//             return;
//         }

//         if (targetUser.id===interaction.guild.ownerId){
//             await interaction.editReply("you can't ban that user because they're are the server owner")
//             return;
//         }

//         const targetUserRolePosition=targetUser.roles.highest.position;//highest role of the target user
//         const requestuserRolePosition=interaction.member.roles.highest.position;//highest role of the user running the command
//         const botRolePosition=interaction.guild.member.me.roles.highest.position;//hihest role of the bot

//         if(targetUserRolePosition>=requestuserRolePosition){
//             await interaction.editReply ("you cant ban that user because they have the same or higher role thanyou")
        
//             return;       
//         }
//         try {
//             await targetUser.ban({
//                 reason
//             })
//             await interaction.editReply(`target user${targetUser}was banned\n reason:${reason}`)
//         } catch (error) {
//             console.log(error)
//         }


//     },
    
//     name:'ban',
//     description:'bans a member ',
//     //devOnly:Boolean
//     //testonly:Boolean
//     options:Object[
//         {
//             name:'target-user',
//             description:'the user you want to ban ',
//             required:true,
//             type: ApplicationCommandOptionType.Mentionable

//         },
//         {
//             name:'reason',
//             description:'the reason for banning',
//             type:ApplicationCommandOptionType.String

//         }
//     ],
//     permissionsRequired:[PermissionFlagsBits.Administrator  ],
//     botPermissions:[PermissionFlagsBits.Administrator  ],

 
// }

// const { Client, Interaction, PermissionFlagsBits, ApplicationCommandOptionType } = require('discord.js');

// module.exports = {
//     /**
//      * @param {Client} client 
//      * @param {Interaction} interaction 
//      */
//     callback: async (client, interaction) => {
//         const targetUserId = interaction.options.get('target-user').value;
//         const reason = interaction.options.get('reason')?.value || "no reason provided";

//         await interaction.deferReply();
//         const targetUser = await interaction.guild.members.fetch(targetUserId);

//         if (!targetUser) {
//             await interaction.editReply("That user doesn't exist in this server.");
//             return;
//         }

//         if (targetUser.id === interaction.guild.ownerId) {
//             await interaction.editReply("You can't ban that user because they're the server owner.");
//             return;
//         }

//         const targetUserRolePosition = targetUser.roles.highest.position; // Highest role of the target user
//         const requestUserRolePosition = interaction.member.roles.highest.position; // Highest role of the user running the command
//         const botRolePosition = interaction.guild.members.me.roles.highest.position; // Highest role of the bot

//         if (targetUserRolePosition >= requestUserRolePosition) {
//             await interaction.editReply("You can't ban that user because they have the same or higher role than you.");
//             return;       
//         }

//         if (targetUserRolePosition >= botRolePosition) {
//             await interaction.editReply("I can't ban that user because they have a higher role than me.");
//             return;
//         }

//         try {
//             await targetUser.ban({ reason });
//             await interaction.editReply(`Target user ${targetUser} was banned.\nReason: ${reason}`);
//         } catch (error) {
//             console.log(error);
//             await interaction.editReply("An error occurred while trying to ban the user.");
//         }
//     },

//     name: 'ban',
//     description: 'Bans a member',
//     options: [
//         {
//             name: 'target-user',
//             description: 'The user you want to ban',
//             required: true,
//             type: ApplicationCommandOptionType.Mentionable
//         },
//         {
//             name: 'reason',
//             description: 'The reason for banning',
//             type: ApplicationCommandOptionType.String
//         }
//     ],
//     permissionsRequired: [PermissionFlagsBits.Administrator],
//     botPermissions: [PermissionFlagsBits.Administrator],
// };
const { Client, Interaction, PermissionFlagsBits, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    /**
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        try {
            const targetUserId = interaction.options.get('target-user').value;
            const reason = interaction.options.get('reason')?.value || "no reason provided";

            await interaction.deferReply();

            const targetUser = await interaction.guild.members.fetch(targetUserId);
            if (!targetUser) {
                await interaction.editReply("That user doesn't exist in this server.");
                return;
            }

            if (targetUser.id === interaction.guild.ownerId) {
                await interaction.editReply("You can't ban that user because they're the server owner.");
                return;
            }

            const targetUserRolePosition = targetUser.roles.highest.position;
            const requestUserRolePosition = interaction.member.roles.highest.position;
            const botRolePosition = interaction.guild.members.me.roles.highest.position;

            if (targetUserRolePosition >= requestUserRolePosition) {
                await interaction.editReply("You can't ban that user because they have the same or higher role than you.");
                return;
            }

            if (targetUserRolePosition >= botRolePosition) {
                await interaction.editReply("I can't ban that user because they have a higher role than me.");
                return;
            }

            try {
                await targetUser.ban({ reason });
                await interaction.editReply(`Target user ${targetUser.user.tag} was banned.\nReason: ${reason}`);
            } catch (error) {
                console.error('Failed to ban user:', error);
                await interaction.editReply("An error occurred while trying to ban the user.");
            }
        } catch (error) {
            console.error('Error handling interaction:', error);
            if (!interaction.deferred && !interaction.replied) {
                await interaction.reply({ content: "An error occurred while processing this command.", ephemeral: true });
            } else if (interaction.deferred && !interaction.replied) {
                await interaction.editReply("An error occurred while processing this command.");
            }
        }
    },

    name: 'ban',
    description: 'Bans a member',
    options: [
        {
            name: 'target-user',
            description: 'The user you want to ban',
            required: true,
            type: ApplicationCommandOptionType.Mentionable
        },
        {
            name: 'reason',
            description: 'The reason for banning',
            type: ApplicationCommandOptionType.String
        }
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],
};
