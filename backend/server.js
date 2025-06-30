require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
// mongoose.connect(process.env.MONGO_URI);
mongoose.set('strictQuery', true); // to supress the strictQuery warnings
mongoose.connect('mongodb://192.168.178.60:27017/time-visualizer');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/public")));

app.use("/", require("./routes/auth"));
app.use("/dashboard", require("./routes/time"));
// app.use("/profile", require("./routes/profile"));

app.listen(3000, () => console.log("Server läuft auf http://localhost:3000"));
