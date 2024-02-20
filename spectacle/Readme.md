## Nom Prenom
Ouyahia Sara Lyna

## Projet 2 : Spectacle

## Description du projet :
Création d'une application qui permet la gestion de spectacles et la réservation de tickets par ses utilisateurs. L'application se décompose en deux parties. La première concerne la partie administration de l'application et la seconde est pour les utilisateurs.

Dans la partie administration, il doit être possible de :

    - créer un spectacle en en donnant une description et en précisant le nombre de places disponibles,
    - visualiser la liste des spectacles déjà créés,
    - supprimer un spectacle. Lors de la suppression d'un spectacle, les tickets réservés par les clients (voir ci-dessous) doivent êtr supprimés.

Dans la partie utilisateur, un utilisateur doit pouvoir :

    - consulter la liste des spectacles déjà créés,
    - réserver des tickets pour un spectacle,
    - visualiser la listes des tickets réservés,
    - annuler les réservations pour un spectacle.

Que ce soit pour l'administrateur ou un utilisateur, une fois authentifié, le fonctionnement de l'application côté navigateur doit être celui d'une "application en page unique" ("single page application"), c'est-à-dire sans rechargement de la page pour la modifier lors des interactions avec l'application (la page d'authentification reste cependant une page à part, il y a donc un bien un chargement d'une nouvelle page entre l'authentification et le lancement de l'application). 

## Elements de simplification :

Pour simplifier le travail, on accepte que :

    - Lors de la création d'un compte utilisateur, si le nom de l'utilisateur est admin alors il se voit affecter le rôel administrateur de l'application.
    - On ne contrôle pas lors de la réservation d'un ticket s'il reste de la place pour le spectacle ("on ne gère pas le stock").
    - Si deux utilisateurs ou l'administateur sont connectés simultanément, les actions de l'un ne sont pas "immédiatement" répercuté dans la vue de l'application de l'autre.

    Par exemple, si l'administrateur ajoute un spectacle, malgré les modifications dans la base de données, un utilisateur connecté à ce moment là, ne voit pas la liste des spectacles existants immédiatement modifiée. La mise à jour ne se fait que lorsqu'il recharge la page.

    De même, si un spectacle est supprimé, la suppression des tickets éventuellement réservés par le client n'est pas visible avant le prochain rechargement de l'application.
    
    
    
## Commandes
`npm install express-generator --global`
`express --view=pug spectacle`
`npm install`
`npm run start` - `nodemon`


## Explications :



