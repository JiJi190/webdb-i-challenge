const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

// CRUD Endpoints

server.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then(acc => {
      res.status(201).json(acc);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not GET." });
    });
});

server.post("/", (req, res) => {
  const body = req.body;
  db("accounts")
    .insert(body, "id")
    .then(body => {
      res.status(200).json(body);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not POST" });
    });
});

server.delete("/:id", (req, res) => {
  db("accounts")
    .where("id", req.params.id)
    .del()
    .then(() => {
      res.status(200).json({ message: "Deleted" });
    })
    .catch(() => {
      res.status(500).json({ error: "Could not delete" });
    });
});

server.put("/:id", (req, res) => {
  db("accounts")
    .where("id", req.params.id)
    .update(req.body)
    .then(acc => {
      res.status(200).json(acc);
    })
    .catch(() => {
      res.status(500).json({ error: "Couldn't PUT." });
    });
});

module.exports = server;
