/* Add the dotenv config */
require("dotenv").config();

/* Add imports */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT;
const auditRoutes = require("./routes/audit");

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
app.use("/api/audit", auditRoutes);
