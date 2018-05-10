'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const {blogPost} = require('./models');
const jsonParser = bodyParser.json();

const router = express.Router();

router.post('/posts', (req, res) => {

  const requiredFields = ['author', 'created', 'id', 'title', 'content'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if(!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  BlogPost
    .create({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      created: req.body.created,
      id: req.body.id
    })
    .then(restaurant => res.status(200).json(restaurant.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

module.exports = {router};
