/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
    // Create notes table
    await knex.schema.createTableIfNotExists('notes', (table) => {
        table.string('noteID', 36).notNullable().primary();
        table.text('title').nullable().defaultTo(null);
        table.text('text').nullable().defaultTo(null);
        table.string('color', 80).nullable().defaultTo(null);
        table.dateTime('createdAt').notNullable();
        table.dateTime('updatedAt').nullable().defaultTo(null);
        table.index(['noteID']);
    });

    // Create files table
    await knex.schema.createTableIfNotExists('files', (table) => {
        table.string('fileID', 36).notNullable().primary();
        table.string('name', 100).notNullable();
        table.string('ext', 10).notNullable();
        table.string('checksum', 32).notNullable();
        table.dateTime('createdAt').notNullable();
        table.index(['fileID']);
    });

    // Create tags table
    await knex.schema.createTableIfNotExists('tags', (table) => {
        table.string('tagID', 36).notNullable().primary();
        table.text('text').notNullable();
        table.dateTime('createdAt').notNullable();
        table.index(['tagID']);
    });

    // Create notes_files table
    await knex.schema.createTableIfNotExists('notes_files', (table) => {
        table.string('noteFileID', 36).notNullable().primary();
        table.string('noteID', 36).notNullable().references('noteID').inTable('notes').onDelete('CASCADE');
        table.string('fileID', 36).notNullable().references('fileID').inTable('files').onDelete('CASCADE');
        table.dateTime('createdAt').notNullable();
        table.index(['noteFileID']);
        table.index(['noteID', 'fileID']);
    });

    // Create notes_tags table
    await knex.schema.createTableIfNotExists('notes_tags', (table) => {
        table.string('noteTagID', 36).notNullable().primary();
        table.string('noteID', 36).notNullable().references('noteID').inTable('notes').onDelete('CASCADE');
        table.string('tagID', 36).notNullable().references('tagID').inTable('tags').onDelete('CASCADE');
        table.dateTime('createdAt').notNullable();
        table.index(['noteTagID']);
        table.index(['noteID', 'tagID']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
    // Drop tables in reverse order
    await knex.schema.dropTableIfExists('notes_tags');
    await knex.schema.dropTableIfExists('notes_files');
    await knex.schema.dropTableIfExists('tags');
    await knex.schema.dropTableIfExists('files');
    await knex.schema.dropTableIfExists('notes');
};
