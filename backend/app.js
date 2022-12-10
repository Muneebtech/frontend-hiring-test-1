require("dotenv").config();
require("./src/config/database").connect();
const express = require("express");
const cors = require('cors')
const routes = require('./src/routes');
const app = express();

app.use(cors());
app.options('*', cors())
app.use(express.json());

// v1 api routes
app.use(routes);
module.exports = app;