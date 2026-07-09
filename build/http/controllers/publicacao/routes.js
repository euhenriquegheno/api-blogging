"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicacaoRoutes = publicacaoRoutes;
const create_1 = require("./create");
async function publicacaoRoutes(app) {
    app.post('/publicacao', create_1.create);
}
//# sourceMappingURL=routes.js.map