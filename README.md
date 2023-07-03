
# Barber

Este projeto foi desenvolvido como parte da disciplina de Laboratório de Aplicação Web. Seu objetivo principal é implementar um sistema de cadastro e visualização de barbearias, com recursos avançados como um CRUD completo para usuários e barbearias, sistema de autenticação e sistema de validação.

## Funcionalidades

- CRUD Completo: O sistema permite criar, ler, atualizar e excluir usuários e barbearias.
- Tratamento de Erros: Foram implementados mecanismos de tratamento de erros para lidar com situações inesperadas e fornecer mensagens adequadas ao usuário.
- Sistema de Autenticação: É possível realizar o login e obter um token de autenticação para acessar rotas protegidas, garantindo a segurança das informações.
- Versionalidade: O projeto foi desenvolvido com controle de versionamento, permitindo o rastreamento de alterações e o desenvolvimento de novas funcionalidades de forma organizada.
- Responsividade: O sistema é responsivo e se adapta a diferentes tamanhos de tela, proporcionando uma experiência consistente em dispositivos móveis e desktops.

## Stack utilizada

**Front-end:** Typescript,
React,
Axios,
React-toastif,
Styled-Component

**Back-end:** Node,
Express,
Bcrypt,
Typeorm,
Jwt,

## Aprendizados

O que você aprendeu construindo esse projeto? Quais desafios você enfrentou e como você superou-os?

# Cadastro e Visualização de Barbearias - Instalação e Execução Local

Este projeto foi desenvolvido como parte da disciplina de Laboratório de Aplicação Web. Seu objetivo principal é implementar um sistema de cadastro e visualização de barbearias, com funcionalidades avançadas como um CRUD completo, tratamento de erros, sistema de autenticação e versionalidade.

## Requisitos de Instalação

Antes de executar o projeto localmente, certifique-se de ter os seguintes requisitos instalados em sua máquina:

- Node.js
- npm (gerenciador de pacotes do Node.js)
- Git

## Como Executar o Projeto Localmente

Siga as etapas abaixo para instalar e executar o projeto em seu ambiente de desenvolvimento local.

1. Clone este repositório em sua máquina:

```shell
git clone https://github.com/GabrielPSantana/barber
```

2. Acesse o diretório raiz do projeto:



### Backend

3. Acesse a pasta do backend:

```shell
cd back-end
```

4. Instale as dependências do backend:

```shell
npm install
```

5. Crie um arquivo `.env` na pasta raiz do backend e defina as variáveis de ambiente necessárias. 


### Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`SECRET`



6. Inicie o servidor do backend:

```shell
npm run dev
```

O servidor do backend estará disponível em `http://localhost:5000`.

### Frontend

7. Acesse a pasta do frontend:

```shell
cd ../frontend
```

8. Instale as dependências do frontend:

```shell
npm install
```

9. Inicie o servidor de desenvolvimento do frontend:

```shell
npm start
```

O aplicativo frontend estará disponível em `http://localhost:3000`.

## Documentação da API - Cadastro e Visualização de Barbearias

Esta documentação descreve as principais rotas da API do projeto de Cadastro e Visualização de Barbearias. Utilize as informações abaixo para realizar as requisições corretamente.

## Base URL

A URL base da API é: `http://localhost:5000/`

## Rotas do Usuário

### Retorna todos os usuários

```http
GET /user/
```

Esta rota retorna todos os usuários cadastrados no sistema.

#### Parâmetros

Nenhum parâmetro é necessário.

#### Resposta

A resposta será um array contendo todos os usuários cadastrados no sistema.

### Retorna um usuário pelo ID

```http
GET /user/:id
```

Esta rota retorna um usuário específico com base no ID fornecido.

#### Parâmetros

| Parâmetro | Tipo     | Descrição                                      |
| :-------- | :------- | :--------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do usuário que você quer. |

#### Resposta

A resposta será um objeto contendo as informações do usuário correspondente ao ID fornecido.

### Registrar um novo usuário

```http
POST /user/register
```

Esta rota permite registrar um novo usuário no sistema.

#### Parâmetros

Nenhum parâmetro é necessário. Os dados do usuário devem ser enviados no corpo da requisição, seguindo o formato JSON.

#### Corpo da requisição

```json
{
  "nome": "Nome do usuário",
  "email": "email@example.com",
  "password": "senha123"
}
```

#### Resposta

A resposta será um objeto contendo as informações do usuário recém-registrado e um token de autenticação que será utilizado para acessar rotas protegidas.

### Fazer login

```http
POST /user/login
```

Esta rota permite fazer login com um usuário registrado no sistema.

#### Parâmetros

Nenhum parâmetro é necessário. As credenciais de login devem ser enviadas no corpo da requisição, seguindo o formato JSON.

#### Corpo da requisição

```json
{
  "email": "email@example.com",
  "password": "senha123"
}
```

#### Resposta

A resposta será um objeto contendo o token de autenticação que será utilizado para acessar rotas protegidas.

### Editar informações do usuário

```http
PUT /user/:id
```

Esta rota permite editar as informações de um usuário existente. É necessário enviar o token de autenticação no cabeçalho da requisição para acessar esta rota.

#### Parâmetros

| Parâmetro | Tipo     | Descrição                                           |
| :-------- | :------- | :-------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do usuário que você quer editar. |

#### Cabeçalho da requisição

```
Authorization: Bearer {token}
```

#### Corpo da requisição

```json
{
  "nome": "Novo nome do usuário",
  "email": "novoemail@example.com",
  "password": "novasenha123"
}
```

#### Resposta

A resposta será um objeto contendo as novas informações do usuário após a edição.

### Excluir usuário

```http
DELETE /user/:id
```

Esta rota permite excluir um usuário existente. É necessário enviar o token de autenticação no cabeçalho da requisição para acessar esta rota.

#### Par

âmetros

| Parâmetro | Tipo     | Descrição                                           |
| :-------- | :------- | :-------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do usuário que você quer excluir. |

#### Cabeçalho da requisição

```
Authorization: Bearer {token}
```

#### Resposta

A resposta será um objeto indicando que o usuário foi excluído com sucesso.

## Autenticação e Rotas Protegidas

Algumas rotas deste projeto são protegidas e requerem autenticação. Para acessar essas rotas, é necessário incluir o token de autenticação no cabeçalho da requisição.

#### Cabeçalho da requisição

```
Authorization: Bearer {token}
```

Certifique-se de incluir o prefixo "Bearer" antes do token.

Ao fazer login, você receberá um token de autenticação válido que pode ser usado para acessar as rotas protegidas. Certifique-se de armazenar o token em um local seguro e enviá-lo corretamente nos cabeçalhos das requisições para as rotas que exigem autenticação.

## Rotas das Barbearias

### Criar uma nova barbearia

```http
POST /store/create
```

Esta rota permite criar uma nova barbearia no sistema. É necessário enviar o token de autenticação no cabeçalho da requisição para acessar esta rota.

#### Parâmetros

Nenhum parâmetro é necessário. Os dados da barbearia devem ser enviados no corpo da requisição, seguindo o formato JSON.

#### Corpo da requisição

```json
{
  "name": "Loja do Pedro",
  "description": "Muitas roupas",
  "category": "Masculino",
  "contact": "95981977227",
  "latitude": 123.456,
  "longitude": 789.012
}
```

#### Cabeçalho da requisição

```
Authorization: Bearer {token}
```

#### Resposta

A resposta será um objeto contendo as informações da barbearia recém-criada.

### Retorna todas as barbearias

```http
GET /store/
```

Esta rota retorna todas as barbearias cadastradas no sistema.

#### Parâmetros

Nenhum parâmetro é necessário.

#### Resposta

A resposta será um array contendo todas as barbearias cadastradas no sistema.

### Retorna uma barbearia pelo ID

```http
GET /store/:id
```

Esta rota retorna uma barbearia específica com base no ID fornecido.

#### Parâmetros

| Parâmetro | Tipo     | Descrição                                      |
| :-------- | :------- | :--------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID da barbearia que você quer. |

#### Resposta

A resposta será um objeto contendo as informações da barbearia correspondente ao ID fornecido.

### Retorna as barbearias pelo id de um usuário

```http
GET /store/getbyuser/:userId
```

Esta rota retorna as barbearias pertencentes a um usuário específico. É necessário enviar o token de autenticação no cabeçalho da requisição para acessar esta rota.

#### Parâmetros

| Parâmetro | Tipo     | Descrição                                           |
| :-------- | :------- | :-------------------------------------------------- |
| `userId`  | `string` | **Obrigatório**. O ID da usuário que você quer as babearias. |

string` | **Obrigatório**. O ID do usuário que você quer listar as barbearias. |

#### Cabeçalho da requisição

```
Authorization: Bearer {token}
```

#### Resposta

A resposta será um array contendo as barbearias pertencentes ao usuário especificado.

### Excluir uma barbearia

```http
DELETE /store/:id
```

Esta rota permite excluir uma barbearia existente. É necessário enviar o token de autenticação no cabeçalho da requisição para acessar esta rota.

#### Parâmetros

| Parâmetro | Tipo     | Descrição                                      |
| :-------- | :------- | :--------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID da barbearia que você quer excluir. |

#### Cabeçalho da requisição

```
Authorization: Bearer {token}
```

#### Resposta

A resposta será um objeto indicando que a barbearia foi excluída com sucesso.

### Atualizar uma barbearia

```http
PATCH /store/:id
```

Esta rota permite atualizar as informações de uma barbearia existente. É necessário enviar o token de autenticação no cabeçalho da requisição para acessar esta rota.

#### Parâmetros

| Parâmetro | Tipo     | Descrição                                      |
| :-------- | :------- | :--------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID da barbearia que você quer atualizar. |

#### Cabeçalho da requisição

```
Authorization: Bearer {token}
```

#### Corpo da requisição

```json
{
  "name": "Nome atualizado",
  "description": "Descrição atualizada",
  "category": "Categoria atualizada",
  "contact": "Contato atualizado",
  "latitude": 123.456,
  "longitude": 789.012
}
```

#### Resposta

A resposta será um objeto contendo as novas informações da barbearia após a atualização.

Espero que esta documentação seja útil para utilizar a API de Cadastro e Visualização de Barbearias. Caso tenha mais dúvidas, sinta-se à vontade para perguntar.
## Autores

- [@luis-henrique-carvalho](https://www.github.com/luis-henrique-carvalho)
- [@GabrielPSantana](https://www.github.com/GabrielPSantana)

