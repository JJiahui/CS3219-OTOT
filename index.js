// Import express
let express = require('express')// Initialize the app
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
let app = express();

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());

// Import routes
let apiRoutes = require("./api-routes")// Use Api routes in the App
app.use('/api', apiRoutes)

// Connect to Mongoose and set connection variable
// Deprecated: mongoose.connect('mongodb://localhost/resthub');
mongoose.connect('mongodb://localhost/taskB', { useNewUrlParser: true});
var db = mongoose.connection;
if(!db) { console.log("Error connecting db"); }
else { console.log("Db connected successfully"); }

// Setup server port
var port = process.env.PORT || 9090;
// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));// Launch app to listen to specified port
app.post('/tempPost', (req, res) => res.send(req.body));
app.listen(port, function () {
     console.log("Running backend on port " + port);
});