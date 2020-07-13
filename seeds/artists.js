
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('artists').del()
    .then(function () {
      // Inserts seed entries
      return knex('artists').insert([
        {id: 1, name: 'Thunder Cat'},
        {id: 2, name: 'Flying Lotus'},

      ]);
    });
};
