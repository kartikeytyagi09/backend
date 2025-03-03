const shortid = require("shortid");
const URL= require("../models/url_schema");


async function generateShortUrl(req,res){
    const body= req.body;
    if(!body.url){
        return res.status(400).json({msg:"url is required"})
    }
    const shortID= shortid();     
    await URL.create({
        shortId: shortID,
        redirectUrl:body.url,
        visiteHistory:[],
    })
    return res.json({id:shortID});

}
module.exports= {generateShortUrl};