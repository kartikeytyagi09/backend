// js files just used to set up mongoose connection which will accept the link to conenct to mongooose;

const mongoose=require("mongoose");

async function connectMongo(url) {
    return mongoose.connect(url);
    
}

module.exports= {connectMongo};