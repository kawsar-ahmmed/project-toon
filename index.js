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
    const user = {name: "mahi", email: "mahi@gmail.com"}
    const result = await usersCollection.insertOne(user);
    console.log('User Added ID:',result.insertedId)
  }
  finally {
    // await client.close();
  }
}
run().catch(console.dir);

// // 
// // users
// const users = [
//     { id: 1, name: 'sabana', email: 'sabana@gmail.com', phone: '01299999922' },
//     { id: 2, name: 'sabnooks', email: 'sabnooks@gmail.com', phone: '01299999922' },
//     { id: 3, name: 'srabonti', email: 'srabonti@gmail.com', phone: '01299999922' },
//     { id: 4, name: 'suchuna', email: 'suchuna@gmail.com', phone: '01299999922' },
//     { id: 5, name: 'kobori', email: 'kobori@gmail.com', phone: '01299999922' },
//     { id: 6, name: 'sabila', email: 'sabila@gmail.com', phone: '01299999922' },
//     { id: 7, name: 'shakira', email: 'shakira@gmail.com', phone: '01299999922' },
//     { id: 8, name: 'Anta', email: 'anta@gmail.com', phone: '08976677' },
// ];

app.get('/users', (req, res) => {
    res.send(users)
})

// app.post('/users', (req, res) => {
//     const user = req.body;
//     user.id = users.length + 1;
//     console.log('request', user);
//     users.push(user);
//     res.send(user);
// })

app.listen(port, () => {
    console.log('CRUD Work', port)
})