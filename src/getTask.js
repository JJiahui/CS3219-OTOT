require('dotenv').config();

const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = async (event, context) => {
  const id = event.id;
  console.log(`Function 'getTask' invoked. id: ${id}`);
  return client
    .query(q.Get(q.Ref(`classes/tasks/${id}`)))
    .then(response => {
      console.log('success', response);
      response.data.id = response.ref.id;
      const res = {
        "message": "Task details loading..",
        "data": response.data
      }
      return {
        statusCode: 200,
        body: JSON.stringify(res)
      };
    })
    .catch(error => {
      console.log('error', error);
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      };
    });
};
