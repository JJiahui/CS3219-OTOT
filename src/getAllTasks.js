require('dotenv').config();

const faunadb = require('faunadb');
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = async (event, context) => {
  console.log('Function `getAllTasks` invoked');
  return client
    .query(q.Paginate(q.Match(q.Ref('indexes/tasks_index'))))
    .then(response => {
      const itemRefs = response.data;
      // create new query out of item refs. http://bit.ly/2LG3MLg
      const getAllItemsDataQuery = itemRefs.map(ref => {
        return q.Get(ref);
      });
      // then query the refs.
      return client.query(getAllItemsDataQuery).then(ret => {
        console.log("here");
        // wellformedData includes customers id in the response.
        const wellformedData = ret.map(malformedResponse => {
          return {
            id: malformedResponse.ref.id,
            ...malformedResponse.data
          };
        });
        const res = {
          "status": "success",
          "message": "Tasks retrieved successfully",
          "data": wellformedData 
        };
        return {
          statusCode: 200,
          body: JSON.stringify(res)
        };
      });
    })
    .catch(error => {
      console.log('error', error);
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      };
    });
};
