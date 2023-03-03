"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
let dbURI = process.env.DB_URI;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};
mongoose_1.default.set('strictQuery', false);
mongoose_1.default
    .connect(dbURI, options)
    .then(() => {
    console.log('Mongoose connection done');
    app_1.default.listen(process.env.APP_PORT, () => {
        console.log(`server listening on ${process.env.APP_PORT}`);
    });
})
    .catch((e) => {
    console.log('Mongoose connection error');
    console.log(e);
});
// CONNECTION EVENTS
// When successfully connected
mongoose_1.default.connection.on('connected', () => {
    console.log('Mongoose default connection open to ' + dbURI);
});
// If the connection throws an error
mongoose_1.default.connection.on('error', (err) => {
    console.log('Mongoose default connection error: ' + err);
});
// When the connection is disconnected
mongoose_1.default.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});
// If the Node process ends, close the Mongoose connection (ctrl + c)
process.on('SIGINT', () => {
    mongoose_1.default.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
process.on('uncaughtException', (err) => {
    console.log('Uncaught Exception: ' + err);
});
//# sourceMappingURL=index.js.map