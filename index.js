const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors');
app.use(cors());
app.use(express.json());
require('dotenv').config()





const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wvawb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect()
        const userInformation = client.db('userInformation').collection('information')
        app.post('/information', async (req, res) => {
            const data = req.body
            const result = await userInformation.insertOne(data)
            res.send({ messages: 'success' })
        })
        app.get('/information', async (req, res) => {
            const result = await userInformation.find({}).toArray()
            res.send(result)
        })
    }
    finally {
        // await client.close()
    }

}
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})