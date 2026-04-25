/* Add the dotenv config */
require("dotenv").config();

/* Add imports */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT;

/* Configure parsers */
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

/* CORS config */
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

app.use(cors(corsOptions));

/* Use routes */
