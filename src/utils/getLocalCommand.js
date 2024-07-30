const path=require('path');
const getALLfiles=require('./getAllfile');

module.exports=(exceptions=[])=>{
    let localcommands=[];
    const commandsCategories=getALLfiles(
        path.join(__dirname,'..','commands'),
        true
    )
    for(const commandscategories of commandsCategories){
        const commandfiles=getALLfiles(commandscategories)


        for(const commandfile of commandfiles){
            const commandObject=require(commandfile)
            
            if(exceptions.includes(commandObject.name)){
                continue;
            }
            
            //console.log(commandfile)
            localcommands.push(commandObject)
        }
    }


    return localcommands;
}