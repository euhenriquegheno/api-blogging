# API Blogging
> Blog institucional onde professores publicam materiais para a comunidade acadêmica: API REST (Fastify + TypeORM) já existente, complementada por uma interface React consumida por Administradores, Professores e Alunos.

## Stack
| Camada | Tecnologia |
|--------|------------|
| Frontend | React + Vite, React Router (navegação), `fetch` nativo (consumo da API), Tailwind CSS (estilização) |
| Backend | Fastify + TypeORM (existente) |
| Banco de dados | MySQL (migrado de PostgreSQL) |
| Autenticação | JWT com sessão de 24 horas; senha com hash bcrypt (já implementado no backend) |
| Testes (backend) | Jest |
| Documentação da API | Swagger (`/docs`) |
| Containers | Docker / Docker Compose (dev e produção) |

## Estrutura de pastas
```
api-blogging/
├── backend/                       # Backend (Fastify + TypeORM)
│   ├── src/
│   │   ├── entities/                  # Entidades TypeORM (usuario, publicacao)
│   │   │   └── models/                  # Interfaces/tipos de domínio das entidades
│   │   ├── env/                       # Validação e tipagem das variáveis de ambiente (Zod)
│   │   ├── http/
│   │   │   ├── controllers/             # Controllers HTTP por recurso (publicacao, usuario) + routes.ts
│   │   │   └── swagger-schemas.ts       # Schemas usados na documentação Swagger
│   │   ├── lib/
│   │   │   └── typeorm/                  # Configuração da conexão TypeORM (DataSource)
│   │   ├── repositories/
│   │   │   └── typeorm/                   # Implementações dos repositórios com TypeORM
│   │   ├── uses-cases/                  # Regras de negócio (casos de uso), um arquivo por ação
│   │   │   ├── errors/                    # Erros de domínio (ex.: credenciais inválidas, recurso não encontrado)
│   │   │   └── factory/                   # Fábricas que montam use case + repository (injeção de dependência manual)
│   │   └── utils/                       # Funções utilitárias
│   ├── tests/                      # Testes unitários (Jest) dos casos de uso do backend
│   ├── package.json                # Dependências e scripts do backend
│   ├── tsconfig.json, jest.config.js, .eslintrc.json, .npmrc
│   ├── .env.example
│   ├── Dockerfile, .dockerignore
│   └── build/                      # Build compilado (gitignored)
├── frontend/                      # Interface React (Vite + TypeScript + Tailwind + Vitest)
│   └── src/
│       ├── app/config/               # Configuração da aplicação
│       ├── components/               # Componentes compartilhados
│       ├── features/
│       │   ├── auth/                   # Autenticação (login, guarda de rotas)
│       │   └── posts/                  # Posts: api, queries, components, utils
│       ├── layouts/                  # Layouts de página
│       ├── pages/                    # Páginas/rotas
│       ├── services/                 # Clientes de API / integrações
│       ├── styles/                   # Estilos globais
│       ├── test/                     # Testes do frontend
│       └── types/                    # Tipos TypeScript
├── docs/                          # Documentação do projeto
├── .github/                       # Workflows de CI/CD (testes, build, publicação Docker)
├── docker-compose.yml, docker-compose.dev.yml   # Configuração de containers (dev e produção), apontando para backend/
└── SPEC.md                        # Especificação do projeto
```

## Como rodar localmente

**Backend**
```bash
cd backend
npm ci
cp .env.example .env        # preencher DATABASE_USER, DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT (MySQL, após a migração)
npm run start:dev           # API em http://localhost:3000, docs em /docs
```

**Frontend**
```bash
cd frontend
npm ci
npm run dev                 # Vite dev server
```

## Padrões de código
- Nomenclatura de arquivos: kebab-case, com sufixo indicando o papel do arquivo (`*.entity.ts`, `*.interface.ts`, `*.repository.ts`, `make-*-use-case.ts` nas factories).
- Nomenclatura de variáveis e funções: camelCase; entidades e termos de domínio em português, seguindo o vocabulário já usado no backend (`usuario`, `publicacao`, `tipo`).
- Estrutura de endpoints: Fastify routes → controllers → use cases → repositories → TypeORM/MySQL; validação de entrada com Zod nos controllers; rotas de cada recurso agrupadas em `routes.ts`.
- Estrutura de componentes: a definir — SPEC indica organização por features no frontend (`features/auth`, `features/posts`), já refletida no scaffold de pastas, mas sem convenção de componentes definida ainda.
- Tipagem: TypeScript no backend, com tipos de domínio em `entities/models/*.interface.ts`; tipagem do frontend a definir.

## TDD
- Framework backend: Jest
- Framework frontend: Vitest + Testing Library (`jsdom`)
- Onde ficam os testes: backend em `backend/tests/*.spec.js` (rodam sobre o build compilado em `backend/build/`); frontend em `frontend/src/test/` e colocados junto aos arquivos testados
- Regra: cobertura mínima de 20% em linhas, instruções, funções e branches (`backend/jest.config.js`)
- Testes críticos deste projeto:
  - [ ] Login retorna 401 para credenciais inválidas e um token JWT válido por 24 horas para credenciais corretas.
  - [ ] Rotas de criação, edição e administração redirecionam para login quando não há token válido, e o acesso respeita o campo `tipo` (Administrador/Professor/Aluno).
  - [ ] Professor consegue criar e editar apenas os próprios posts; Administrador consegue editar/excluir qualquer post e criar contas de usuário.
  - [ ] Qualquer usuário autenticado consegue comentar em um post; visitante não autenticado consegue listar/ler posts mas não comentar, criar, editar ou excluir.
  - [ ] A aplicação funciona corretamente com MySQL após a migração, sem dependência de PostgreSQL.

## Nunca fazer
- Nunca implementar editor de texto rico (WYSIWYG) para o conteúdo dos posts — o conteúdo usa textarea simples.
- Nunca permitir que usuários se cadastrem pela própria interface (self-signup) — apenas o Administrador cria contas.
- Nunca implementar fluxo de recuperação de senha esquecida.
- Nunca deixar uma rota de criação, edição ou área administrativa acessível sem um token JWT válido.
- Nunca commitar o arquivo `.env` ou credenciais do banco de dados no repositório.

## Decisões em aberto
- [ ] Upload de imagens em posts: implementar somente se a complexidade for baixa; caso contrário, fica fora do escopo deste trabalho.
- [ ] Preenchimento do campo "autor" na criação de post: o SPEC não define se o Administrador pode selecionar manualmente o autor/professor ou se o campo é sempre preenchido automaticamente com o usuário logado.
