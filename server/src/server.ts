import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

// Import the routes
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// MIDDLEWARE
// done: Serve static files of entire client dist folder
app.use(express.static('../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes); 
// Serves static files in the entire client's dist folder
// done: Implement middleware for parsing JSON and urlencoded form data
// this would parse json data that gets sent to the server
// this would parse form data that gets sent to the server

// TODO: Implement middleware to connect the routes
app.use(routes);

//ROUTES
//create
// POST /api/todos   //creates a new todo. this is almost always /api/RESOURCENAME

//read
// GET /api/todos    //gets all todos

//update
//PUT /api/todos/:id //updates a todo with the given id

//delete
//DELETE /api/todos/:id //deletes a todo with the given id

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
