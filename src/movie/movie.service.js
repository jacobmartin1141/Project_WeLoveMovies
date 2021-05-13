const knex = require("../db/connection");

function list() {
    return knex("movies")
        .select("*");
}

function readShowing() {
    return knex("movies as m")
        .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
        .select("m.*")
        .where({ "mt.is_showing": true })
        .then((data) => {
            try{
                const newMovieList = data.reduce((acc, movie) => {
                    const foundMovie = acc.find((checkMovie) => checkMovie.movie_id == movie.movie_id);
                    // console.log(foundMovie);
                    if(foundMovie) {
                        return acc;
                    }
                    return [...acc, movie];
                }, []);

                return newMovieList;
            } catch(e) {
                console.log(e);
            }
        });
}

function read(movie_id) {
    return knex("movies")
        .select("*")
        .where({ "movie_id": movie_id })
        // .then((data) => {
        //     console.log(data);
        // });
}

function readTheaters(movie_id) {
    return knex("movies as m")
        .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
        .join("theaters as t", "mt.theater_id", "t.theater_id")
        .select("t.name")
        .where({ "m.movie_id" : movie_id })
        .where({ "mt.is_showing": true });
}

function readReviews(movie_id) {
    return knex("movies as m")
        .join("reviews as r", "r.movie_id", "m.movie_id")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("r.*", "c.*")
        .where({ "m.movie_id": movie_id })
        .then((data) => {
            const result = data.reduce((acc, review) => {
                const newReview = {
                    review_id: review.review_id,
                    content: review.content,
                    score: review.score,
                    critic_id: review.critic_id,
                    movie_id: review.movie_id,
                    critic: {
                        organization_name: review.organization_name,
                        preferred_name: review.preferred_name,
                        surname: review.surname,
                    }
                }
                return [...acc, newReview];
            }, []);
            return result;
        });
}

module.exports = {
    list,
    readShowing,
    read,
    readTheaters,
    readReviews,
}
