const express = require('express');

const db = require('./data/accounts-model.js');

const server = express();

server.use(express.json());

server.post('/api/accounts', (req, res) => {
  const newAccount = {
    name: req.body.name,
    budget: req.body.budget
  }

  db.add(newAccount)
  .then(acc => {
    res.status(201).json(acc)
  })
  .catch(err => {
    res.status(500).json({error: "Bad Request"})
  })
})

module.exports = server;
