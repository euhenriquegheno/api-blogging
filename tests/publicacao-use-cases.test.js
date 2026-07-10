"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const create_publicacao_1 = require("../src/uses-cases/create-publicacao");
const delete_publicacao_1 = require("../src/uses-cases/delete-publicacao");
const find_all_publicacao_1 = require("../src/uses-cases/find-all-publicacao");
const find_publicacao_1 = require("../src/uses-cases/find-publicacao");
const resource_not_found_1 = require("../src/uses-cases/errors/resource-not-found");
const search_publicacao_1 = require("../src/uses-cases/search-publicacao");
const update_publicacao_1 = require("../src/uses-cases/update-publicacao");
class InMemoryPublicacaoRepository {
    constructor() {
        this.items = [];
    }
    async findAll(page, limit) {
        return this.items.slice((page - 1) * limit, page * limit);
    }
    async search(term) {
        const normalizedTerm = term.toLocaleLowerCase();
        return this.items.filter(({ titulo, conteudo }) => titulo.toLocaleLowerCase().includes(normalizedTerm) ||
            conteudo.toLocaleLowerCase().includes(normalizedTerm));
    }
    async findById(id) {
        return this.items.find((item) => item.id === id) ?? null;
    }
    async create(publicacao) {
        const created = { ...publicacao, id: publicacao.id ?? crypto.randomUUID() };
        this.items.push(created);
        return created;
    }
    async update(publicacao) {
        const index = this.items.findIndex((item) => item.id === publicacao.id);
        this.items[index] = publicacao;
        return publicacao;
    }
    async delete(id) {
        const initialLength = this.items.length;
        this.items = this.items.filter((item) => item.id !== id);
        return this.items.length < initialLength;
    }
}
const autor = { id: 1, nome: 'Docente', email: 'docente@escola.test' };
function makePublicacao(overrides = {}) {
    return {
        id: 'post-1',
        titulo: 'Introdução ao Node.js',
        conteudo: 'Conteúdo da postagem',
        usuario: autor,
        ...overrides,
    };
}
(0, globals_1.describe)('casos de uso de publicações', () => {
    let repository;
    (0, globals_1.beforeEach)(() => {
        repository = new InMemoryPublicacaoRepository();
    });
    (0, globals_1.it)('cria uma postagem', async () => {
        const result = await new create_publicacao_1.CreatePublicacaoUseCase(repository).handler(makePublicacao());
        (0, globals_1.expect)(result.titulo).toBe('Introdução ao Node.js');
        (0, globals_1.expect)(repository.items).toHaveLength(1);
    });
    (0, globals_1.it)('edita uma postagem existente', async () => {
        repository.items.push(makePublicacao());
        const result = await new update_publicacao_1.UpdatePublicacaoUseCase(repository).handler('post-1', makePublicacao({ titulo: 'Node.js atualizado' }));
        (0, globals_1.expect)(result.titulo).toBe('Node.js atualizado');
        (0, globals_1.expect)(repository.items[0]?.titulo).toBe('Node.js atualizado');
    });
    (0, globals_1.it)('recusa a edição de uma postagem inexistente', async () => {
        await (0, globals_1.expect)(new update_publicacao_1.UpdatePublicacaoUseCase(repository).handler('inexistente', makePublicacao())).rejects.toBeInstanceOf(resource_not_found_1.ResourceNotFoundError);
    });
    (0, globals_1.it)('exclui uma postagem existente', async () => {
        repository.items.push(makePublicacao());
        await new delete_publicacao_1.DeletePublicacaoUseCase(repository).handler('post-1');
        (0, globals_1.expect)(repository.items).toHaveLength(0);
    });
    (0, globals_1.it)('recusa a exclusão de uma postagem inexistente', async () => {
        await (0, globals_1.expect)(new delete_publicacao_1.DeletePublicacaoUseCase(repository).handler('inexistente')).rejects.toBeInstanceOf(resource_not_found_1.ResourceNotFoundError);
    });
    (0, globals_1.it)('localiza uma postagem por id', async () => {
        repository.items.push(makePublicacao());
        const result = await new find_publicacao_1.FindPublicacaoUseCase(repository).handler('post-1');
        (0, globals_1.expect)(result.id).toBe('post-1');
    });
    (0, globals_1.it)('lista as postagens com paginação', async () => {
        repository.items.push(makePublicacao(), makePublicacao({ id: 'post-2' }));
        const result = await new find_all_publicacao_1.FindAllPublicacaoUseCase(repository).handler(2, 1);
        (0, globals_1.expect)(result.map(({ id }) => id)).toEqual(['post-2']);
    });
    (0, globals_1.it)('busca postagens por título ou conteúdo', async () => {
        repository.items.push(makePublicacao(), makePublicacao({ id: 'post-2', titulo: 'PostgreSQL', conteudo: 'Banco' }));
        const result = await new search_publicacao_1.SearchPublicacaoUseCase(repository).handler('node');
        (0, globals_1.expect)(result.map(({ id }) => id)).toEqual(['post-1']);
    });
});
//# sourceMappingURL=publicacao-use-cases.test.js.map