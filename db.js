const mongoose = require("mongoose");
require("dotenv").config()

const Schema = mongoose.Schema;
const secret = process.env.secret
const mongoDb = process.env.DB_URL
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));
