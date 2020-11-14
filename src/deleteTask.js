require('dotenv').config();

/* Import faunaDB sdk */
const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = async (event, context) => {
  const id = event.id;
  console.log(`Function 'deleteTask' invoked. delete id: ${id}`);
  return client
    .query(q.Delete(q.Ref(`classes/tasks/${id}`)))
    .then(response => {
      console.log('success', response);
      const res = {
          "status": "success",
          "message": "Task deleted"
      };
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
