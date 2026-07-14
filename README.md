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

Com o Docker em execução, inicie a API com:

```bash
docker compose up --build
```

A API ficará disponível em `http://localhost:3000`. As credenciais do banco
são carregadas do arquivo `.env`; ele deve apontar para o PostgreSQL hospedado
no Supabase e não é incluído na imagem Docker.

Para encerrar o contêiner, use:

```bash
docker compose down
```

Em desenvolvimento, o TypeORM cria e atualiza as tabelas a partir das
entidades. Em produção, o ideal é substituir essa sincronização por migrations
versionadas antes de executar a aplicação.
