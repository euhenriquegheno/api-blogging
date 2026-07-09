"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicacaoRoutes = publicacaoRoutes;
const create_1 = require("./create");
const find_1 = require("./find");
const find_all_1 = require("./find-all");
const delete_1 = require("./delete");
const update_1 = require("./update");
async function publicacaoRoutes(app) {
    app.post('/publicacao', create_1.create);
    app.get('/publicacao/:id', find_1.findPublicacao);
    app.get('/publicacao', find_all_1.findAllPublicacao);
    app.delete('/publicacao/:id', delete_1.deletePublicacao);
    app.put('/publicacao/:id', update_1.update);
}
//# sourceMappingURL=routes.js.map