require('dotenv').config();
const faunadb = require('faunadb');

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

/* export our lambda function as named "handler" export */
exports.handler = async (event, context) => {
  /* parse the string body into a useable JS object */
  const data = JSON.parse(event.body);
  if (!data.hasOwnProperty('title')) {
      return {
        statusCode: 400,
        body: "task validation failed: title: Path `title` is required."
      };
  }
  data.is_done = false;
  console.log('Function `createTask` invoked', data);
  const item = {
    data: data
  };
  /* construct the fauna query */
  return client
    .query(q.Create(q.Ref('classes/tasks'), item))
    .then(response => {
      console.log('success', response);
      response.data.id = response.ref.id;
      /* Success! return the response with statusCode 200 */
      const res = {
        "message": "New task added",
        "data": response.data
      }
      return {
        statusCode: 200,
        body: JSON.stringify(res)
      };
    })
    .catch(error => {
      console.log('error', error);
      /* Error! return the error with statusCode 400 */
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      };
    });
};
