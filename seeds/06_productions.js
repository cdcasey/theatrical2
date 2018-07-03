exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('productions').del()
        .then(function () {
            // Inserts seed entries
            return knex('productions').insert([
                { name: 'The Baron\'s Men present Romeo and Juliet', play_id: 1 },
            ]);
        });
};
