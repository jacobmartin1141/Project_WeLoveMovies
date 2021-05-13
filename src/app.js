if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

const movieRouter = require("../src/movie/movie.router");
const reviewsRouter = require("../src/reviews/reviews.router");
const theatersRouter = require("../src/theaters/theaters.router");

const methodNotAllowed = require("./errors/methodNotAllowed");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json()

app.use('/movies', movieRouter);
app.use('/reviews', jsonParser, reviewsRouter);
app.use('/theaters', theatersRouter);

app.use(methodNotAllowed);

app.use((error, req, res, next) => {
    console.error(error);
    const { status = 500, message = "Something went wrong!" } = error;
    res.status(status).json({ error: message });
});

module.exports = app;