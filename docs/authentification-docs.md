# Le système d'authentification en JavaScript

## Pourquoi ce projet ?

Apprendre le Node.js et en savoir plus sur la sécurité du Web.

## Les packages installés

`express` — mettre en place un serveur Node.js
`mongoose` — connecter à la base de données MongoDB.
`mosha` — fournir un environnement pour faire des tests.
`chai` — une librairie permettant le code des tests unitaires.

## Comment ça marche l'authentification par Token ?

Quand l'utilisateur se connecte au serveur, le serveur va vérifier que l'email de l'utilisateur est bien dans la BDD.

Si l'utilisateur existe, le serveur va lui envoyer un **token** qui est comme une carte d'identité.

A chaque fois que l'utilisateur fait une rêquete au serveur, il y a la police (**middleware**) qui va vérifier si sa **carte d'identifité (token)** est vraie avant de donner une réponse à la rêquete.

## Technologies retenues

- Language : JavaScript
- Frontend : JavaScript vanilla
- Backend : Node.js

## Vocabulaire

- **Token d'authentification** : permet aux utilisateurs de ne se connecter qu'une seule fois à leur compte. Au moment de se connecter, ils recevront leur token et le renverront automatiquement à chaque requête par la suite.
  Ceci permettra au backend de vérifier que la requête a été faite par un utilisateur authentifié.
- endpoint ?

## Commandes Node.js à savoir

- _Npm install_ : permet de d'installer tous les paquets, nécessaires du projet, inscrits dans packages.json.

## Codes erreurs d'une requête HTTP

L'erreur 401 : Il manque soit le mot de passe, soit l'identifiant pour que la requête client soit envoyée vers le serveur.

## Explication du code

### Différentes routes

`HTTP POST /api/auth/login` — enregistrer un utilisateur

`HTTP POST /api/auth/login` — trouver un utilisateur dans la BDD et lui créer un token dans la liste de ses tokens

`HTTP POST /api/auth/me` — voir le profil de l'utilisateur en reseignant son token présent dans la liste de ses tokens

`HTTP POST /api/auth/logout` — supprimer le token de l'utilisateur de la liste de ses tokens.

`HTTP POST /api/auth/logoutall` — supprimer tous les token de l'utilisateur dans la liste de ses tokens.

### Créer un middleware

Un middleware est un bout de code qui fait le pont entre l'application client et la base de données.
Le code de middleware va être exécuter avant qu'une requête arrive auprès du serveur. Le middleware sert à vérifier si la personne qui fait la requête est autorisé à accéder à la base de données.

## Que fait le code de middleware ?

Le code peut modifier la requête `request` ou la réponse `response` du serveur

## Erreurs rencontrées

### Méthode statique et méthode d'une instance

`router.post('/users/login', async function (req, res) {`

`// Login a registered user`

`try {`

`const { email, password } = req.body;`

`const foundUser = await UserModel.findByCredentials(email, password);`

`if (!foundUser) {`

`// "unauthorized" error`

`return res.status(401).send({ error: 'Login failed.' });`

`}`

`const token = await foundUser.generateAuthToken();`

`res.send({ foundUser, token });`

`} catch (error) {`

`console.log(error);`

`res.status(400).send(error);`

`}`

`});`

UserModel.findByCredentials(email, password) est une méthode statique définie dans la classe UserModel.

La méthode statique sera quelque chose du genre "FindUser", une méthode globale qui va chercher UN utilisateur **dans tout le modèle de mongoose**.

`foundUser.generateAuthToken();` est une méthode définie dans l' instance foundUser de la classe UserModel.

La méthode de l'instance est spécifique car on veux générer un token pour LE utilisateur trouvé.

**La méthode statique est globale, disponible dans un modèle mongoose vs la méthode de l'instance est spécifique à une instance**

### TypeError: Converting circular structure to JSON

`res.send(req)`renvoie un objet de `req`entier qui contient des données complexes et des dépendances circulaire d'où le message `Converting circular structure to JSON`

Solution : filter les données de la réponse `req` en faisant `res.send(req.user)`

## Ce que j'ai appris

filter

## Pourquoi faire le test unitaire ?

On écrit le code pas une fois, il va ajouter de nouvelles fonctionnalités au fur et à mesure. Il faut assurer que le code existant fonctionne à merveille.
