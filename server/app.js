const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");

const { json, urlencoded } = express;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// mongoose schema
const profileSchema = {
  userID:{
    type: mongoose.Types.ObjectId
  },
  firstName:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  gender:{
    type: String,
    required: true
  },
  birthDate:{
    type: Date,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  phone:{
    type: Number,
    required: true
  },
  address:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  availability:{
    type: Boolean,
    required: true
  }
}

const Profile = mongoose.model('Profile', profileSchema);

var app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/ping", pingRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
