"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.services = void 0;
const postgres_1 = require("../../config/postgres");
const uuid_1 = require("uuid");
exports.services = {
    addTodo: async ({ title, description, status }) => {
        try {
            const id = (0, uuid_1.v4)();
            const text = 'INSERT INTO todo(id, title, description, status) VALUES($1, $2, $3, $4) RETURNING *';
            const values = [id, title, description, status];
            const result = await postgres_1.pgPool.query(text, values);
            return result.rows[0] || null;
        }
        catch (error) {
            console.log("Something went wrong adding the todo");
            console.error({ error });
            return null;
        }
    },
    getTodos: async () => {
        try {
            const result = await postgres_1.pgPool.query('SELECT * FROM todo');
            return result.rows;
        }
        catch (error) {
            return false;
        }
    },
    getDetail: async (id) => {
        try {
            const text = `SELECT * FROM TODO
                        WHERE id = $1`;
            const values = [id];
            const result = await postgres_1.pgPool.query(text, values);
            const todo = result.rows[0];
            return todo || null;
        }
        catch (error) {
            console.error({ error });
            return null;
        }
    },
    deleteTodo: async (id) => {
        try {
            const text = `DELETE FROM todo
                            WHERE id = $1`;
            const values = [id];
            const result = await postgres_1.pgPool.query(text, values);
            console.log(result.rows);
            return { success: true, message: 'The todo was deleted successfully' };
        }
        catch (error) {
            console.error({ error });
            throw new Error("Something went wrong trying to delete the todo");
        }
    },
    updateTodo: async ({ id, title, description, status }) => {
        try {
            const text = `
                    UPDATE todo
                    SET title = $2, description = $3, status = $4
                    WHERE id = $1
                    RETURNING *
            `;
            const values = [id, title, description, status];
            const result = await postgres_1.pgPool.query(text, values);
            console.log(result.rows);
            const todo = result.rows[0] || null;
            return todo;
        }
        catch (error) {
            console.error({ error });
            throw new Error('Something went wrong trying to update the todo');
        }
    }
};
