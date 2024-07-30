// const path=require('path')

// const getAllfile = require("../utils/getAllfile")

// module.exports=(client)=>{
//     const eventfolders=getAllfile(path.join(__dirname,'..','events'),true);
    
//     for (const eventfolder of eventfolders){
//         const eventfiles=getAllfile(eventfolder)
//         eventfiles.sort((a,b)=>a>b);
//         //console.log(eventfiles)

//         const eventname=eventfolder.replace(/\\/g,'/').split('/').pop();
        
//         client.on(eventname,async(arg)=>{
//             for(const eventfile of eventfiles){
//                 const eventFunction=require(eventfile);
//                 await eventFunction(client,arg);
//             }
//         })
//     }
// }
const path = require('path');
const getAllfile = require("../utils/getAllfile");

module.exports = (client) => {
    const eventFolders = getAllfile(path.join(__dirname, '..', 'events'), true);

    for (const eventFolder of eventFolders) {
        const eventFiles = getAllfile(eventFolder);
        eventFiles.sort((a, b) => a > b);
        const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();

        client.on(eventName, async (arg) => {
            for (const eventFile of eventFiles) {
                const eventFunction = require(eventFile);
                
//                console.log(`Loaded event function from: ${eventFile}`);

                if (typeof eventFunction === 'function') {
                    await eventFunction(client, arg);
                } else {
                    console.error(`The event function in ${eventFile} is not a valid function.`);
                }
            }
        });
    }
};
