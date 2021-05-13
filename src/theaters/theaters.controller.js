const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const services = require("./theaters.services");

async function list(req, res, next) {
    res.json({ data: await services.list() });
}

module.exports = {
    list: [asyncErrorBoundary(list),],
}
