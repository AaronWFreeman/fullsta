'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const {BlogPost} = require('./models');
const jsonParser = bodyParser.json();

const router = express.Router();

router.post('/', (req, res) => {
    // res.send("hi there");
  console.log(req.body);
  BlogPost
    .create({
      title: req.body.title,
      content: req.body.content,
      topic: req.body.topic
      // author: req.body.author,
      // created: req.body.created,
      // id: req.body.id
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