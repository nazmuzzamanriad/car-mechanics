const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors')
require('dotenv').config()

// initializing the app
const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.port || 5000

// user newMongoUser
// pass lekS6XI3QZEvYL5a

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.n2jo3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



// mongodb main function

async function run() {
    try {
        await client.connect();
        console.log('connected to database')
        const database = client.db("carMechanics");
        const servicesCollection = database.collection("services");



        // get method
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services)

        })

        // post API...it will do its job when it will hit in client side
        app.post('/services', async (req, res) => {

            const service = req.body
            const result = await servicesCollection.insertOne(service);
            console.log(result)
            res.json(result)

        })

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})