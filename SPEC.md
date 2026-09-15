# SPEC.md

## Problema
Trabalho de aula que consiste em desenvolver uma interface gráfica em React para um blog institucional, consumindo uma API REST já existente (Fastify + TypeORM), onde professores publicam materiais para a comunidade acadêmica.

## Usuários
- **Administrador**: gerencia todos os posts do sistema (edita/exclui de qualquer professor) e cria contas de usuário.
- **Professor**: cria, edita e exclui os próprios posts.
- **Aluno**: lê posts e comenta.
- Qualquer usuário autenticado (Administrador, Professor ou Aluno) pode comentar em posts.

## Funcionalidades

### Essenciais
- Lista de posts com paginação e campo de busca por palavra-chave.
- Página de leitura do conteúdo completo de um post.
- Comentários em posts, disponíveis para qualquer usuário autenticado.
- Criação de post (Professor/Administrador): campos de título, conteúdo (textarea simples) e autor.
- Edição de post (Professor/Administrador), carregando os dados existentes no formulário.
- Página administrativa (Administrador): lista todos os posts com opções de editar/excluir, e permite criar novas contas de usuário.
- Autenticação via login com JWT, sessão com validade de 24 horas (senha já armazenada com hash bcrypt no backend).
- Autorização por tipo de usuário: novo campo `tipo` (Administrador, Professor, Aluno) a ser criado na entidade `Usuario`, com guarda de rotas no front-end conforme o tipo.
- Migração do banco de dados de PostgreSQL para MySQL (TypeORM).
- Interface responsiva (mobile e desktop).

### Fora do escopo
- Editor de texto rico (WYSIWYG) para o conteúdo dos posts — usa-se textarea simples.
- Cadastro de usuários pela própria interface (self-signup) — apenas o Administrador cria contas.
- Recuperação de senha esquecida.
- Upload de imagens nos posts (ver Decisões em aberto).

## Módulos
1. **Backend — Migração de banco**: alterar configuração do TypeORM de PostgreSQL para MySQL.
2. **Backend — Autenticação**: endpoint de login, emissão de JWT (validade 24h); adicionar campo `tipo` (Administrador/Professor/Aluno) à entidade `Usuario`.
3. **Backend — Comentários**: nova entidade e rotas REST para comentários em posts.
4. **Frontend — Área pública**: lista de posts (paginação + busca), leitura de post, exibição e envio de comentários.
5. **Frontend — Área do Professor**: criação e edição de posts (textarea simples); acesso restrito a Professor e Administrador.
6. **Frontend — Área Administrativa**: gestão de todos os posts (editar/excluir) e criação de contas de usuário; acesso restrito a Administrador.
7. **Frontend — Autenticação**: tela de login e guarda de rotas conforme tipo de usuário.

## Stack
- **Frontend**: React + Vite, React Router para navegação, `fetch` nativo para consumo da API REST, Tailwind CSS para estilização.
- **Backend (existente)**: Fastify + TypeORM.
- **Banco de dados**: MySQL (migrado de PostgreSQL).
- **Autenticação**: JWT com sessão de 24 horas; senha com hash bcrypt (já implementado no backend).

## Constraints técnicas
- A interface deve ser responsiva em dispositivos móveis e desktop.
- O backend já possui CRUD de posts e usuários implementado; ainda faltam: endpoint de login, entidade/rotas de comentários, campo `tipo` no usuário e a migração de PostgreSQL para MySQL.
- Projeto de trabalho de aula — não há prazo de entrega em produção definido além do combinado pelo autor.

## Critérios de aceitação
- Um visitante não autenticado consegue visualizar a lista de posts (com paginação e busca) e ler um post completo, mas não consegue criar, editar, excluir posts nem comentar.
- Um usuário autenticado de qualquer tipo consegue comentar em um post.
- Um Professor autenticado consegue criar e editar posts, mas não acessa a página administrativa nem cria contas de usuário.
- Um Administrador autenticado consegue editar/excluir qualquer post do sistema e criar contas de usuário.
- O login retorna 401 para credenciais inválidas e um token JWT válido por 24 horas para credenciais corretas.
- Rotas de criação, edição e administração redirecionam para a tela de login quando não há um token válido.
- A aplicação funciona corretamente com MySQL após a migração, sem dependência de PostgreSQL.
- O layout se adapta corretamente entre telas mobile e desktop.

## Decisões em aberto
- **Upload de imagens em posts**: será implementado somente se a complexidade for baixa; caso contrário, fica fora do escopo deste trabalho.
