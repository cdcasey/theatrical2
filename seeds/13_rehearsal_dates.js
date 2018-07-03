
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('rehearsal_dates').del()
    .then(function () {
      // Inserts seed entries
      return knex('rehearsal_dates').insert([
        { scene_id: 2, production_id: 1, start_time: '2018-08-10' },
        { scene_id: 3, production_id: 1, start_time: '2018-08-15' },
        { scene_id: 3, production_id: 1, start_time: '2018-08-17' },
        { scene_id: 4, production_id: 1, start_time: '2018-08-22' },
        { scene_id: 5, production_id: 1, start_time: '2018-08-23' },
        { scene_id: 5, production_id: 1, start_time: '2018-08-15T19:00:00', end_time: '2018-08-15T22:00:00' },
      ]);
    });
};
