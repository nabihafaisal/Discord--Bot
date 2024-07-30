// const { testServer } = require('../../../config.json');
// const areCommandsDifferent = require('../../utils/areCommandsDifferent');
// const getLocalCommand = require('../../utils/getLocalCommand');
// const getapplicationCommand = require('../../utils/getapplicationCommand');

// module.exports = async(client) => {
    

//     try {

//         const localcommands=getLocalCommand();
//         const applicationCommands=await getapplicationCommand(client,testServer)

//         for(const localcommand of localcommands){
//             const{name,description,options}=localcommand;
            
//             const existingcommand=await applicationCommands.cache.find(
//                 (cmd)=>cmd.name===name
//             );
//             if(existingcommand){
//                 if(localcommand.deleted){
//                     await applicationCommands.delete(existingcommand.id)
//                     console.log(`delete command"${name}".`)
//                     continue;
//                 }
//             if(areCommandsDifferent(existingcommand,localcommand)){
//                 await applicationCommands.edit(existingcommand.id,{
//                     description,
//                     options
//                 });

//                 console.log(`edited command"${name}".`)
//             }
            
//             }else{
//                 if(localcommand.deleted){
//                     console.log(`skipping registering command"${name}"as its set to delete`);
//                     continue;
//                 }
//                     await applicationCommands.create({
//                         name,
//                         description,
//                         options
//                     })

//                     console.log(`Registered command"${name}".`)
                
//             }

//         } 

//     } catch (error) {

//         console.log(`there was an error:${error}`)
        
//     }
    
// };
const { testServer } = require('../../../config.json');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getLocalCommand = require('../../utils/getLocalCommand');
const getapplicationCommand = require('../../utils/getapplicationCommand');

module.exports = async (client) => {
    try {
        const localCommands = getLocalCommand();
        const applicationCommands = await getapplicationCommand(client, testServer);

        for (const localCommand of localCommands) {
            const { name, description, options } = localCommand;

            const existingCommand = await applicationCommands.cache.find(
                (cmd) => cmd.name === name
            );

            if (existingCommand) {
                if (localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id);
                    console.log(`Deleted command "${name}".`);
                    continue;
                }
                if (areCommandsDifferent(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options,
                    });
                    console.log(`Edited command "${name}".`);
                }
            } else {
                if (localCommand.deleted) {
                    console.log(`Skipping registering command "${name}" as it's set to delete.`);
                    continue;
                }
                await applicationCommands.create({
                    name,
                    description,
                    options,
                });
                console.log(`Registered command "${name}".`);
            }
        }
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
};
