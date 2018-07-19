
exports.up = function (knex, Promise) {
    return knex.schema.createTable('blackout_dates', (table) => {
        table.increments();
        table.integer('users_id');
        table.foreign('users_id').references('users.id').onDelete('CASCADE');
        table.string('start_time');
        table.string('end_time');
        table.timestamps(true, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('blackout_dates');
};
