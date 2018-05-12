const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const mocha = require('mocha');

const expect = chai.expect;

const {BlogPost} = require('../blogPosts/models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

let postId;

function seedBlogPostData() {
  console.info('seeding blog-post data');
  const seedData = [];

  for (let i=1; i<=10; i++) {
    seedData.push({
      title: faker.lorem.words(),
      content: faker.lorem.paragraph(),
      topic: faker.lorem.words()
    });
    // console.log(seedData);
  }
  // seedData[0]._id = '5af3eb90e464b30f91f74ca3';
  return BlogPost.insertMany(seedData)
  .then(res => {
    postId = res[0]._id;
    console.log(postId);
  })
}

function generateBlogPostData() {
  return {
    title: faker.lorem.words(),
    content: faker.lorem.paragraph(),
    topic: faker.lorem.words()
  };
}

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

describe('Blog App', function() {

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });
  beforeEach(function() {
    return seedBlogPostData();
  });
  afterEach(function() {
    return tearDownDb();
  })
  after(function() {
    return closeServer();
  });

  describe('POST endpoint', function() {
    it('should add blog-posts on POST', function() {
      const newBlog = {title: 'something', content: 'anything', topic: 'whatever'};
      return chai.request(app)
        .post('/api/blogposts/')
        .send(newBlog)
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('title', 'content', 'topic');
        });
    });
  });
  describe('GET endpoint', function() {
    it('should show blog-post on GET', function() {
      return chai.request(app)
        .get(`/api/blogposts/${postId}`)
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          });
      });
    });
  describe('PUT endpoint', function() {
    it('should update blog-post on PUT', function() {
      return chai.request(app)
        .get(`/api/blogposts/${postId}`)
        .then(function(res) {
          // console.log(res.body, 'response!!')
          const updatedPost = Object.assign(res.body, {
            title: 'cldms',
            content: 'slkmvdklw'
          });
          return chai.request(app)
            .put(`/api/blogposts/${postId}`)
            .send(updatedPost)
            .then(function(res) {
              expect(res).to.have.status(200);
              });
          });
      });
    });
  describe('DELETE endpoint', function() {
    it('should delete blog-post on DELETE', function() {
      return chai.request(app)
        .get(`/api/blogPosts/${postId}`)
        .then(function(res) {
          return chai.request(app)
            .delete(`/api/blogPosts/${postId}`);
        })
        .then(function(res) {
          expect(res).to.have.status(204);
          });
      });
    });
});
