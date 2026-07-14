# Roteiro de apresentação

Tempo sugerido: 5 a 7 minutos.

## 1. Contexto e objetivo (30 segundos)

Explique que a API foi criada para centralizar postagens educacionais de
docentes e disponibilizá-las para estudantes. Mostre rapidamente a estrutura
do projeto no editor.

## 2. Arquitetura e banco de dados (1 minuto)

Mostre as pastas `controllers`, `uses-cases`, `repositories` e `entities`.
Explique o fluxo `rota -> controller -> caso de uso -> repositório ->
PostgreSQL`. Em seguida, abra o Supabase e mostre as tabelas `usuario` e
`publicacao`, destacando que cada postagem possui um autor.

## 3. Demonstração dos endpoints (2 minutos)

No Bruno, execute nesta ordem:

1. `POST /user` para criar um docente.
2. `POST /posts` usando o `usuario_id` retornado.
3. `GET /posts` para listar.
4. `GET /posts/:id` para consultar uma postagem.
5. `GET /posts/search?q=aula` para demonstrar busca.
6. `PUT /posts/:id` e, se houver tempo, `DELETE /posts/:id`.

Comente que as entradas são validadas com Zod e que UUIDs inválidos retornam
erro de validação.

## 4. Testes (1 minuto)

No terminal, execute:

```bash
npm run test:coverage
```

Mostre o resultado `PASS`, os cinco testes e o relatório de cobertura. Explique
que os testes unitários usam um repositório em memória, sem depender do banco,
e exercitam criação, edição, exclusão e cenários de recurso inexistente.

## 5. Docker e CI (1 a 2 minutos)

Mostre o `Dockerfile`, citando as etapas de desenvolvimento e produção. Mostre
os dois comandos:

```bash
docker compose -f docker-compose.dev.yml up --build
docker compose up --build
```

Depois, abra a aba Actions no GitHub e mostre um workflow verde. Explique que
ele executa testes, build e publica a imagem no Docker Hub em pushes para
`main`. Por fim, mostre a imagem no Docker Hub e a API publicada no Render.

## Encerramento (20 segundos)

Retome que a aplicação entrega endpoints REST, persistência PostgreSQL,
containerização, testes unitários e automação no GitHub Actions.
