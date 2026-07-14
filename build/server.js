"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./env");
const app_1 = require("./app");
const typeorm_1 = require("./lib/typeorm/typeorm");
async function bootstrap() {
    await (0, typeorm_1.initializeDataSource)();
    await app_1.app.listen({
        host: '0.0.0.0',
        port: env_1.env.PORT,
    });
    console.log('Server is running on http://localhost:' + env_1.env.PORT);
}
bootstrap().catch((error) => {
    console.error('Error during application startup', error);
    process.exit(1);
});
//# sourceMappingURL=server.js.map