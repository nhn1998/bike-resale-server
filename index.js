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
async function run() {
    try {
        const catagoriesCollection = client.db('bikeResell').collection('catagories')
        const catagoriesDetailsCollection = client.db('bikeResell').collection('catagoryDetails')
        const bookingCollection = client.db('bikeResell').collection('bookings')
        const usersCollection = client.db('bikeResell').collection('users')
        const addProductsCollection = client.db('bikeResell').collection('addProducts')

        app.get('/catagories', async (req, res) => {
            const query = {};
            const cursor = await catagoriesCollection.find(query).toArray()
            res.send(cursor)
        });

        app.get('/catagories/:id', async (req, res) => {
            const id = req.params.id;
            const query = {
                catagoryId: id
            }
            const result = await catagoriesDetailsCollection.find(query).toArray()
            res.send(result)
        })
        app.get('/users/admin/:email', async (req, res) => {
            const email = req.params.email;
            const query = {email}
            const user = await usersCollection.findOne(query)
            res.send({ isAdmin: user?.role === 'admin' })
        });
        app.get('/users/buyers/:email',async(req,res)=>{
            const email = req.params.email;
            const query = {email}
            const user = await usersCollection.findOne(query)
            res.send({isBuyers:user?.role ==='Buyers'})
        })
        app.get('/users/sellers/:email',async(req,res)=>{
            const email = req.params.email;
            const query = {email}
            const user =await usersCollection.findOne(query)
            res.send({isSellers:user?.role === 'Sellers'})
        })
        app.get('/users',async(req,res)=>{
            const role = req.query.role;
            const query = {role:role}
            const result = await usersCollection.find(query).toArray()
            res.send(result)
        })
        app.get('/addProducts',async(req,res)=>{
            const query = {};
            const result = await addProductsCollection.find(query).toArray()
            res.send(result)
        })
        app.get('/products',async(req,res)=>{
            let query = {}
            if(req.query.email){
                query = {
                    email:req.query.email
                }
            }
            const result = await addProductsCollection.find(query).toArray()
            res.send(result)
        })
        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            console.log(booking)
            const result = await bookingCollection.insertOne(booking)
            res.send(result)

        })
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user)
            res.send(result)
        })
        app.post('/addProducts',async(req,res)=>{
            const product = req.body;
            const result =  await addProductsCollection.insertOne(product)
            res.send(result)
        })
        app.delete('/allSellers/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)}
            const result = await usersCollection.deleteOne(query)
            res.send(result)

        })
        app.delete('/addProducts/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)}
            const result = await addProductsCollection.deleteOne(query)
            res.send(result)
        })
    }
    finally {

    }
}
run().catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('api is running')
})
app.listen(port, () => {
    console.log(port)
})