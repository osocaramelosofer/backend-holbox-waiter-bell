"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = list;
exports.addTodo = addTodo;
exports.getDetail = getDetail;
exports.deleteTodo = deleteTodo;
exports.putTodo = putTodo;
exports.INTERNAL_SERVER_ERROR_RESPONSE = INTERNAL_SERVER_ERROR_RESPONSE;
exports.validateParams = validateParams;
const services_1 = require("./services");
async function list(req, res) {
    try {
        const todos = await services_1.services.getTodos();
        res.status(200).json({
            data: todos
        });
    }
    catch (error) {
        console.error({ error });
        const message = error instanceof Error ? error.message : 'Fail to delete todo';
        INTERNAL_SERVER_ERROR_RESPONSE(res, message);
    }
}
async function addTodo(req, res) {
    try {
        const params = req.body;
        const data = await services_1.services.addTodo(Object.assign({}, params));
        res.status(200).json({ data });
    }
    catch (error) {
        console.error({ error });
        const message = error instanceof Error ? error.message : 'Fail to delete todo';
        INTERNAL_SERVER_ERROR_RESPONSE(res, message);
    }
}
async function getDetail(req, res) {
    try {
        const requiredParams = ['id'];
        validateParams(requiredParams, req.query, res);
        const { id } = req.query;
        const detail = await services_1.services.getDetail(id);
        res.status(200).json({
            data: detail
        });
    }
    catch (error) {
        console.error({ error });
        const message = error instanceof Error ? error.message : 'Fail to delete todo';
        INTERNAL_SERVER_ERROR_RESPONSE(res, message);
    }
}
async function deleteTodo(req, res) {
    try {
        validateParams(['id'], req.query, res);
        const { id } = req.query;
        const { success, message } = await services_1.services.deleteTodo(id);
        res.status(200).json({
            success,
            message
        });
    }
    catch (error) {
        console.error({ error });
        const message = error instanceof Error ? error.message : 'Fail to delete todo';
        INTERNAL_SERVER_ERROR_RESPONSE(res, message);
    }
}
async function putTodo(req, res) {
    try {
        const requiredParams = ['id', 'title', 'description', 'status'];
        validateParams(requiredParams, req.body, res);
        const data = services_1.services.updateTodo(Object.assign({}, req.body));
        res.status(200).json({ data, message: 'Todo updated successfully' });
    }
    catch (error) {
        console.error({ error });
        const message = error instanceof Error ? error.message : 'Fail updating the todo';
        INTERNAL_SERVER_ERROR_RESPONSE(res, message);
    }
}
function INTERNAL_SERVER_ERROR_RESPONSE(res, message) {
    return res.status(500).json({
        error: {
            message,
            code: 'Internal error'
        }
    });
}
function validateParams(requiredParams, dictionary, response) {
    for (const param of requiredParams) {
        if (dictionary[param] === undefined) {
            return response.status(400).json({
                success: false,
                error: {
                    message: `Missing ${param} in request`
                }
            });
        }
    }
}
