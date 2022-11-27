const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

require('dotenv').config()
app.use(cors())
app.use(express.json())

// dbUser5
// YNxxOM8L6Mky8r6i



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fuly7hk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        const catagoriesCollection = client.db('bikeResell').collection('catagories')
        const catagoriesDetailsCollection = client.db('bikeResell').collection('catagoryDetails')
        app.get('/catagories',async(req,res)=>{
            const query = {};
            const cursor = await catagoriesCollection.find(query).toArray()
            res.send(cursor)
        });

        app.get('/catagories/:id',async(req,res)=>{
            const id = req.params.id;
            const query={
                catagoryId:id
            }
            const result = await catagoriesDetailsCollection.find(query).toArray()
            res.send(result)
        })
    }
    finally{

    }
}
run().catch(err=>console.log(err))


app.get('/',(req,res)=>{
    res.send('api is running')
})
app.listen(port,()=>{
    console.log(port)
})