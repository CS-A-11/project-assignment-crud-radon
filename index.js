var express = require('express');
var app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require('express-session')
require("./app/models/db");

var apiIndexRoute = require("./api/routes/index");
var discussionsApi = require("./api/routes/discussion");
var indexRouter = require("./app/routes/index");
var discussions = require("./app/routes/discussions");
var userRoutes = require("./app/routes/users");
var articlePostApi = require("./api/routes/articlePost");
var articlePost = require("./app/routes/articlePost");

app.set("views", path.join(__dirname, "app", "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", [apiIndexRoute, discussionsApi]);
app.use("/api", articlePostApi);
app.use("/", articlePost);
app.use("/", indexRouter);
app.use("/", userRoutes);
app.use("/", discussions);

const PORT = process.env.PORT || 5000;

app.listen(PORT, process.env.IP, function () {
  console.log("server started");
});
