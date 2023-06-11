const express = require('express')
const app = process.env.PORT || express();
const port = 5001;
// Database MongoDb
const { MongoClient, ServerApiVersion } = require('mongodb');
// Midleware
var cors = require('cors')
app.use(cors())
app.use(express.json())


//


const uri = "mongodb+srv://ridoy91221:8f9dRYI0rhGc2KCq@cluster-new.jt669nt.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try{
    await client.connect();
    const usersCollection = client.db('FoodDb').collection('users');
    
    app.post('/user', async(req, res) => {
        const newUser = req.body;
        console.log('Adding new user', newUser);
        const result = await usersCollection.insertOne(newUser);
        res.send(result)
    })
  }
  finally {
    // await client.close();
  }
}
run().catch(console.dir);


// app.post('/users', (req, res) => {
//     const user = req.body;
//     user.id = users.length + 1;
//     console.log('request', user);
//     users.push(user);
//     res.send(user);
// })

app.listen(port, () => {
    // console.log('CRUD Work', port)
})