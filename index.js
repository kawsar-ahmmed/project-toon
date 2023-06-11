const express = require('express')
const app = process.env.PORT || express();
const port = 5001;
// Midleware
var cors = require('cors')
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('This is nodemon worked')
})

app.listen(port, () => {
  console.log('CRUD Work', port)
})