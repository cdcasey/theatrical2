
exports.up = function (knex, Promise) {
    return knex.schema.createTable('production_dates', (table) => {
        table.increments();
        table.integer('production_id');
        table.foreign('production_id').references('productions.id').onDelete('CASCADE');
        table.string('start_time');
        table.string('end_time');
        table.timestamps(true, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('production_dates');
};
