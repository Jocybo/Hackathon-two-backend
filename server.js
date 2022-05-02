const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()

const app = express()

const mongo = require('./shared/mongodb')
const product = require('./routes/product')
const scrapData = require('./shared/scrap')


server = async () => {
    await mongo.connect()
    await scrapData()
    app.use(cors())
    app.use(express.json())
    app.use((req, res, next) => {
        console.log("middleware")
        next()
    })
    app.use("/product", product)

    app.listen(process.env.PORT || 3002, () => {
        console.log("server started");
    })
}

// calling the function :

server()

