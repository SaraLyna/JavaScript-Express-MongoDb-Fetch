## Fonctionnement :
Reproduire le comportement du serveur du TP1(trivialserver), à quelques petites modifications près,

  -  /first : la réponse à cette requête est le contenu du fichier first.html fourni.
  -  /second : la réponse à cette requête est le contenu du fichier second.html fourni,
ce document fait référence à une image (également fournie(timoleon-oceanie), comme cela était évoqué dans la dernière partie du TP1. Une feuille de style (fournie) est utilisée par les deux fichiers html.
  -  /json : la réponse à cette requête, au format JSON, sera exactement la même que celle décrite dans le TP1.
  -  /json/random : cette route remplace la route /random du TP1 et fournit la même réponse.
toutes les autres requêtes échouent et reçoivent en réponse une page HTML qui mentionne une page non trouvée (ce qui correspond à un "erreur 404")

Pour tester il suffit de :
- ouvrir la page `http://localhost:3000`
- ensuite lancer `nodemon` ou `npm run start` 





## Commandes et explications :
- `npm install express-generator --global`, création du projet Express
- `express --view=pug basicExpress`, 
- `npm install`, installation de npm

- Test de la route /users/hello, ensuite suppression de celle-ci et mise en place des controllers, (Séparation des préoccupations).
- Mise en place du cahier des charges cité au-dessus.
- Les ressources statiques (images et feuilles de style) sont délivrées par le middleware statique d'Express.
- Le routeur qui se charge de la route / prend en charge les deux chemins /first et /second.
- Un seul routeur contrôle les routes de racine /json, et donc les deux "sous-chemins" qui lui sont liés. 
- `npm run start` - `nodemon`, démarrage du serveur.


