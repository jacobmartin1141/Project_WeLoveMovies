const knex = require("../db/connection");

function list() {
    return knex("theaters as t")
        .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
        .join("movies as m", "m.movie_id", "mt.movie_id")
        .select('t.*', 'm.title', 'm.rating', 'm.runtime_in_minutes')
        .then((data) => {
            try{
                const newTheaterList = data.reduce((acc, theater) => {
                    let foundIndex = -1;
                    const foundTheater = acc.find((checkTheater, index) => {
                        foundIndex++
                        return checkTheater.theater_id == theater.theater_id
                    });
                    // console.log(foundTheater);
                    if(foundTheater) {
                        //We already have a theater object for this ID in the array, so we want to append that object's movie array with the found movie
                        const newTheater = {
                            ...foundTheater,
                            movies: [
                                ...foundTheater.movies,
                                {rating: theater.rating,
                                runtime_in_minutes: theater.runtime_in_minutes,
                                title: theater.title,
                            },],
                        }
                        
                        acc.splice(foundIndex, 1, newTheater);

                        return acc;
                    }
                    //This is a theater we haven't encountered yet, so we should format it to have the movie array and return that
                    const newTheater = {
                        theater_id: theater.theater_id,
                        name: theater.name,
                        address_line_1: theater.address_line_1,
                        address_line_2: theater.address_line_2,
                        city: theater.city,
                        state: theater.state,
                        zip: theater.zip,
                        movies: [{
                            rating: theater.rating,
                            runtime_in_minutes: theater.runtime_in_minutes,
                            title: theater.title,
                        },],
                    }
                    return [...acc, newTheater];
                }, []);

                return newTheaterList;
            } catch(e) {
                console.log(e);
            }
        });
}

module.exports = {
    list,
}
