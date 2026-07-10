"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicacaoRoutes = publicacaoRoutes;
const create_1 = require("./create");
const find_1 = require("./find");
const find_all_1 = require("./find-all");
const delete_1 = require("./delete");
const update_1 = require("./update");
const search_1 = require("./search");
async function publicacaoRoutes(app) {
    app.get('/posts/search', search_1.searchPublicacoes);
    app.get('/posts', find_all_1.findAllPublicacao);
    app.get('/posts/:id', find_1.findPublicacao);
    app.post('/posts', create_1.create);
    app.put('/posts/:id', update_1.update);
    app.delete('/posts/:id', delete_1.deletePublicacao);
}
//# sourceMappingURL=routes.js.map