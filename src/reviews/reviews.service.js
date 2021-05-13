const knex = require("../db/connection");

function read(review_id) {
    return knex("reviews")
        .select("*")
        .where({ review_id })
        .first();
}

function update(review_id, updatedReview) {
    return knex("reviews as r")
        .where({ "r.review_id": review_id })
        .update(updatedReview, "r.*");
}

function removeReview(review_id) {
    return knex("reviews")
        .where({ "review_id": review_id })
        .del();
}

module.exports = {
    read,
    removeReview,
    update,
}