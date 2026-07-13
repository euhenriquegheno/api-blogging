# api-blogging

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
