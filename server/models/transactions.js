const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
    type:{
        type:String,enum:["credit","debit"],required:true
    },
    amount:{
        type:String,required:true
    },
    desc:{
        type:String
    },
    balance:Number
},{timestamps:true});



module.exports =  mongoose.model("transactions",TransactionSchema);