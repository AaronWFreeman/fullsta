'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const {BlogPost} = require('./models');
const jsonParser = bodyParser.json();

const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);
  const requiredFields = ['title', 'content'];
  for (let i = 0; i < requiredFields.length; i++) {
  const field = requiredFields[i];
  if (!(field in req.body)) {
    const message = `Missing \`${field}\` in request body`;
    console.error(message);
    return res.status(400).send(message);
    }
  }
  console.log(req.body);
  BlogPost
    .create({
      title: req.body.title,
      content: req.body.content,
      topic: req.body.topic
    })
    .then(blogpost => res.status(200).json(blogpost))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

router.get('/:id', (req, res) => {
  BlogPost
    .findById(req.params.id)
    .then(blogpost => {
      res.status(200).json(blogpost);
    })
    .catch(err => res.status(500).json({ message: 'Internal server error'}));
} )

router.get('/', (req, res) => {
  BlogPost
    .find({}).limit(10)
    .then(blogposts => {
      res.status(200).json(blogposts);
    })
    .catch(err => res.status(500).json({ message: 'Internal server error'}));
} )

router.put('/:id', (req, res) => {
  const fieldsToUpdate = ['title', 'content', 'topic'];
  let updatedDocument = {};
  fieldsToUpdate.forEach(thing => {
    if (thing in req.body) {
      updatedDocument[thing] = req.body[thing];
    }
  });

  BlogPost
    .findByIdAndUpdate(req.params.id, updatedDocument)
    .then(updatedPost => {
      res.status(200).json(updatedPost);
    })
    .catch(err => res.status(500).json({ message: 'Internal server error'}));
});

router.delete('/:id', (req, res) => {
  BlogPost
    .findByIdAndRemove(req.params.id)
    .then(post => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal Server Error'}));
});


module.exports = {router};
