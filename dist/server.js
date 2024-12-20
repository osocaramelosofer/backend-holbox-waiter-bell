"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("./config/express");
const app = (0, express_2.createApp)();
const port = 8080;
// Middleware to handle JSON
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send("hello world setup pipeline :D second try?");
});
app.listen(port, () => {
    console.log(`Server running at port http://localhost:${port}`);
});
