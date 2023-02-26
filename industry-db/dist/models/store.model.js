"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    description: {
        type: String,
        required: true,
        maxlength: 500,
    },
    image: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Store = (0, mongoose_1.model)('Store', schema);
//# sourceMappingURL=store.model.js.map