This is a JWT (Json Web Token) Authentication REST API allows you to register a user, log in as a registered user, get the user profile and log out a user.

## Why this project ?

I build the API because i want to learn [Node.js](https://nodejs.org/en/) by practicing.

## Installation

Open your terminal and clone this repository to your local repertory:

```shell
git clone https://github.com/xingcdev/authentication-api.git
```

Create `.env` file from `.env.example` file and replace `your_mongodb_url` with the URL of your MongoDB in order to connect to the database:

```
MONGODB_URL=your_mongodb_url
JWT_KEY=WinterIsComingGOT2019
PORT=4000
```

To get the URL of your database, your need to connect on [mongodb.com](https://www.mongodb.com/). In the **Clusters** view, click **Connect** for the cluster to which you want to connect. Choose **Connect your application** and copy the string of the URL.

More details [here](https://docs.atlas.mongodb.com/driver-connection/).

## Usage

Start the localhost server:

```shell
npm start
```

Go to the URL `localhost:4000` in your Internet browse and you should see `hello`.

You can check if everything works like a charm by running the tests:

```shell
npm test
```

## Required npm packages

Below is the required packages. They are installed by using the package manager [npm](https://www.npmjs.com/).

`express` — A minimalist Web framework makes easier to build a HTTP server.

`nodemon` — The local server will be re-run automatically every time we modify the code.

`mongoose` — Elegant MongoDB object modeling tool which allows us to define schemas and do several operations to the database.

`bcrypt` — This will hash user passwords before storing them into the database.

`jsonwebtoken` — JSON Web Token(JWT) allows us to create protected API routes. Some routes will only be accessible by the logged user.

`validator` — This package will validate the user form input. We need to ensure the email is in the right format.

`mosha` — A JavaScript test framework provides a testing environment in which we can use our favorite assertion libraries to test the code.

`chai` — An assertion library which allows to test HTTP calls such as GET request, POST request, etc.

## API Routes

`HTTP POST /api/auth/register` — enregistrer un utilisateur

`HTTP POST /api/auth/login` — trouver un utilisateur dans la BDD et lui créer un token dans la liste de ses tokens

`HTTP POST /api/auth/me` — voir le profil de l'utilisateur en reseignant son token présent dans la liste de ses tokens

`HTTP POST /api/auth/logout` — supprimer le token de l'utilisateur de la liste de ses tokens.

## References

[JWT Authentication & Authorization in NodeJs/Express & MongoDB REST APIs(2019)](https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express-mongodb-rest-apis-2019-ad14ec818122)
