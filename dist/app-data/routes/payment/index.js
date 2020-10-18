"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const payment_1 = __importDefault(require("../../controllers/payment"));
exports.default = (req, res, next) => {
    console.log("You've access the payment routes\n");
    const cartData = req.body;
    // console.log(cart);
    console.log('\n');
    payment_1.default(cartData, next);
    // next();
};
