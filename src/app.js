const express = require("express");
const rateLimit = require("./middlewares/rateLimit");
const errorHandling = require("./middlewares/errorHandling");
const usersRoutes = require("./routes/users");
//... other routes
const app = express();

app.use(express.json());
app.use(rateLimit);
app.use("/users", usersRoutes);
//... other routes
app.use(errorHandling);

module.exports = app;
