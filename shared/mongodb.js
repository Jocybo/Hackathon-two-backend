const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_URL

const client = new MongoClient(url)

let mongo = {
    db: null,
    mobile: null,
    async connect() {
        try {
            await client.connect()
            this.db = client.db("webscrap")
            this.mobile = this.db.collection("mobile")
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = mongo