# JWT authentication RESTful API

## Overview

This is a JWT (Json Web Token) authentication RESTful API allows you to register a user, log in as a registered user, get the user profile and log out a user.

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

More details [on the MongoDB documentation](https://docs.atlas.mongodb.com/driver-connection/).

## Usage

Start the localhost server:

```shell
npm start
```

Go to the URL `localhost:4000` in your Internet browser and you should see `You are successful connecting to the API.` message.

You can check if everything works like a charm by running the tests:

```shell
npm test
```

## Required npm packages

Below is the list of required packages. They must be installed by typing the command `npm install` in the terminal.

`express` — A minimalist Web framework makes easier to build a HTTP server.

`nodemon` — The local server will be re-run automatically every time we modify the code.

`mongoose` — Elegant MongoDB object modeling tool which allows us to define schemas and do several operations to the database.

`bcrypt` — This will hash user passwords before storing them into the database.

`jsonwebtoken` — JSON Web Token(JWT) allows us to create protected API routes. Some routes will only be accessible by the logged user.

`validator` — This package will validate the user form input. We need to ensure the email is in the right format.

`mosha` — A JavaScript test framework provides a testing environment in which we can use our favorite assertion libraries to test the code.

`chai` — An assertion library which allows to test HTTP calls, such as GET request, POST request, etc.

## API Routes

### `POST /api/auth/register`

Register a user in the database.

The body of this request must contain the following parameters:

| parameter | Value                                 |
| --------- | ------------------------------------- |
| username  | String                                |
| email     | String                                |
| password  | String<br />Min length : 7 characters |

Example response:

```json
{
	"newUser": {
		"_id": "60af...bb8",
		"username": "kev",
		"email": "kev@email.com",
		"password": "$2b$0...yLA9vi"
	}
}
```

### `POST /api/auth/login`

Find a user in the database and create his access JWT token.

The body of this request must contain the following parameters:

| parameter | Value                                 |
| --------- | ------------------------------------- |
| email     | String                                |
| password  | String<br />Min length : 7 characters |

Example response:

```json
{
	"foundUser": {
		"_id": "60...b5e9",
		"username": "kev",
		"email": "kev@email.com",
		"password": "$2b$08...z6Lxam",
		"token": "ey...QQoSc"
	},
	"token": "ey...QQoSc"
}
```

### `POST /api/auth/me`

Get the user profile, such as the username and the email.

The header of this request must contain the following parameter:

| Header parameter | Value                              |
| ---------------- | ---------------------------------- |
| Authorization    | String<br />`Bearer Ngsrgs...MfhH` |

### `POST /api/auth/logout`

Delete the user access token.

The header of this request must contain the following parameter:

| Header parameter | Value                              |
| ---------------- | ---------------------------------- |
| Authorization    | String<br />`Bearer Ngsrgs...MfhH` |

## References

[JWT Authentication & Authorization in NodeJs/Express & MongoDB REST APIs(2019)](https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express-mongodb-rest-apis-2019-ad14ec818122)
