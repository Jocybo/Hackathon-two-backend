const route = require('express').Router()
const db = require("../shared/mongodb")

// to Get All Mobile Products

route.get("/", async (req, res) => {
    const data = await db.mobile.find().toArray()
    res.send(data)
})

route.get(":id", async (req, res) => {
    let search = new RegExp(`^` + req.params.id, `i`)
    const data = await db.mobile.find({ title: search }).toArray()
    res.send(data)
})

module.exports = route
