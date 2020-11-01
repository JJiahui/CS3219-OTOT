//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Task = require('../taskModel');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Tasks', () => {
    beforeEach((done) => { //Before each test we empty the database
        Task.remove({}, (err) => {
           done();
        });
    });
 /*
  * Test the /GET route
  */
  describe('/GET tasks', () => {
      it('this should GET all the tasks', (done) => {
        chai.request(server)
            .get('/api/tasks')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('status').eql("success");
                  res.body.should.have.property('message').eql("Tasks retrieved successfully");
                  res.body.should.have.property('data');
                  res.body.data.should.be.a('array');
                  res.body.data.length.should.be.eql(0);
              done();
            });
      });
  });





  /*
  * Test the /POST route
  */
  describe('/POST task', () => {
      it('it should not POST a task without a title field', (done) => {
        let task = {};
        chai.request(server)
            .post('/api/tasks')
            .send(task)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('errors');
                  res.body.errors.should.have.property('title');
                  res.body.errors.title.should.have.property('kind').eql('required');
              done();
            });
      });


      it('it should POST a task', (done) => {
        let task = {
            title: "tidy room",
            description: "1. Mop floor 2. Clear desk 3. Organize books"
        };
        chai.request(server)
            .post('/api/tasks')
            .send(task)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql("New task added");
                  res.body.should.have.property('data');
                  res.body.data.should.have.property('title');
                  res.body.data.should.have.property('description');
                  res.body.data.should.have.property('is_done').eql(false);
              done();
            });
      });

  });



  /*
  * Test the /GET/:id route
  */
  describe('/GET/:id task', () => {
      it('it should GET a task by the given id', (done) => {
          let task = new Task({ title: "OTOT assignment", description: "B1, B2, B3, B4"});
          task.save((err, task) => {
              chai.request(server)
            .get('/api/tasks/' + task.id)
            .send(task)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql("Task details loading..");
                  res.body.should.have.property('data');
                  res.body.data.should.have.property('title').eql("OTOT assignment");
                  res.body.data.should.have.property('description').eql("B1, B2, B3, B4");
                  res.body.data.should.have.property('is_done').eql(false);
                  res.body.data.should.have.property('_id').eql(task.id);
              done();
            });
          });

      });
  });

  /*
  * Test the /PUT/:id route
  */
  describe('/PUT/:id task', () => {
      it('it should UPDATE a task given the id', (done) => {
          let _task = new Task({title: "Buy groceries", description: "milk, eggs, apples"});
          _task.save((err, task) => {
                chai.request(server)
                .put('/api/tasks/' + task.id)
                .send({is_done: true})
                .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').eql("Task Info updated");
                      res.body.should.have.property('data');
                      res.body.data.should.have.property('is_done').eql(true);
                      res.body.data.should.have.property('title').eql("Buy groceries");
                      res.body.data.should.have.property('description').eql("milk, eggs, apples");
                  done();
                });
          });
      });
  });


  /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id task', () => {
      it('it should DELETE a task given the id', (done) => {
          let task = new Task({title: "Sleep by midnight", description: "please"});
          task.save((err, task) => {
                chai.request(server)
                .delete('/api/tasks/' + task.id)
                .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').eql('Task deleted');
                      res.body.should.have.property('status').eql('success');
                  done();
                });
          });
      });
  });

});