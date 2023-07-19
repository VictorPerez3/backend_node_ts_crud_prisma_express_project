# Backend_Node_TS_Crud_Prisma_Express_Project

`Data de Desenvolvimento/ultima modificação` : 17/07/2023

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
4.  Scripts
5.  EndPoints Disponíveis
6.  Outras Ferramentas / Tecnologias

# 1) Sobre o sistema

É um sistema para construir e gerenciar seu banco de dados. Conta com validação, autenticação e controle de acesso de usuarios.

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
SERVER_PORT=8080

#Postgre Auth
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=latihan
POSTGRES_SCHEMA=public

#Token
TOKEN_KEY="ksjahdkajshdkjashdaskjhdaksjdhkasjdhaskj"

#DataBase Url
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/latihan"

```

### 4 - Migração do Banco de dados:

Neste ponto, você tem um esquema Prisma, mas nenhum banco de dados ainda. Execute o seguinte comando em seu terminal para criar um banco de dados PostgreSql e as tabelas representadas por seus modelos:

```
#Criar o banco de dos a partir do esquema Prisma:
npx prisma migrate dev --name init

#Comando para atualizar o esquema do D.B:
npx prisma db push
```

## 5 - Execução do Sistema

```
yarn start-dev
```

# 4) Scripts

| Script           | Description                                     |
| ---------------- | ----------------------------------------------- |
| `yarn start-dev` | Rodar servidor - "nodemon ./src/app.ts"         |
| `yarn start`     | Compilar e rodar servidor - "node build/app.js" |
| `yarn prestart`  | "npm run build"                                 |
| `yarn build`     | Gera compilação - "tsc"                         |
| `yarn format`    | Formatação do codigo - "prettier --write ."     |

# 5) EndPoints Disponíveis

| Users                  | Description                                            |
| ---------------------- | ------------------------------------------------------ |
| `get /users/ping`      | Verifica se o servidor esta online                     |
| `get /users`           | Retorna todos os usuarios (necessário token)           |
| `get /users/:id`       | Retorna usuario pelo ID (necessário token)             |
| `post /users/register` | Criação de usuários user/admin (validação de cadastro) |
| `put /users/:id`       | Atualiza dados do usuário já criado(necessário token)  |
| `delete /users/:id`    | Deleta usuário(necessário token)                       |

| Authentication      | Description                                       |
| ------------------- | ------------------------------------------------- |
| `post /users/login` | Valida os dados de login e faz o login do usuário |

# 6) Outras Ferramentas / Tecnologias

- `Zod`: Validação de usuarios na criação e login
- `Bcrypt`: Criptografia do tipo hash para senhas
- `JWT(Json Web Token)`: Transmitir ou armazenar de forma compacta e segura objetos JSON entre diferentes aplicações.
- `ESLint`: Analisa estaticamente o código para encontrar problemas rapidamente.
- `Nodemon`: Monitora quaisquer alterações na origem e reinicia automaticamente o servidor.
- `Debug VSCode`: Depurador integrado do VS Code .
- `Prettier`: Formatação de codigo.
