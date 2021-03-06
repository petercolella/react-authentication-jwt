const express = require("express");
const authWare = require("./middleware/authware");
const mongoose = require('mongoose')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb://localhost/authExample", { useNewUrlParser: true });

app.use(authWare);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
require('./routes/api-routes')(app);


// Start the API server
app.listen(PORT, function() {
console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});