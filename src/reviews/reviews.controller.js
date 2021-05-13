const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const services = require("./reviews.service");

const validProperties = [
    'review_id',
    'content',
    'score',
    'critic_id',
    'movie_id',
]
const hasValidProperties = require("../errors/hasProperties")(validProperties);


async function reviewExists(req, res, next) {
    const { reviewId } = req.params;
    const foundReview = await services.read(reviewId);

    if(foundReview === undefined) {
        next({ status: 404, message: "Review cannot be found." });
    }

    res.locals.foundReview = foundReview;
    next();
}

async function remove(req, res, next) {
    const { reviewId } = req.params;
    await services.removeReview(reviewId);

    res.status(204).json({ data: "No content."});
}

async function update(req, res, next) {
    const { reviewId } = req.params;
    const { data } = req.body;

    await services.update(reviewId, data);

    const revData = {...res.locals.foundReview, ...data};

    const newReview = {
        content: revData.content,
        created_at: " ",
        critic: {
            organization_name: (revData.organization_name ? revData.organization_name : ""),
            preferred_name: (revData.preferred_name ? revData.preferred_name : ""),
            surname: (revData.surname ? revData.surname : ""),
        },
        critic_id: revData.critic_id,
        movie_id: revData.movie_id,
        review_id: revData.review_id,
        score: revData.score,
        updated_at: " ",        
    };

    res.json({ data: newReview });
}

module.exports = {
    remove: [
        reviewExists,
        asyncErrorBoundary(remove),
    ],
    update: [
        reviewExists, 
        update,
    ],
}
