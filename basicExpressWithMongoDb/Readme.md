## Fonctionnement & commandes :
- `npm install express-generator --global`, création du projet Express
- `express --view=pug basicExpress`, 
- `npm install`, installation de npm
- `npm run start` - `nodemon`, démarrage du serveur.

- sur un premier terminal : lancer 
`mongod --dbpath dbPath`

- sur un deuxième terminal : lancer 
`mongoimport --db tasksBase --collection tasks --file misc/tasks.json`
2024-03-05T17:41:23.941+0100	connected to: mongodb://localhost/
2024-03-05T17:41:23.958+0100	3 document(s) imported successfully. 0 document(s) failed to import.

- Maintenant que la base de données a été importée avec succés, on peut commencer.

- En lançant `mongosh` :
test> use tasksBase
switched to db tasksBase
tasksBase> db.tasks.find()
[
  {
    _id: ObjectId("65e74b33d3ff5a6438151101"),
    description: 'prendre un café',
    urgency: 3
  },
  {
    _id: ObjectId("65e74b33d3ff5a6438151102"),
    description: 'finir les TP de jsfs',
    urgency: 5
  },
  {
    _id: ObjectId("65e74b33d3ff5a6438151103"),
    description: 'acheter du pain',
    urgency: 1
  }
]
tasksBase> db.tasks.find().count()
3



