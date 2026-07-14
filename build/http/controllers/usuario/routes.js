"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioRoutes = usuarioRoutes;
const create_1 = require("./create");
const find_1 = require("./find");
const find_all_1 = require("./find-all");
const delete_1 = require("./delete");
const update_1 = require("./update");
async function usuarioRoutes(app) {
    app.post('/user', create_1.create);
    app.get('/user/:id', find_1.findUsuario);
    app.get('/user', find_all_1.findAllUsuarios);
    app.delete('/user/:id', delete_1.deleteUsuario);
    app.put('/user/:id', update_1.update);
}
//# sourceMappingURL=routes.js.map