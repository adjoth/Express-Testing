"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
// server.js
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : "9001";
app.get('/users', function (req, res) {
    res.json({ users: 'allUsers' });
    // Real code from my application below
    //  model.User.findAll().then (users => {
    //        res.status(200).json({ users });
    //     }).catch(error=>{
    //        console.log(error)
    //        req.status(500).send(error)
    //  })
});
app.get('/users/3', function (req, res) {
    res.json({ user: 'user3' });
    // Real code from my application below
    // const { id } = req.params;
    //    model.User.findOne({
    //        where: { id: Number(id) }
    //    }).then(user=>{
    //        res.status(200).json({ user });
    //    }).catch(error=>{
    //        console.log(error)
    //        req.status(500).send(error)
    //    })
});
app.listen(port, () => {
    console.log(`Application is listening on port ${port}`);
});
exports.server = app;
