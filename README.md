# Backend_Node_TS_Crud_Prisma_Express_Project

`Data de Desenvolvimento/ultima modificação` : 08/08/2023

`Empresa`: Tegrus

`Nome do desenvolvedor` : Victor Vagner Perez

`Nome do projeto` : Backend_Node_TS_Crud_Prisma_Express_Project

`License` : MIT

# Sumário

1.  Sobre o sistema
2.  Principais tecnologias utilizadas
3.  Passos para clonar, configurar e executar o Sistema
    1. Clonando o repositório (Remoto -> Maquina Local) através do terminal
    2. Configurando as dependencias do projeto pelo terminal
    3. Configurando as variáveis de ambiente
    4. Migração do Banco de dados
    5. Execução do Sistema
    6. Execução em Container Docker
4.  Scripts
5.  EndPoints Disponíveis
6.  Testes automatizados Unitarios/Integração
7.  Outras Ferramentas / Tecnologias

# 1) Sobre o sistema

É um sistema para construir e gerenciar seu banco de dados. Conta com validação, autenticação e controle de acesso de cadastros.

A modularização é realizada utilizando como premissa a arquitetura MVC.

# 2) Principais tecnologias utilizadas

1.  `Node.js`
2.  `Typescript`
3.  `Express.js`
4.  `Prisma DataBase`

# 3) Passos para clonar, configurar e executar o Sistema

### 1 - Clonando o repositório (Remoto -> Maquina Local) através do terminal:

```
git clone https://gitlab.com/tegrus/learning-isc-team/victor/backend_node_ts_crud_prisma_express_project.git

  cd backend_node_ts_crud_prisma_express_project
```

### 2 - Configurando as dependencias do projeto pelo terminal:

```
yarn build
```

### 3 - Configurando as variáveis de ambiente:

1.  Criar na pasta principal o arquivo ".env" .
2.  Copiar e colar o codigo abaixo e adaptar conforme necessario.

```
#Server Configuration
SERVER_PORT=

#Postgre Auth
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_SCHEMA=

#Token
TOKEN_KEY=

#DataBase Url
DATABASE_URL=

```
Obs: Existe o ".env" para rodar pelo vscode. E existe o ".env.docker" para rodar pelo docker (DATABASE_URL= "postgres" no logar de "localhost").

### 4 - Migração do Banco de dados:

Neste ponto, você tem um esquema Prisma, mas nenhum banco de dados ainda. Execute o seguinte comando em seu terminal para criar um banco de dados PostgreSql e as tabelas representadas por seus modelos:

```
#Criar o arquivo de migração do banco de dados, a partir do esquema Prisma:
npx prisma migrate dev --name init

#(OPCIONAL) Comando para atualizar o esquema do D.B:
npx prisma db push
```

## 5 - Execução do Sistema

```
yarn start-dev
```

## 6 - Execução em Container Docker

```
yarn docker:compose
```

# 4) Scripts

| Script                   | Description                                          |
| ------------------------ | ---------------------------------------------------- |
| `yarn start-dev`         | Rodar servidor - "nodemon src/start.ts"              |
| `yarn start`             | Compilar e rodar servidor - "node build/start.js"    |
| `yarn build`             | Gera compilação - "tsc"                              |
| `yarn format`            | Formatação do codigo - "prettier --write ."          |
| `yarn test`              | Executar testes em serie com Jest (jest --runInBand) |
| `yarn docker:compose`    | Gera projeto docker "docker-compose up"              |
| `yarn docker:image-test` | Gera e testa imagem Docker                           |

# 5) EndPoints Disponíveis

| Authentication           | Description                                   |
| ------------------------ | --------------------------------------------- |
| `post /superadmin/login` | Login de conta SUPERADMIN                     |
| `post /users/login`      | Login de conta USER                           |
| `post /admin/login`      | Login de conta ADMIN                          |
| `post /logout`           | Logout                                        |
| `get /verify`            | Verifica quem esta logado (name, email, role) |

| SuperAdmin (controle geral)            | Description              |
| -------------------------------------- | ------------------------ |
| `get /superadmin/agency`               | Retorna agencias         |
| `get /superadmin/agency/:id`           | Retorna agencias por id  |
| `post /superadmin/agency/register`     | Criação de agencia       |
| `post /superadmin/users/register`      | Criação de usuario       |
| `post /superadmin/client/register`     | Criação de cliente       |
| `put /superadmin/agency/update/:id`    | Atualizar agencia por id |
| `put /superadmin/users/update/:id`     | Atualizar usuario por id |
| `put /superadmin/client/update/:id`    | Atualizar cliente por id |
| `delete /superadmin/agency/delete/:id` | Deletar Agencias por id  |
| `delete /superadmin/users/delete/:id`  | Deletar usuarios por id  |
| `delete /superadmin/client/delete/:id` | Deletar clientes por id  |

| Admin (controle na agencia) | Description                                              |
| --------------------------- | -------------------------------------------------------- |
| `get /admin/users`          | Retorna todos os usuarios                                |
| `get /admin/users/:id`      | Retorna usuario pelo ID                                  |
| `post /admin/register`      | Criação de usuarios (user/admin)                         |
| `put /admin/updatebyemail`  | Pelo email, atualiza dados de usuarios tipo (user/admin) |
| `delete /admin/delete/:id`  | Deleta por ID, usuarios tipo (user/admin)                |

| Users                  | Description                                                |
| ---------------------- | ---------------------------------------------------------- |
| `put /users/update`    | (Admin/User) Atualiza dados (nome e senha) da conta logada |
| `delete /users/delete` | (Admin/user) Deleta usuario logado                         |

| Client                      | Description                                      |
| --------------------------- | ------------------------------------------------ |
| `get /client`               | Retorna os clientes dentro da agencia logada     |
| `post /client/register`     | Criação de clientes dentro da agencia logada     |
| `put /client/update/:id`    | Atualiza dados (nome e imagem) do cliente por id |
| `delete /client/delete/:id` | Delete clientes dentro da agencia por id         |

# 6) Testes automatizados Unitarios/Integração

Na pasta "**tests**", testes unitarios apresentam sufixo ".test.ts" e testes de integração ".integration.test.ts".

Para executar por completo a bateria de testes em série, execute no terminal:

```
yarn test
```

# 7) Outras Ferramentas / Tecnologias

- `Zod`: Validação de usuarios na criação e login
- `Bcrypt`: Criptografia do tipo hash para senhas
- `JWT(Json Web Token)`: Transmitir ou armazenar de forma compacta e segura objetos JSON entre diferentes aplicações.
- `ESLint`: Analisa estaticamente o código para encontrar problemas rapidamente.
- `Nodemon`: Monitora quaisquer alterações na origem e reinicia automaticamente o servidor.
- `Debug VSCode`: Depurador integrado do VS Code .
- `Prettier`: Formatação automática de codigo.
- `Swagger UI`: Documentação automática de API (http://localhost:port/api-docs/#/).
- `Jest`: Testes Automatizados (Unitarios/Integração).
- `Docker`: Deploy da aplicação no servidor.
