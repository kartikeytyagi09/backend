// create a mongoose schema in a new file under models and exporting this file like as asual;

const mongoose = require("mongoose");

const urlSchema= new mongoose.Schema({
    shortId:{
        type:String,
        require:true,
        unique:true,
    },
    redirectUrl:{
        type:String,
        require:true,
    },
    visiteHistory:[{ time: {type:Number} }],
    
},{timestamps:true});

const URL= mongoose.model("Url",urlSchema);
module.exports=URL; 