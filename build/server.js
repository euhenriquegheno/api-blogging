"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./env");
const app_1 = require("./app");
app_1.app
    .listen({
    host: '0.0.0.0',
    port: env_1.env.PORT,
})
    .then(() => {
    console.log('Server is running on https://localhost:' + env_1.env.PORT);
});
//# sourceMappingURL=server.js.map