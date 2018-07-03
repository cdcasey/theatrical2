exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('users_productions').del()
        .then(function () {
            // Inserts seed entries
            return knex('users_productions').insert([
                { user_id: 4, production_id: 1, production_role_id: 1 },
                { user_id: 3, production_id: 1, production_role_id: 2 },
                { user_id: 17, production_id: 1, production_role_id: 2 },
                { user_id: 16, production_id: 1, production_role_id: 2 },
                { user_id: 10, production_id: 1, production_role_id: 2 },
                { user_id: 7, production_id: 1, production_role_id: 2 },
                { user_id: 5, production_id: 1, production_role_id: 2 },
                { user_id: 9, production_id: 1, production_role_id: 2 },
                { user_id: 8, production_id: 1, production_role_id: 2 },
                { user_id: 14, production_id: 1, production_role_id: 2 },
                { user_id: 15, production_id: 1, production_role_id: 2 },
                { user_id: 13, production_id: 1, production_role_id: 2 },
                { user_id: 12, production_id: 1, production_role_id: 2 },
                { user_id: 6, production_id: 1, production_role_id: 2 },
                { user_id: 11, production_id: 1, production_role_id: 2 },
                { user_id: 18, production_id: 1, production_role_id: 2 },
            ]);
        });
};
