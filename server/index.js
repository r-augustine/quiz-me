const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const http = require("http");
const mongoose = require("mongoose");
const debug = require("debug")("http");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/api/users");
const quizRouter = require("./routes/api/quizzes");
const questionRouter = require("./routes/api/questions");
const topicRouter = require("./routes/api/topics");

const app = express();
const server = http.createServer(app);

// app.use(cors());
app.use(logger("dev"));
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/v1/users", usersRouter);
app.use("/v1/quizzes", quizRouter);
app.use("/v1/questions", questionRouter);
app.use("/v1/topics", topicRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || 5000);

// handle specific listen errors with friendly messages
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " required elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

function onDatabaseError(error) {
  debug("Error connecting to mongo database ", error);
}

function onDatabaseConnect() {
  debug("Database connection successful...");
  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);
}

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", onDatabaseError);
db.once("open", onDatabaseConnect);
