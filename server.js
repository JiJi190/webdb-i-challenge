const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

//CRUD Endpoints

server.get("/", (req, res) => {
    db.select("*")
        .from("accounts")
        .then(acc => {
            res.status(200).json(acc)
        })
        .catch(() => {
            res.status(500).json({ message: "GET Failed"})
        })
})

server.post("/", (req, res) => {
    const body = req.body;
    db("accounts")
        .insert(body, 'id')
        .then(body => {
            res.status(200).json(body)
        })
        .catch(() => {
            res.status(500).json({ message: "POST Failed"})
        })
})

server.put("/:id", (req, res) => {
    db("accounts")
        .where("id", req.params.id)
        .update(req.body)
        .then(upd => {
            res.status(200).json(upd)
        })
        .catch(() => {
            res.status(500).json({message: "PUT Failed"})
        })
})

server.delete("/:id", (req, res) => {
    db('accounts')
        .where('id', req.params.id)
        .del()
        .then(gone => {
            res.status(200).json(gone)
        })
        .catch(() => {
            res.status(500).json({ message: "DELETE Failed"})
        })
})

module.exports = server;