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

server.get('/api/accounts', (req, res) => {
  db.find()
  .then(acc => {
    res.status(200).json(acc)
  })
  .catch(err => {
    res.status(500).json({error: "Bad Request"})
  })
})

server.get('/api/accounts/:id', (req, res) => {
  db.findById(req.params.id)
  .then(acc => {
    res.status(200).json(acc)
  })
  .catch(err => {
    res.status(500).json({error: "Bad Request"})
  })
})

server.put('/api/accounts/:id', (req, res) => {
  const changes = {
    name: req.body.name,
    budget: req.body.budget
  }

  db.update(req.params.id, changes)
  .then(acc => {
    res.status(200).json(changes)
  })
  .catch(err => {
    res.status(500).json({error: "Bad Request"})
  })

})

server.delete('/api/accounts/:id', (req, res) => {

  db.remove(req.params.id)
  .then(acc => {
    res.status(200).json({success: "Account has been successfully deleted"})
  })
  .catch(err => {
    res.status(500).json({error: "Bad Request"})
  })

})

module.exports = server;
