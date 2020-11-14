exports.handler = async (event, context) => {
  const path = event.path.replace(/\.netlify\/functions\/[^\/]+/, '');
  const segments = path.split('/').filter(e => e);
  console.log("path:", path);
  console.log("segments:", segments);

  switch (event.httpMethod) {
    case 'GET':
      if (segments.length === 0) {
        return require('./getAllTasks').handler(event, context);
      }
      if (segments.length === 1) {
        event.id = segments[0];
        return require('./getTask').handler(event, context);
      } else {
        return {
          statusCode: 500,
          body:
            'too many segments in GET request, must be either /.netlify/functions/tasks or /.netlify/functions/tasks/123456'
        };
      }
    case 'POST':
      return require('./createTask').handler(event, context);
    case 'PUT':
      if (segments.length === 1) {
        event.id = segments[0];
        console.log(event.id);
        return require('./updateTask').handler(event, context);
      } else {
        return {
          statusCode: 500,
          body:
            'invalid segments in POST request, must be /.netlify/functions/tasks/123456'
        };
      }
    case 'DELETE':
      if (segments.length === 1) {
        event.id = segments[0];
        return require('./deleteTask').handler(event, context);
      } else {
        return {
          statusCode: 500,
          body:
            'invalid segments in DELETE request, must be /.netlify/functions/tasks/123456'
        };
      }
    case 'OPTIONS':
      // To enable CORS
      const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
      };
      return {
        statusCode: 200, // <-- Must be 200 otherwise pre-flight call fails
        headers,
        body: 'This was a preflight call!'
      };
  }
  return {
    statusCode: 500,
    body: 'unrecognized HTTP Method, must be one of GET/POST/PUT/DELETE/OPTIONS'
  };
};
