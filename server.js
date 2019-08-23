'use strict'
const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

const config = require("./config/config");
const setupController = require('./api/controllers/setupController.js');
const todoController = require('./api/controllers/todoController.js');
const Todos = require("./api/models/todoModel");

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 3000;

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.static('./public'));
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// connect to MongoDb cloud
mongoose.connect(config.getMongodbUri(), { useNewUrlParser: true });
// khoi tao du lieu
setupController(app);
// api routing
todoController(app);

// routing here
app.get('/', (req, res) => {
	res.render("index", { title: 'Node Todo !!!' });
})

server.listen(port, () => {
	console.log("Server is running at port: " + port);
})