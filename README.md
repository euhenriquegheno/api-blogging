# API Blogging

API REST para uma plataforma educacional de publicações. Ela permite cadastrar
docentes (usuários), criar postagens e consultar conteúdo por listagem, ID ou
busca textual.

## Tecnologias

- Node.js e TypeScript
- Fastify para HTTP e roteamento
- PostgreSQL hospedado no Supabase
- TypeORM para persistência e mapeamento das entidades
- Docker para desenvolvimento e produção
- Jest para testes unitários e cobertura
- GitHub Actions para validação contínua e publicação da imagem no Docker Hub

## Arquitetura

```text
HTTP routes/controllers -> use cases -> repositories -> TypeORM/PostgreSQL
```

- **Controllers** validam requisições com Zod e formam respostas HTTP.
- **Use cases** concentram as regras de negócio.
- **Repositories** isolam consultas e gravações no banco.
- **Entities** definem as tabelas `usuario` e `publicacao` e a relação entre
  elas.

## Configuração local

Instale as dependências:

```bash
npm ci
```

Copie `.env.example` para `.env` e preencha as variáveis de conexão do banco:

```env
NODE_ENV=development
PORT=3000
DATABASE_USER=
DATABASE_HOST=
DATABASE_NAME=
DATABASE_PASSWORD=
DATABASE_PORT=
```

Para Supabase, use a conexão **Session pooler**. Ela funciona em redes IPv4 e
usa um host semelhante a `aws-<regiao>.pooler.supabase.com`. O arquivo `.env`
é ignorado pelo Git e nunca deve ser enviado ao repositório.

Inicie o servidor:

```bash
npm run start:dev
```

A API ficará disponível em `http://localhost:3000`.

## Swagger

Com a API em execução, abra `http://localhost:3000/docs` para consultar e
testar interativamente os endpoints documentados.

## API de postagens

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/posts?page=1&limit=10` | Lista postagens paginadas. |
| GET | `/posts/search?q=termo` | Busca no título ou conteúdo. |
| GET | `/posts/:id` | Obtém uma postagem pelo UUID. |
| POST | `/posts` | Cria uma postagem. |
| PUT | `/posts/:id` | Atualiza uma postagem. |
| DELETE | `/posts/:id` | Exclui uma postagem. |

Exemplo de criação/edição:

```json
{
  "titulo": "Aula de matemática",
  "conteudo": "Conteúdo da aula.",
  "usuario_id": 1
}
```

`usuario_id` representa o autor/docente da postagem e deve apontar para um
usuário existente.

## API de usuários

| Método | Rota | Descrição |
| --- | --- | --- |
| POST | `/user` | Cria um usuário. |
| GET | `/user?page=1&limit=10` | Lista usuários. |
| GET | `/user/:id` | Obtém um usuário. |
| PUT | `/user/:id` | Atualiza um usuário. |
| DELETE | `/user/:id` | Exclui um usuário. |

## Testes

Os testes unitários cobrem os casos críticos de criação, edição e exclusão de
postagens. Execute:

```bash
npm test
npm run test:coverage
```

O Jest exige ao menos 20% de cobertura em linhas, instruções, funções e
branches. A cobertura atual dos casos de uso de postagens testados é 100%.

## Docker

### Desenvolvimento

```bash
docker compose -f docker-compose.dev.yml up --build
```

O código local é montado no contêiner e o `tsx watch` reinicia a API ao salvar
arquivos.

### Produção

```bash
docker compose up --build
```

Os dois Compose carregam as variáveis do `.env` e usam o PostgreSQL hospedado.

## Integração contínua e imagem Docker

O workflow em `.github/workflows/main.yml` executa em pull requests e pushes
para `main`. Ele instala dependências, executa testes com cobertura e faz o
build TypeScript. Em pushes para `main`, publica a imagem no Docker Hub com as
tags `latest` e o hash do commit.

Configure estes secrets no GitHub:

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`

O deploy no Render usa a imagem publicada e as variáveis do banco cadastradas
no painel da plataforma.

## Experiências e desafios

O projeto foi desenvolvido individualmente. Os principais desafios encontrados
durante o desenvolvimento foram a conexão com o PostgreSQL hospedado no
Supabase e a configuração do Docker.

No Supabase, foi necessário identificar a URL e as credenciais de conexão
adequadas para a aplicação e utilizar o **Session pooler**, que permite a
conexão por redes IPv4. A configuração dessas informações por variáveis de
ambiente também foi importante para não expor dados sensíveis no repositório.

Na containerização, o desafio foi manter configurações apropriadas tanto para
o desenvolvimento quanto para a produção. Por isso, foram definidos serviços
Docker Compose separados: no desenvolvimento, o código é montado como volume e
a API é reiniciada automaticamente; em produção, a imagem é gerada em etapas
e executa apenas os arquivos compilados.

## Vídeo
https://youtu.be/fM_zS2ILz18
