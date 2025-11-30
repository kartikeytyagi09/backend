import express from 'express'
import { createClient } from 'redis' 

const app = express();
app.use(express.json());

const client = createClient({url: "redis://localhost:6379"})
;
client.on('error', (err)=>{console.log('redis client error')});

app.post('/submit', async (req, res)=>{
    const  problemId =req.body.problemId;
    const code=req.body.code;
    const language=req.body.language;

    try {
        await client.lPush('problems', JSON.stringify({code, language, problemId }));

        res.status(200).send('data send and stored');
    } catch (error) {
        console.error("Redis error:", error);
        res.status(500).send("Failed to store submission.");
    }
})

async function connect(){
    try {
        await  client.connect();
        console.log("connected to redis");

        app.listen(5000, ()=>{
            console.log("server running on port 5000");
        })
    } catch (error) {
        console.log('failed to connect');
    }
}


connect();