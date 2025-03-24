const express= require("express");
const{connectMongo}=require("./view/connect");
const urlRoute= require("./routes/url");
const URL= require("./models/url_schema");

const app = express();
const port =2001;


connectMongo("mongodb://127.0.0.1:27017/short-url")
.then(()=> console.log("mongoose connected"))
.catch((err)=> console.log("failed",err));

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req,res)=>{
    const shortId= req.params.shortId;
    const entry= await URL.findOne({shortId});
    if(!entry) res.status(404).json({err:"url not found"});
    res.redirect(entry.redirectUrl)
});



app.listen(port,()=> console.log(`server is running at port: ${port}`));