const fs=require('fs');
const path=require('path');
module.exports=(directory,foldersonly=false)=>{

    let filenames=[]

    const files=fs.readdirSync(directory,{withFileTypes:true});

    for (const file of files){
        const filepath =path.join(directory,file.name);

        if (foldersonly){
            if(file.isDirectory()){
                filenames.push(filepath)
            }
        }
        else{
            if(file.isFile()){
                filenames.push(filepath)

            }
        }
    }
    return filenames;

}