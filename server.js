require('dotenv').config()

// Dependencies
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose")
const app = express();
const db = mongoose.connection

// Port
const PORT = process.env.PORT || 3000;

// Database
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo & Fix Depreciation Warnings from Mongoose, may or may not need these depending on Mongoose version
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true});

// Error / Success
db.on("error", (err)=> console.log(err.message + "is mongod not running?"));
db.on("connected", () => console.log("mongod connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongod disconnected"));

// Middleware
app.use(express.static("public"));
// populates req.body with parsed info from forms - if no data from forms will return an empty object 
app.use(express.urlencoded({ extended: false})); // extended: false - does not allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on the project
app.use(methodOverride('_method'));

// Routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Listener
app.listen(PORT, () => console.log("express is listening on:", PORT));