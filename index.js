const express = require('express')
const app = process.env.PORT || express();
const port = 5001;
// Database MongoDb
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// Midleware
var cors = require('cors')
app.use(cors())
app.use(express.json())


//


const uri = "mongodb+srv://ridoy91221:8f9dRYI0rhGc2KCq@cluster-new.jt669nt.mongodb.net/FoodDb?retryWrites=true&w=majority";

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
        await client.connect();
        const usersCollection = client.db('FoodDb').collection('users');

        //Get User
        app.get('/user', async (req, res) => {
            const query = {};
            const cursor = usersCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })
        // POST User 
        app.post('/user', async (req, res) => {
            const newUser = req.body;
            console.log('Adding new user', newUser);
            const result = await usersCollection.insertOne(newUser);
            res.send(result)
        })
        // Delete user 
        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        })
        // Update User 
        app.get('/user/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await usersCollection.findOne(query);
            res.send(result);
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