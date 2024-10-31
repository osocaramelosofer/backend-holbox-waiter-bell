"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
exports.apiRouter = (0, express_1.Router)();
exports.apiRouter.get('/list', controller_1.list);
exports.apiRouter.post('/add', controller_1.addTodo);
exports.apiRouter.get('/detail', controller_1.getDetail);
exports.apiRouter.delete('/delete', controller_1.deleteTodo);
exports.apiRouter.put('/todo', controller_1.putTodo);
// 5 verbos hhtp get, delete, post, put, patch
