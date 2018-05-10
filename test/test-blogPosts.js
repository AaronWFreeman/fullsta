const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Blog App', function() {
  before(function() {
    return runServer();
  });
  after(function() {
    return closeServer();
  });

  it('should show blog-post on GET', function() {
    return chai.request(app)
      .get('/:id')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.be.at.least(1);
        const expectedKeys = ['title', 'content', 'topic'];
        res.body.forEach(function(item) {
          expect(item).to.be.a('object');
          expect(item).to.include.keys(expectedKeys);
        });
      });
  });
  it('should add blog-posts on POST', function() {
    const newBlog = {title: 'something', content: 'anything', topic: 'whatever'};
    return chai.request(app)
      .post('/')
      .send(newBlog)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('title', 'content', 'topic');
        expect(res.body.id).to.not.equal(null);
        expect(res.body).to.deep.equal(Object.assign(newBlog, {id: res.body.is}));
      });
  });
  it('should update blog-post on PUT', function() {
    return chai.request(app)
      .get('/:id')
      .then(function( res) {
        const updatedPost = Object.assign(res.body[0], {
          title: 'c;ldms',
          content: 'slkmvdklw;'
        });
        return chai.request(app)
          .put(`/${res.body[0].id}`)
          .send(updatedPost)
          .then(function(res) {
            expect(res).to.have.status(204);
          });
      });
  });
  it('should delete blog-post on DELETE', function() {
    return chai.request(app)
      .get('/:id')
      .then(function(res) {
        return chai.request(app)
          .delete(`/${res.body[0].id}`);
      })
      .then(function(res) {
        expect(res).to.have.status(204);
      });
  });
});
