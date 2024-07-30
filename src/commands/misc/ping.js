const { description, callback } = require("../moderation/ban");

module.exports={
    name:'ping',
    description:'pong',



    callback:async(client,interaction)=>{
        await interaction.deferReply()

        const reply=await interaction.fetchReply();

        const ping=reply.createdTimestamp-interaction.createdTimestamp;

        interaction.editReply(`pong! client${ping}ms | websocket:${client.ws.ping}ms `)
    }
}