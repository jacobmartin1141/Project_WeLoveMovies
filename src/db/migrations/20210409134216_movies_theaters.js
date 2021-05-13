
exports.up = function(knex) {
    return knex.schema.createTable("movies_theaters", (table) => {
        table.boolean("is_showing");
        table
            .integer("movie_id").unsigned()
            .references("movie_id")
            .inTable("movies")
            .onDelete("cascade");
        table
            .integer("theater_id").unsigned()
            .references("theater_id")
            .inTable("theaters")
            .onDelete("cascade");
        });
};

exports.down = function(knex) {
  return knex.schema.dropTable("movies_theaters");
};
