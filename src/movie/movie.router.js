const router = require('express').Router();
const controller = require("./movie.controller");

const methodNotAllowed = require('../errors/methodNotAllowed');

router.route("/")
    .get(controller.list);

router.route("/:movieId/theaters")
    .get(controller.readTheaters);

router.route("/:movieId/reviews")
    .get(controller.readReviews);

router.route("/:movieId")
    .get(controller.read);

module.exports = router;
