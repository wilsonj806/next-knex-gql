
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('albums').del()
    .then(function () {
      // Inserts seed entries
      return knex('albums').insert([
        {
          id: 1,
          name: 'Drunk',
          artist_id: 1,
          year: 2017,
        },
        {
          id: 2,
          name: 'It\'s What It Is',
          artist_id: 1,
          year: 2020,
        },
        {
          id: 3,
          name: 'Flamagra',
          artist_id: 2,
          year: 2019,
        },
      ]);
    });
};
