# API Blogging Educacional

API REST para gerenciamento de usuários e postagens educacionais. O servidor é desenvolvido em Node.js com TypeScript e Fastify, utiliza PostgreSQL com TypeORM e pode ser distribuído como uma imagem Docker.

## Tecnologias

- Node.js 22 e TypeScript
- Fastify para servidor, rotas e tratamento de erros
- PostgreSQL e TypeORM para persistência
- Zod para validação das requisições
- Jest e ts-jest para testes unitários e cobertura
- Docker e GitHub Actions

## Configuração inicial

Requisitos: Node.js 22 ou superior, npm e uma instância PostgreSQL acessível.

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Copie `.env.example` para `.env` e preencha:

   ```env
   NODE_ENV=development
   PORT=3000
   DATABASE_USER=postgres
   DATABASE_HOST=localhost
   DATABASE_NAME=api_blogging
   DATABASE_PASSWORD=sua_senha
   DATABASE_PORT=5432
   ```

3. Inicie a API em desenvolvimento:

   ```bash
   npm run start:dev
   ```

## Arquitetura

O projeto separa as responsabilidades em camadas:

- `src/http/controllers`: validação HTTP, rotas, requisições e respostas.
- `src/uses-cases`: regras de negócio independentes do framework HTTP.
- `src/repositories`: contratos e implementação da persistência com TypeORM.
- `src/entities`: entidades e modelos de domínio.
- `src/lib`: configuração da infraestrutura, incluindo o banco de dados.
- `src/utils`: tratamento global de erros.

O fluxo de uma requisição é: rota → controller → caso de uso → repositório → PostgreSQL.

## API de postagens

| Método | Endpoint | Descrição |
| --- | --- | --- |
| GET | `/posts?page=1&limit=10` | Lista postagens com paginação |
| GET | `/posts/:id` | Retorna uma postagem pelo UUID |
| GET | `/posts/search?q=node` | Busca no título ou conteúdo |
| POST | `/posts` | Cria uma postagem |
| PUT | `/posts/:id` | Atualiza uma postagem |
| DELETE | `/posts/:id` | Exclui uma postagem |

Corpo para criação e atualização:

```json
{
  "titulo": "Introdução ao Node.js",
  "conteudo": "Conteúdo completo da postagem",
  "usuario_id": 1
}
```

Uma criação bem-sucedida retorna `201`; consultas e atualizações retornam `200`; exclusões retornam `204`. Dados inválidos retornam `400` e recursos inexistentes retornam `404`.

## API de usuários

| Método | Endpoint | Descrição |
| --- | --- | --- |
| GET | `/usuario?page=1&limit=10` | Lista usuários |
| GET | `/usuario/:id` | Retorna um usuário |
| POST | `/usuario` | Cria um usuário |
| PUT | `/usuario/:id` | Atualiza um usuário |
| DELETE | `/usuario/:id` | Exclui um usuário |

## Testes e cobertura

```bash
npm test
npm run test:coverage
```

Os testes unitários usam Jest e um repositório em memória. Eles cobrem os casos críticos de criação, edição e exclusão, além de consulta, listagem e busca. O comando de cobertura falha se qualquer métrica global configurada ficar abaixo de 20%.

## Docker

Para criar a imagem da API:

```bash
docker build -t api-blogging .
docker run --env-file .env -p 3000:3000 api-blogging
```

Quando a API e o PostgreSQL estiverem na mesma rede Docker, use o nome do contêiner ou serviço do PostgreSQL em `DATABASE_HOST`, e não `localhost`.

## CI/CD

O workflow `.github/workflows/ci-cd.yml` executa compilação, testes e validação da cobertura em pushes e pull requests para `main`. Após um push aprovado em `main`, ele constrói e publica a imagem em `ghcr.io/<proprietário>/<repositório>`, cumprindo a etapa de entrega automatizada. A implantação em um servidor específico pode consumir essa imagem e exige as credenciais da plataforma escolhida.
