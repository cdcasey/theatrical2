exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('blackout_dates').del()
        .then(function () {
            // Inserts seed entries
            return knex('blackout_dates').insert([
                { users_productions_id: 2, start_time: '2018-08-25' },
                { users_productions_id: 2, start_time: '2018-08-26T11:00:00', end_time: '2018-08-26T14:00:00' }
            ]);
        });
};