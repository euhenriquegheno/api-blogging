---

# PLAN.md

## Sprint 1 — API completa (MySQL + autenticação JWT + comentários) passa em `cd backend && npm run test:coverage` e sobe conectada a um MySQL via `docker compose up -d`

### Fase 1 — Backend: Migração de banco (MySQL)
> Dependências: nenhuma
> Paralelismo: Task 1.1 e Task 1.2 rodam em paralelo (arquivos distintos)
> Critério: `docker compose config` valida os arquivos, `docker compose up -d db` sobe o MySQL saudável, e `cd backend && npm run build` conclui sem qualquer referência ao pacote `pg`

#### Task 1.1 — Trocar driver TypeORM de PostgreSQL para MySQL
- Agent: Backend Engineer (TypeORM/Fastify)
- Input: `backend/src/lib/typeorm/typeorm.ts` (atualmente `type: 'postgres'`), `backend/package.json` com `pg`/`@types/pg`, `backend/.env.example`
- Output:
  - `backend/src/lib/typeorm/typeorm.ts` com `type: 'mysql'`, mantendo `host`, `port`, `username`, `password`, `database`, `entities`, `synchronize`, `logging`
  - `backend/package.json` sem `pg` e `@types/pg`, com `mysql2` como dependency
  - `backend/.env.example` com `DATABASE_PORT=3306` como valor de exemplo
- Testes críticos:
  - [x] `appDataSource.options.type` é igual a `'mysql'` (teste unitário lendo a configuração exportada, sem exigir conexão real)
  - [x] `npm ls pg` falha com "not found" após `npm ci` (nenhuma dependência de `pg` restante)

#### Task 1.2 — Adicionar serviço MySQL ao Docker Compose
- Agent: DevOps
- Input: `docker-compose.yml` e `docker-compose.dev.yml` (somente serviço `api`), `backend/.env.example`
- Output:
  - `docker-compose.yml` e `docker-compose.dev.yml` com serviço `db` (imagem `mysql:8`), variáveis `MYSQL_DATABASE`/`MYSQL_USER`/`MYSQL_PASSWORD`/`MYSQL_ROOT_PASSWORD` lidas de `.env`, volume nomeado `mysql_data:/var/lib/mysql`, `healthcheck` via `mysqladmin ping`
  - serviço `api` com `depends_on: { db: { condition: service_healthy } }`
- Testes críticos:
  - [x] `docker compose config` valida os dois arquivos sem erro de sintaxe
  - [x] `docker compose up -d db` sobe o container e `docker compose exec db mysqladmin ping -h localhost` responde `mysqld is alive`

### Fase 2 — Backend: Fundamentos de autenticação
> Dependências: nenhuma
> Paralelismo: Task 2.1, Task 2.2 e Task 2.3 rodam em paralelo (arquivos distintos)
> Critério: `cd backend && npm run build && npm test` passa, incluindo os novos testes de `TipoUsuario`, `AuthenticateUseCase` e dos middlewares de JWT

#### Task 2.1 — Enum `TipoUsuario` e atualização da entidade `Usuario`
- Agent: Backend Engineer (domínio)
- Input: `backend/src/entities/usuario.entity.ts` e `backend/src/entities/models/usuario.interface.ts` (campo `tipo: number` sem semântica definida)
- Output:
  - `backend/src/entities/models/tipo-usuario.enum.ts`: `export enum TipoUsuario { ADMINISTRADOR = 1, PROFESSOR = 2, ALUNO = 3 }`
  - `backend/src/entities/models/usuario.interface.ts` com `tipo: TipoUsuario`
  - `backend/src/entities/usuario.entity.ts` com a coluna `tipo` tipada como `TipoUsuario`
  - `backend/src/http/swagger-schemas.ts`: `usuarioBodySchema.tipo` validado via Zod (`z.nativeEnum` equivalente) contra os valores do enum
- Testes críticos:
  - [x] `TipoUsuario.ADMINISTRADOR`, `TipoUsuario.PROFESSOR` e `TipoUsuario.ALUNO` existem com valores numéricos distintos entre 1 e 3
  - [x] `POST /user` com `tipo: 99` (fora do enum) retorna 400 de validação

#### Task 2.2 — Caso de uso de login (`AuthenticateUseCase`)
- Agent: Backend Engineer (regras de negócio)
- Input: `IUsuarioRepository` existente, `InvalidCredentialsError` existente, `bcrypt` já instalado
- Output:
  - `backend/src/repositories/usuario.repository.interface.ts` com `findByEmail(email: string): Promise<IUsuario | null>`
  - `backend/src/repositories/typeorm/usuario.repository.ts` implementando `findByEmail`
  - `backend/src/uses-cases/authenticate.ts`: `AuthenticateUseCase.handler(email: string, senha: string): Promise<IUsuario>`, busca por e-mail, compara com `bcrypt.compare` e lança `InvalidCredentialsError` em caso de falha
  - `backend/src/uses-cases/factory/make-authenticate-use-case.ts`
  - `backend/tests/usuario-use-cases.spec.js` com `InMemoryUsuarioRepository` (mesmo padrão de `backend/tests/publicacao-use-cases.spec.js`)
- Testes críticos:
  - [x] `AuthenticateUseCase.handler` retorna o usuário quando o e-mail existe e a senha em texto puro confere com o hash bcrypt armazenado
  - [x] `AuthenticateUseCase.handler` rejeita com `InvalidCredentialsError` quando o e-mail não existe ou a senha não confere

#### Task 2.3 — Plugin JWT e middlewares de autenticação/autorização
- Agent: Backend Engineer (infraestrutura HTTP)
- Input: `backend/src/app.ts` (sem plugin de auth), `backend/src/env/index.ts` atual
- Output:
  - `@fastify/jwt` adicionado ao `backend/package.json`
  - `backend/src/env/index.ts` com `JWT_SECRET: z.string()`; `backend/.env.example` com `JWT_SECRET=`
  - `backend/src/app.ts` registrando `@fastify/jwt` com `secret: env.JWT_SECRET`
  - `backend/src/http/middlewares/verify-jwt.ts`: preHandler que chama `request.jwtVerify()` e retorna 401 se ausente/inválido
  - `backend/src/http/middlewares/verify-user-type.ts`: `verifyUserType(tiposPermitidos: TipoUsuario[])` retornando preHandler que responde 403 se `request.user.tipo` não estiver em `tiposPermitidos`
- Testes críticos:
  - [x] `app.inject` numa rota protegida por `verifyJwt` sem header `Authorization` retorna 401
  - [x] `app.inject` com token válido de um usuário `ALUNO` numa rota com `verifyUserType([TipoUsuario.ADMINISTRADOR])` retorna 403

### Fase 3 — Backend: Integração de autenticação nas rotas
> Dependências: Fase 2
> Paralelismo: Task 3.1 e Task 3.2 rodam em paralelo (arquivos distintos)
> Critério: `cd backend && npm run build && npm test` passa e `app.inject` em `POST /login` retorna 401 para credenciais inválidas e 200 com token para credenciais válidas

#### Task 3.1 — Rota de login
- Agent: Backend Engineer (HTTP)
- Input: `AuthenticateUseCase` e `make-authenticate-use-case` (Fase 2), plugin JWT registrado (Fase 2)
- Output:
  - `backend/src/http/controllers/auth/login.ts`: valida body com Zod (`{ email: string; senha: string }`), chama `AuthenticateUseCase`, assina JWT com payload `{ sub: usuario.id, tipo: usuario.tipo }` e `expiresIn: '24h'`, retorna `{ token }`
  - `backend/src/http/controllers/auth/routes.ts` registrando `POST /login`
  - `backend/src/http/swagger-schemas.ts` com `loginBodySchema` e `loginResponseSchema`
  - `backend/src/app.ts` registrando `authRoutes`
- Testes críticos:
  - [x] `POST /login` com credenciais corretas retorna 200 e um `token` cujo payload decodificado expira 24 horas após a emissão
  - [x] `POST /login` com credenciais inválidas retorna 401 com `{ message: 'Username or password is incorrect' }`

#### Task 3.2 — Guardas de autorização nas rotas existentes
- Agent: Backend Engineer (HTTP/regras de negócio)
- Input: `verifyJwt`/`verifyUserType` (Fase 2), rotas atuais de `publicacao` e `usuario` (sem proteção)
- Output:
  - `backend/src/http/controllers/publicacao/routes.ts`: `POST/PUT/DELETE /posts` com `preHandler: [verifyJwt, verifyUserType([PROFESSOR, ADMINISTRADOR])]`; `GET /posts` e `GET /posts/:id` continuam públicas
  - `backend/src/http/controllers/usuario/routes.ts`: todas as rotas com `preHandler: [verifyJwt, verifyUserType([ADMINISTRADOR])]`
  - `backend/src/uses-cases/errors/forbidden-error.ts`: `ForbiddenError`
  - `backend/src/uses-cases/update-publicacao.ts` e `backend/src/uses-cases/delete-publicacao.ts` recebendo `usuarioLogado: { id: number; tipo: TipoUsuario }` e lançando `ForbiddenError` quando `tipo === PROFESSOR` e `usuario.id !== publicacao.usuario.id`
  - `backend/src/utils/global-error-handler.ts` com `ForbiddenError -> 403`
- Testes críticos:
  - [x] Um Professor autenticado consegue editar/excluir um post cujo `usuario.id` é o seu próprio ID
  - [x] Um Professor autenticado recebe 403 ao tentar editar/excluir um post de outro professor, enquanto um Administrador consegue

### Fase 4 — Backend: Modelo de dados de Comentários
> Dependências: nenhuma
> Paralelismo: única task nesta fase
> Critério: `cd backend && npm run build` conclui sem erros e `appDataSource.options.entities` inclui `Comentario`

#### Task 4.1 — Entidade, interface e repositório de `Comentario`
- Agent: Backend Engineer (TypeORM)
- Input: `backend/src/entities/publicacao.entity.ts` e `backend/src/entities/usuario.entity.ts` (para relações `ManyToOne`)
- Output:
  - `backend/src/entities/models/comentario.interface.ts`: `IComentario { id?: string; conteudo: string; criadoEm?: Date; usuario: IUsuario; publicacao: IPublicacao }`
  - `backend/src/entities/comentario.entity.ts`: `@PrimaryGeneratedColumn('uuid')`, `conteudo` (`text`), `criadoEm` (`@CreateDateColumn`), `@ManyToOne(() => Usuario)`, `@ManyToOne(() => Publicacao)`
  - `backend/src/repositories/comentario.repository.interface.ts`: `IComentarioRepository { create, findAllByPublicacaoId(publicacaoId, page, limit), delete(id) }`
  - `backend/src/repositories/typeorm/comentario.repository.ts` implementando a interface
  - `backend/src/lib/typeorm/typeorm.ts` com `Comentario` adicionado ao array `entities`
- Testes críticos:
  - [x] Instanciar um `Comentario` com `conteudo`, `usuario` e `publicacao` válidos preserva os três campos (teste unitário de construção, sem banco)
  - [x] `appDataSource.options.entities` contém a classe `Comentario` após a alteração

### Fase 5 — Backend: Casos de uso de Comentários
> Dependências: Fase 3 (guardas de autorização) e Fase 4 (repositório de `Comentario`)
> Paralelismo: Task 5.1 e Task 5.2 rodam em paralelo (arquivos distintos)
> Critério: `cd backend && npm run build && npm test` passa, incluindo `backend/tests/comentario-use-cases.spec.js`

#### Task 5.1 — Caso de uso e controller de criação de comentário
- Agent: Backend Engineer
- Input: `IComentarioRepository` (Fase 4), `verifyJwt` (Fase 2)
- Output:
  - `backend/src/uses-cases/create-comentario.ts`: `CreateComentarioUseCase.handler(comentario: IComentario): Promise<IComentario>`
  - `backend/src/uses-cases/factory/make-create-comentario-use-case.ts`
  - `backend/src/http/controllers/comentario/create.ts`: valida body com Zod (`{ conteudo: string }`), usa `request.user.sub` como autor e `:id` da rota como `publicacaoId`, retorna 201
  - `backend/tests/comentario-use-cases.spec.js` (parte de criação) com `InMemoryComentarioRepository`
- Testes críticos:
  - [x] `CreateComentarioUseCase.handler` retorna o comentário criado associado ao `usuario` e à `publicacao` informados
  - [x] O controller retorna 400 quando `conteudo` é uma string vazia

#### Task 5.2 — Caso de uso e controller de listagem de comentários
- Agent: Backend Engineer
- Input: `IComentarioRepository` (Fase 4)
- Output:
  - `backend/src/uses-cases/find-all-comentario.ts`: `FindAllComentarioUseCase.handler(publicacaoId: string, page: number, limit: number): Promise<IComentario[]>`
  - `backend/src/uses-cases/factory/make-find-all-comentario-use-case.ts`
  - `backend/src/http/controllers/comentario/find-all.ts`: rota pública, aceita `page`/`limit` via querystring
  - `backend/tests/comentario-use-cases.spec.js` (parte de listagem)
- Testes críticos:
  - [x] `FindAllComentarioUseCase.handler` retorna apenas os comentários da `publicacaoId` informada, ordenados por `criadoEm`
  - [x] `FindAllComentarioUseCase.handler` retorna array vazio para uma publicação sem comentários (não lança erro)

### Fase 6 — Backend: Integração final de Comentários
> Dependências: Fase 5
> Paralelismo: única task nesta fase
> Critério: `cd backend && npm run build && npm test` passa e `GET /docs` lista `POST /posts/:id/comments` e `GET /posts/:id/comments`

#### Task 6.1 — Registro das rotas de comentários
- Agent: Backend Engineer (HTTP)
- Input: controllers `create.ts` e `find-all.ts` de `comentario` (Fase 5)
- Output:
  - `backend/src/http/controllers/comentario/routes.ts`: `POST /posts/:id/comments` (`preHandler: [verifyJwt]`) e `GET /posts/:id/comments` (pública)
  - `backend/src/http/swagger-schemas.ts` com `comentarioBodySchema` e `comentarioSchema`
  - `backend/src/app.ts` registrando `comentarioRoutes`
- Testes críticos:
  - [x] `app.inject` em `POST /posts/:id/comments` sem token retorna 401
  - [x] `app.inject` em `GET /posts/:id/comments` sem token retorna 200 com a lista de comentários

---

## Sprint 2 — Frontend React consome toda a API e aplica guarda de rotas por tipo de usuário, validado por `npm run build` e `npm run test` dentro de `frontend/`

### Fase 7 — Frontend: Bootstrap do projeto
> Dependências: nenhuma
> Paralelismo: única task nesta fase
> Critério: `cd frontend && npm run build && npm run test` conclui sem erros

#### Task 7.1 — Inicializar React + Vite + Tailwind + Vitest
- Agent: Frontend Engineer (setup)
- Input: pasta `frontend/` com apenas o scaffold de diretórios (`src/app/config`, `src/components`, `src/features/auth`, `src/features/posts`, `src/layouts`, `src/pages`, `src/services`, `src/styles`, `src/test`, `src/types`)
- Output:
  - `frontend/package.json` com scripts `dev`, `build`, `preview`, `test` (Vite + React + TypeScript + Vitest + `@testing-library/react` + `jsdom`)
  - `frontend/vite.config.ts`, `frontend/tsconfig.json`, `frontend/tailwind.config.js`, `frontend/postcss.config.js`
  - `frontend/src/main.tsx`, `frontend/src/app/config/app.tsx` (componente raiz), `frontend/src/styles/globals.css` (diretivas Tailwind)
  - `frontend/src/types/usuario.ts`: `interface Usuario { id: number; nome: string; email: string; tipo: 'ADMINISTRADOR' | 'PROFESSOR' | 'ALUNO' }`
  - `frontend/src/types/publicacao.ts`: `interface Publicacao { id: string; titulo: string; conteudo: string; usuario: Usuario }`
  - `frontend/src/types/comentario.ts`: `interface Comentario { id: string; conteudo: string; criadoEm: string; usuario: Usuario }`
- Testes críticos:
  - [x] `npm run build` gera `frontend/dist` sem erros de TypeScript
  - [x] `npm run test` executa `src/test/app.test.tsx` (renderiza `<App />`) e passa

### Fase 8 — Frontend: Autenticação — serviços e contexto
> Dependências: Fase 7
> Paralelismo: Task 8.1 e Task 8.2 rodam em paralelo (arquivos distintos)
> Critério: `cd frontend && npm run test` passa, incluindo os testes de `auth-api` e `auth-context`

#### Task 8.1 — Cliente HTTP e serviço de autenticação ✅
- Agent: Frontend Engineer
- Input: `frontend/src/types/usuario.ts` (Fase 7)
- Output:
  - `frontend/src/services/api-client.ts`: `apiClient(path: string, options?: RequestInit)` usando `fetch`, `baseURL` de `VITE_API_URL`, injeta `Authorization: Bearer <token>` quando houver token salvo, lança erro tipado em respostas não-2xx
  - `frontend/src/features/auth/api/auth-api.ts`: `login(email: string, senha: string): Promise<{ token: string }>`
- Testes críticos:
  - [x] `login` faz `POST /login` com `{ email, senha }` e retorna `{ token }` quando a API responde 200 (mock de `fetch`)
  - [x] `login` rejeita com um erro contendo a mensagem da API quando a resposta é 401

#### Task 8.2 — Contexto de sessão e guarda de rotas ✅
- Agent: Frontend Engineer
- Input: `frontend/src/types/usuario.ts` (Fase 7)
- Output:
  - `frontend/src/features/auth/context/auth-context.tsx`: `AuthProvider` e hook `useAuth()` expondo `{ usuario, token, signIn(token), signOut() }`, decodifica o JWT (`sub`/`tipo`) e persiste em `localStorage`
  - `frontend/src/features/auth/components/protected-route.tsx`: `<ProtectedRoute tiposPermitidos?={Usuario['tipo'][]}>` redireciona para `/login` se não autenticado, ou para `/` se o `tipo` não estiver em `tiposPermitidos`
- Testes críticos:
  - [x] `ProtectedRoute` redireciona para `/login` quando `useAuth().usuario` é `null`
  - [x] `ProtectedRoute` renderiza o conteúdo filho quando o usuário está autenticado e seu `tipo` está em `tiposPermitidos`

### Fase 9 — Frontend: Tela de login e roteamento
> Dependências: Fase 8
> Paralelismo: Task 9.1 e Task 9.2 rodam em paralelo (arquivos distintos)
> Critério: `cd frontend && npm run test` passa, incluindo os testes de `login-page` e do roteador

#### Task 9.1 — Página de login
- Agent: Frontend Engineer
- Input: `auth-api.ts` e `auth-context.tsx` (Fase 8)
- Output:
  - `frontend/src/pages/login-page.tsx`: formulário controlado (`email`, `senha`), chama `login()`, em sucesso chama `signIn(token)` e navega para `/`; em erro exibe "E-mail ou senha inválidos"
- Testes críticos:
  - [x] Submeter o formulário com credenciais válidas chama `signIn` e navega para `/`
  - [x] Submeter o formulário com credenciais inválidas exibe a mensagem de erro e não chama `signIn`

#### Task 9.2 — Configuração do React Router
- Agent: Frontend Engineer
- Input: `protected-route.tsx` (Fase 8)
- Output:
  - `frontend/src/app/config/router.tsx`: `createBrowserRouter` com `/login` (pública, componente `LoginPage`, contrato: default export de `frontend/src/pages/login-page.tsx`), `/` (pública), `/posts/:id` (pública), `/posts/novo` e `/posts/:id/editar` (`ProtectedRoute` tipos `PROFESSOR`/`ADMINISTRADOR`), `/admin/*` (`ProtectedRoute` tipo `ADMINISTRADOR`)
- Testes críticos:
  - [x] Navegar para `/admin` sem autenticação redireciona para `/login`
  - [x] Navegar para `/posts/novo` autenticado como `ALUNO` redireciona para `/`

### Fase 10 — Frontend: Camada de dados de posts e comentários
> Dependências: Fase 7
> Paralelismo: Task 10.1 e Task 10.2 rodam em paralelo (arquivos distintos)
> Critério: `cd frontend && npm run test` passa, incluindo `posts-api.test.ts` e `comentarios-api.test.ts`

#### Task 10.1 — API de posts
- Agent: Frontend Engineer
- Input: `api-client.ts` (Fase 8), `types/publicacao.ts` (Fase 7)
- Output:
  - `frontend/src/features/posts/api/posts-api.ts`: `listPosts(page, limit)`, `searchPosts(q)`, `getPost(id)`, `createPost({ titulo, conteudo })`, `updatePost(id, { titulo, conteudo })`, `deletePost(id)`
- Testes críticos:
  - [x] `listPosts(1, 10)` chama `GET /posts?page=1&limit=10` e retorna `Publicacao[]` tipado
  - [x] `searchPosts('mysql')` chama `GET /posts/search?q=mysql`

#### Task 10.2 — API de comentários
- Agent: Frontend Engineer
- Input: `api-client.ts` (Fase 8), `types/comentario.ts` (Fase 7)
- Output:
  - `frontend/src/features/posts/api/comentarios-api.ts`: `listComentarios(publicacaoId, page, limit)`, `createComentario(publicacaoId, conteudo)`
- Testes críticos:
  - [x] `createComentario` envia `POST /posts/:id/comments` com o header `Authorization` presente
  - [x] `listComentarios` retorna `[]` quando a API responde 200 com corpo vazio

### Fase 11 — Frontend: Área pública
> Dependências: Fase 9, Fase 10
> Paralelismo: Task 11.1 e Task 11.2 rodam em paralelo (arquivos distintos)
> Critério: `cd frontend && npm run test` passa, incluindo `posts-list-page.test.tsx` e `post-detail-page.test.tsx`

#### Task 11.1 — Listagem de posts com paginação e busca ✅
- Agent: Frontend Engineer
- Input: `posts-api.ts` (Fase 10), `router.tsx` (Fase 9)
- Output:
  - `frontend/src/pages/posts-list-page.tsx`, `frontend/src/features/posts/components/post-card.tsx`, `frontend/src/features/posts/components/search-bar.tsx`, `frontend/src/components/pagination.tsx`
- Testes críticos:
  - [x] Digitar um termo na `search-bar` e submeter chama `searchPosts` e renderiza os resultados retornados
  - [x] Clicar em "Próxima página" chama `listPosts` com `page + 1`

#### Task 11.2 — Leitura de post e comentários
- Agent: Frontend Engineer
- Input: `posts-api.ts` e `comentarios-api.ts` (Fase 10), `auth-context.tsx` (Fase 8)
- Output:
  - `frontend/src/pages/post-detail-page.tsx`, `frontend/src/features/posts/components/comment-list.tsx`, `frontend/src/features/posts/components/comment-form.tsx` (visível apenas se `useAuth().usuario` existir)
- Testes críticos:
  - [x] Um visitante não autenticado vê a `comment-list` mas não vê o `comment-form`
  - [x] Um usuário autenticado submete um comentário e ele aparece na `comment-list` após a chamada a `createComentario`

### Fase 12 — Frontend: Área do Professor
> Dependências: Fase 9, Fase 10
> Paralelismo: Task 12.1 e Task 12.2 rodam em paralelo (arquivos distintos)
> Critério: `cd frontend && npm run test` passa, incluindo `create-post-page.test.tsx` e `edit-post-page.test.tsx`

#### Task 12.1 — Criação de post
- Agent: Frontend Engineer
- Input: `posts-api.ts` (Fase 10), `auth-context.tsx` (Fase 8) — decisão adotada para a lacuna do SPEC sobre o campo autor: o autor do post é sempre o usuário logado
- Output:
  - `frontend/src/pages/create-post-page.tsx`: formulário com `titulo` e `conteudo` (textarea simples), chama `createPost` e navega para `/posts/:id` do post criado
- Testes críticos:
  - [x] Submeter o formulário com `titulo` e `conteudo` preenchidos chama `createPost` e navega para o post criado
  - [x] Submeter o formulário com `titulo` vazio exibe erro de validação e não chama `createPost`

#### Task 12.2 — Edição de post
- Agent: Frontend Engineer
- Input: `posts-api.ts` (Fase 10)
- Output:
  - `frontend/src/pages/edit-post-page.tsx`: carrega o post via `getPost(id)`, pré-preenche o formulário, chama `updatePost` ao submeter
- Testes críticos:
  - [x] A página carrega e exibe `titulo`/`conteudo` existentes do post ao montar
  - [x] Submeter o formulário editado chama `updatePost(id, { titulo, conteudo })` com os novos valores

### Fase 13 — Frontend: Área Administrativa
> Dependências: Fase 9, Fase 10
> Paralelismo: Task 13.1 e Task 13.2 rodam em paralelo (arquivos distintos)
> Critério: `cd frontend && npm run test` passa, incluindo `admin-posts-page.test.tsx` e `admin-create-usuario-page.test.tsx`

#### Task 13.1 — Gestão administrativa de posts ✅
- Agent: Frontend Engineer
- Input: `posts-api.ts` (Fase 10)
- Output:
  - `frontend/src/pages/admin-posts-page.tsx`: lista todos os posts (`listPosts`) com "Editar" (navega para `/posts/:id/editar`) e "Excluir" (chama `deletePost` com confirmação)
- Testes críticos:
  - [x] Clicar em "Excluir" e confirmar chama `deletePost(id)` e remove o post da lista exibida
  - [x] Clicar em "Excluir" e cancelar a confirmação não chama `deletePost`

#### Task 13.2 — Criação de contas de usuário ✅
- Agent: Frontend Engineer
- Input: `api-client.ts` (Fase 8), `types/usuario.ts` (Fase 7)
- Output:
  - `frontend/src/features/auth/api/usuario-api.ts`: `createUsuario({ nome, email, senha, cpf, tipo })`
  - `frontend/src/pages/admin-create-usuario-page.tsx`: formulário com seletor de `tipo` (Administrador/Professor/Aluno), chama `createUsuario` e exibe confirmação
- Testes críticos:
  - [x] Submeter o formulário preenchido chama `createUsuario` com o `tipo` selecionado e exibe mensagem de sucesso
  - [x] Submeter o formulário com `email` em formato inválido exibe erro de validação e não chama `createUsuario`

### Fase 14 — Frontend: Layout responsivo e finalização
> Dependências: Fase 11, Fase 12, Fase 13
> Paralelismo: Task 14.1 e Task 14.2 rodam em paralelo (arquivos distintos)
> Critério: `cd frontend && npm run build && npm run test` passa, incluindo o teste de `main-layout` que verifica a navegação condicional por tipo de usuário

#### Task 14.1 — Layout responsivo compartilhado ✅
- Agent: Frontend Engineer (UI)
- Input: `auth-context.tsx` (Fase 8)
- Output:
  - `frontend/src/layouts/main-layout.tsx`: cabeçalho com navegação condicional por `tipo` ("Novo post" para Professor/Administrador, "Administração" para Administrador, "Entrar"/"Sair" conforme sessão), menu mobile com toggle (breakpoints Tailwind `sm:`/`md:`)
- Testes críticos:
  - [x] Com um usuário `ALUNO` autenticado, os links "Novo post" e "Administração" não são renderizados
  - [x] Com um usuário `ADMINISTRADOR` autenticado, os links "Novo post" e "Administração" são renderizados

#### Task 14.2 — Página 404 e revisão final do roteador
- Agent: Frontend Engineer
- Input: `router.tsx` (Fase 9), `main-layout.tsx` (Task 14.1)
- Output:
  - `frontend/src/pages/not-found-page.tsx`
  - `frontend/src/app/config/router.tsx` atualizado: envolve as rotas com `main-layout.tsx`, adiciona rota coringa (`path: '*'`) para `not-found-page.tsx`, e confirma o registro de todas as páginas das Fases 11-13
- Testes críticos:
  - [x] Acessar uma rota inexistente renderiza `not-found-page.tsx`
  - [x] Todas as rotas protegidas (`/posts/novo`, `/posts/:id/editar`, `/admin/*`) estão envolvidas por `ProtectedRoute` no router final

---
