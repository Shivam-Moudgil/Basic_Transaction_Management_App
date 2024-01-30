const mongoose = require("mongoose");

class DataBase{
    constructor(uri){
        this.uri=uri;
    }

async connect(){
    try{
        await mongoose.connect(this.uri);
        console.log(`Connected to the ${mongoose.connection.db.databaseName}`)
    }catch(err){
        console.log(err)
    }

}

async disconnect(){
    try{
        await mongoose.disconnect();
        console.log(`Disconnected to the ${mongoose.connection.db.databaseName}`)
    }catch(err){
        console.log(err)
    }
 

}

}

module.exports=DataBase;