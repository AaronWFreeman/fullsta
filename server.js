'use-strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// mongoose.Promise = global.Promise;
const {DATABASE_URL, PORT} = require('./config');
const {blogPost} = require('./models');
const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

app.use('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});

app.get('/', function (req, res) {
  res.status(200);
  res.sendFile(__dirname + '/index.html')
  .catch(err => res.status(500).json({ error: 'something went terribly wrong' }));
});

app.get('/users', function(req, res) {
  
})

let server;

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    }).on('error', err => {
      reject(err)
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}


if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};
