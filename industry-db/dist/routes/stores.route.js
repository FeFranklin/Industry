"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_model_1 = require("../models/store.model");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const router = express_1.default.Router();
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const store = yield store_model_1.Store.find();
    res.json(store);
}));
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = yield store_model_1.Store.findOne({ _id: req.params.id });
        if (!store)
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Store not found');
        res.json(store);
    }
    catch (e) {
        next(e);
    }
}));
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = new store_model_1.Store(req.body.store);
        yield store.save();
        res.json(store);
    }
    catch (e) {
        next(e);
    }
}));
exports.default = router;
//# sourceMappingURL=stores.route.js.map