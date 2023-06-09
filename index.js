const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ywq3nhp.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const volunteerCollection = client.db('volunteerNetwork').collection('network');



    app.post('/newVolunteer', async(req, res) =>{
        const body = req.body;
        const result = await volunteerCollection.insertOne(body)
        res.send(result)
    })


    app.get('/newVolunteer', async(req, res) =>{
        const result = await volunteerCollection.find().toArray();
        res.send(result)
    })

    app.delete('/newVolunteer/:id', async(req, res) =>{
      const id = req.params.id;
      const quary = {_id : new ObjectId(id)}
      const result = volunteerCollection.deleteOne(quary)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) =>{
    res.send('volunteer server is running')
})

app.listen(port , () =>{
    console.log(`volunteer server is running on port: ${port}`)
})