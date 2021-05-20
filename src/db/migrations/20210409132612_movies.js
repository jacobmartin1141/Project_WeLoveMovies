
exports.up = function(knex) {
  return knex.schema.createTable("movies", (table) => {
      table.increments("movie_id").primary();
      table.string("title");
      table.integer("runtime_in_minutes");
      table.string("rating");
      table.text("description", 'longtext');
      table.string("image_url");
  }).then(() => console.log)
  .catch((e) => console.log(e));
};

exports.down = function(knex) {
    return knex.schema.dropTable("movies");
};
