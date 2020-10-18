"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ModError extends Error {
    constructor(code, message) {
        super();
        this.code = code;
        this.message = message;
    }
}
exports.default = ModError;
