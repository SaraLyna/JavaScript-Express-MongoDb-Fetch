## PROJET 1 : Encheres

## NOM PRENOM
OUYAHIA SARA LYNA


## Présentation : principe
application de vente aux enchères dans laquelle un commissaire priseur unique met aux enchères un objet à un prix de départ qu'il fixe. 
Les enchérisseurs connectés au moment du lancement des enchères peuvent enchérir. 
Chacun est informé des différentes enchères. 
Le commissaire priseur peut mettre fin à la vente et en informe les participants. 
Il peut alors lancer une nouvelle enchère à laquelle pourront aussi participer les enchérisseurs qui se sont connectés depuis le début de la précédente enchère.


## Client - Server
- le dossier server/public/  contient notamment

 toutes les ressources statiques qu'envoie le serveur.

- le fichier qui correspond à l'application cliente, et tous les autres fichiers nécessaires à son fonctionnement : commissaire-priseur.js et encherisseur.js
    
- le dossier server/  contient les fichers nécessaires à la création du server 
notamment le dossier controllers qui contient les fichiers qui gèrent le fonctionemment du server
- le index.js correspond au server( en principe), grace aux controllers evidemment.

- index.js utilise RequestController.js pour gérer le comportement du server de sockets.
Ce serveur se contente de distribuer les ressources statiques placées dans le dossier server/public/. 



## Travail réalisé
- Server qui accepte trois routes :

    / livre une page d'accueil qui présente les enchères et fournit des liens vers les "autres routes"
    /about informe sur le numéro de version et les auteurs de l'application,
    /auctioneer permet d'accéder à la page "commissaire-priseur"
    /bidder permet d'accéder à la page "enchérisseur"


- Le comportement de la page délivrée par la route /auctioneer sera le suivant :

il ne peut y avoir qu'un seul commissaire-priseur à la fois. Lors de l'accès à cette page, s'il n'y a pas encore de commissaire-priseur, la personne qui se connecte est informée qu'elle devient le commissaire-priseur. S'il y en a déjà un, l'utilisateur en est également informé ;
le commissaire-priseur peut ensuite préciser un objet en vente et son prix de départ, puis lancer le début des ecnhères ;
le commissaire-priseur est informé des enchères et c'est lui qui décide de mettre fin à la vente.


- Le comportement de la page délivrée par la route /bidder sera le suivant :

une fois connecté, on reste en attente du début du lancement d'une nouvelle enchère (y compris si une enchère est déjà en cours) ;
dès qu'une enchère est démarrée, les informations sur la vente sont reçues et il est possible d'enchérir avec des sommes fixes (5, 10 et 100 par exemple) ;
si une enchère est faite par un autre participant, l'information du nouveau prix est reçue. De même, lorsque la fin de l'enchère est déclenchée, l'utilisateur en est informé et il sait s'il a ou non remporté la vente.

## Commandes 

- Création des dossiers public et server pour commencer, 
- installation côté serveur d'un contrôleur pour socket.io 
- création des classes et objets nécessaires aux clients 
- installation du webpack.config.js
- `npm init` coté client : initialise un nouveau projet Node.js, et crée un nouveau fichier package.json, qui est un fichier de configuration pour le projet Node.js.
Ce fichier contient des informations telles que le nom du projet, la version, la description, les dépendances, les scripts, etc. 
- `npm init` coté server : initialise un nouveau projet Node.js, et crée un nouveau fichier package.json, qui est un fichier de configuration pour le projet Node.js.
Ce fichier contient des informations telles que le nom du projet, la version, la description, les dépendances, les scripts, etc. 
- `npm install` coté client : crée le répertoire local node_modules, et installe les dépendances déclarées dans le fichier package.json du projet Node.js.
- `npm install` coté server : crée le répertoire local node_modules, et installe les dépendances déclarées dans le fichier package.json du projet Node.js.
- `npm run build` coté client seulement :  exécute un script spécifique défini dans le fichier package.json du projet Node.js. permettant ainsi d'automatiser le processus de construction de l'application.
- `npm install socket.io` pour installer le package socket.io
- pour lancer le server on peut utiliser la commande `nodemon` directement dans le dossier server ou il y a index.js

