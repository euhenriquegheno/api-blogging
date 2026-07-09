"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioRoutes = usuarioRoutes;
const create_1 = require("./create");
async function usuarioRoutes(app) {
    app.post('/usuario', create_1.create);
}
//# sourceMappingURL=routes.js.map