"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hello = void 0;
var world = 'Hi';
function Hello(word) {
    if (word === void 0) { word = world; }
    return "Hello " + world;
}
exports.Hello = Hello;
