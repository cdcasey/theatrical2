exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('production_dates').del()
        .then(function () {
            // Inserts seed entries
            return knex('production_dates').insert([
                { production_id: 1, start_time: '2018-09-07T20:00:00', end_time: '2018-09-07T22:30:00' },
                { production_id: 1, start_time: '2018-09-08T20:00:00', end_time: '2018-09-08T22:30:00' },
                { production_id: 1, start_time: '2018-09-14T20:00:00', end_time: '2018-09-14T22:30:00' },
                { production_id: 1, start_time: '2018-09-15T20:00:00', end_time: '2018-09-15T22:30:00' },
                { production_id: 1, start_time: '2018-09-20T20:00:00', end_time: '2018-09-20T22:30:00' },
                { production_id: 1, start_time: '2018-09-21T20:00:00', end_time: '2018-09-21T22:30:00' },
                { production_id: 1, start_time: '2018-09-22T20:00:00', end_time: '2018-09-22T22:30:00' },
                { production_id: 1, start_time: '2018-09-27T20:00:00', end_time: '2018-09-27T22:30:00' },
                { production_id: 1, start_time: '2018-09-28T20:00:00', end_time: '2018-09-28T22:30:00' },
                { production_id: 1, start_time: '2018-09-29T20:00:00', end_time: '2018-09-29T22:30:00' },
            ]);
        });
};