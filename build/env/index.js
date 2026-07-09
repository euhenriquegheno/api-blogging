"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z
        .enum(['development', 'production', 'test'])
        .default('development'),
    PORT: zod_1.z.coerce.number().default(3000),
    DATABASE_USER: zod_1.z.string(),
    DATABASE_HOST: zod_1.z.string(),
    DATABASE_NAME: zod_1.z.string(),
    DATABASE_PASSWORD: zod_1.z.string(),
    DATABASE_PORT: zod_1.z.coerce.number(),
});
const _env = envSchema.safeParse(process.env);
if (!_env.success) {
    console.error('Invalid environment variables', _env.error.format());
    throw new Error('Invalid environment variables');
}
exports.env = _env.data;
//# sourceMappingURL=index.js.map