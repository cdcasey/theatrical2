
exports.up = function (knex, Promise) {
    return knex.schema.createTable('blackout_dates', (table) => {
        table.increments();
        table.integer('users_productions_id');
        table.foreign('users_productions_id').references('users_productions.id').onDelete('CASCADE');
        table.string('start_time');
        table.string('end_time');
        table.timestamps(true, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('blackout_dates');
};
