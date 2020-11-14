//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

require('dotenv').config();
const faunadb = require('faunadb');

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = "https://upbeat-franklin-284d05.netlify.app/"
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Tasks', () => {
    beforeEach((done) => { //Before each test we empty the database
        client
            .query(q.Paginate(q.Match(q.Ref('indexes/tasks_index'))))
            .then(response => {
            const itemRefs = response.data;
            const getAllItemsDataQuery = itemRefs.map(ref => {
                return q.Delete(ref);
            });
            // then query the refs.
            client.query(getAllItemsDataQuery).then(ret => {
                return done();
            });
        });
    });
 /*
  * Test the /GET route
  */
  describe('/GET tasks', () => {
      it('this should GET all the tasks', (done) => {
        chai.request(server)
            .get("/.netlify/functions/tasks")
            .end((err, res) => {
                  res.should.have.status(200);
                  res.should.have.property('text');
                  res.text.should.be.a('string');
                  const body = JSON.parse(res.text);
                  body.should.have.property('status').eql("success");
                  body.should.have.property('message').eql("Tasks retrieved successfully");
                  body.should.have.property('data');
                  body.data.should.be.a('array');
                  body.data.length.should.be.eql(0);
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
            .post("/.netlify/functions/tasks")
            .send(task)
            .end((err, res) => {
                  res.should.have.status(400);
                  res.should.have.property('text');
                  res.text.should.be.a('string');
                  res.text.should.eql("task validation failed: title: Path `title` is required.");
              done();
            });
      });


      it('it should POST a task', (done) => {
        let task = {
            title: "tidy room",
            description: "1. Mop floor 2. Clear desk 3. Organize books"
        };
        chai.request(server)
            .post("/.netlify/functions/tasks")
            .send(task)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.should.have.property('text');
                  res.text.should.be.a('string');
                  const body = JSON.parse(res.text);
                  body.should.have.property('message').eql("New task added");
                  body.should.have.property('data');
                  body.data.should.have.property('title');
                  body.data.should.have.property('description');
                  body.data.should.have.property('is_done').eql(false);
              done();
            });
      });

  });



  /*
  * Test the /GET/:id route
  */
  describe('/GET/:id task', () => {
      it('it should GET a task by the given id', (done) => {
            let task = {title: "OTOT assignment", description: "B1, B2, B3, B4", is_done: false};
            const item = {
                data: task
            };
            /* construct the fauna query */
            client
                .query(q.Create(q.Ref('classes/tasks'), item))
                .then(response => {
                    chai.request(server)
                        .get('/.netlify/functions/tasks/' + response.ref.id)
                        .end((err, res) => {
                                res.should.have.status(200);
                                res.should.have.property('text');
                                res.text.should.be.a('string');
                                const body = JSON.parse(res.text);
                                body.should.have.property('message').eql("Task details loading..");
                                body.should.have.property('data');
                                body.data.should.have.property('title').eql("OTOT assignment");
                                body.data.should.have.property('description').eql("B1, B2, B3, B4");
                                body.data.should.have.property('is_done').eql(false);
                                body.data.should.have.property('id').eql(response.ref.id);
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
            let _task = {title: "Buy groceries", description: "milk, eggs, apples"};
            const item = {
                data: _task
            };
            /* construct the fauna query */
            client
                .query(q.Create(q.Ref('classes/tasks'), item))
                .then(response => {
                    chai.request(server)
                        .put('/.netlify/functions/tasks/' + response.ref.id)
                        .send({is_done: true})
                        .end((err, res) => {
                      res.should.have.status(200);
                      res.should.have.property('text');
                      res.text.should.be.a('string');
                      const body = JSON.parse(res.text);
                      body.should.have.property('message').eql("Task Info updated");
                      body.should.have.property('data');
                      body.data.should.have.property('is_done').eql(true);
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
          let task = {title: "Sleep by midnight", description: "please", is_done: false};
            const item = {
                data: task
            };
            /* construct the fauna query */
            client
                .query(q.Create(q.Ref('classes/tasks'), item))
                .then(response => {
                    chai.request(server)
                        .delete('/.netlify/functions/tasks/' + response.ref.id)
                        .end((err, res) => {
                      res.should.have.status(200);
                      res.should.have.property('text');
                      res.text.should.be.a('string');
                      const body = JSON.parse(res.text);
                      body.should.have.property('message').eql('Task deleted');
                      body.should.have.property('status').eql('success');
                  done();
                });
          });
      });
  });

});