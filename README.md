# api-blogging

## Testes

Os testes unitários usam Jest e cobrem os casos de uso de criação, edição e
exclusão de postagens. Para executar os testes com relatório de cobertura:

```bash
npm run test:coverage
```

O projeto exige pelo menos 20% de cobertura em linhas, instruções, funções e
branches; o comando falha se esse limite não for atingido.

## CI/CD com GitHub Actions

O workflow em `.github/workflows/ci-cd.yml` valida o projeto em pull requests
e pushes para a branch `main`. Em pushes para `main`, ele também publica a
imagem no Docker Hub.

Antes do primeiro deploy, configure estes *Actions secrets* no repositório do
GitHub:

- `DOCKERHUB_USERNAME`: usuário do Docker Hub.
- `DOCKERHUB_TOKEN`: token de acesso do Docker Hub com permissão de escrita.

## Executando com Docker

Com o Docker em execução, inicie a API e o banco de dados com:

```bash
docker compose up --build
```

A API ficará disponível em `http://localhost:3000`. No Compose, o banco é
acessado pela API usando o hostname `postgres`, que é o nome do serviço Docker.
Ele não é exposto ao computador host, evitando conflito com um PostgreSQL já
em execução na porta `5432`.

Para encerrar os contêineres, use `docker compose down`. Os dados do banco
permanecem no volume `postgres_data`; para removê-los também, execute
`docker compose down -v`.

Em desenvolvimento, o TypeORM cria e atualiza as tabelas a partir das
entidades. Em produção, o ideal é substituir essa sincronização por migrations
versionadas antes de executar a aplicação.
