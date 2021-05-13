const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./movie.service");

async function list(req, res, next) {
    const { is_showing } = req.query;

    if(is_showing === undefined) {
        res.json({ data: await service.list() });
    } else {
        res.json({ data: await service.readShowing() });
    }
}

async function idExists(req, res, next) {
    const { movieId } = req.params;
    const data = await service.read(movieId);

    // console.log(data, data[0]);

    if(data[0] === undefined) {
        next({ status: 404, message: `Movie couldn't be found, 'movieId' invalid: ${movieId}`});
    }
    res.locals.data = data[0];
    next();
}

async function read(req, res, next) {
    res.json({ data: res.locals.data });
}

async function readTheaters(req, res, next) {
    const { movieId } = req.params;
    const foundTheaters = await service.readTheaters(movieId);
    res.json({ data: foundTheaters });
}

async function readReviews(req, res, next) {
    const { movieId } = req.params;
    const foundReviews = await service.readReviews(movieId);
    res.json({ data: foundReviews });
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [idExists, asyncErrorBoundary(read)],
    readTheaters: [idExists, asyncErrorBoundary(readTheaters)],
    readReviews: [idExists, asyncErrorBoundary(readReviews)],
}
