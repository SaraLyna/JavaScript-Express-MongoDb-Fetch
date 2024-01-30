## TP CHART IO

## NOM PRENOM
OUYAHIA SARA LYNA


## Présentation
L'application à réaliser consiste à disposer d'un serveur qui envoie à intervalle régulier une nouvelle donnée aux clients connectés.


## Client
le dossier public/  contient notamment

    le fichier qui correspond à l'application cliente
    
le fichier ./scripts/myChart.js est chargé par le fichier précédent.
et ce sont ses données qu'il faudra faire évoluer.

## Server 

main.js qui utilise requestController.js et ioController.js qui gère le comportement du server de sockets.
Ce serveur se contente de distribuer les ressources statiques placées dans le dossier public/. 



## Travail réalisé
le server marche super bien, les données ont évolué, 
au début on reçoie bien : 
`Received from server: -> Object { message: "ping" }` coté client
`Received message from server: 6` 
`Received message from server: 5`
`Received message from server: 6`
`Received message from server: 2`
`Received message from server: 7`
`Received message from server: 2`

et coté server : 
 `connexion réussie`
 `new connection with id yVyEamg93EVbKUOJAAAB`
 `Sent parametrized message to client yVyEamg93EVbKUOJAAAB: 3`
 `Sent parametrized message to client yVyEamg93EVbKUOJAAAB: 6`
 `Sent parametrized message to client yVyEamg93EVbKUOJAAAB: 7`
 `Sent parametrized message to client yVyEamg93EVbKUOJAAAB: 5`
 `Sent parametrized message to client yVyEamg93EVbKUOJAAAB: 5`
 `Sent parametrized message to client yVyEamg93EVbKUOJAAAB: 3`
 `Sent parametrized message to client yVyEamg93EVbKUOJAAAB: 7`
 
 
Déconnexion :
`disconnection from 1I7p4bkl0YRUKftJAAAB (user : 8)`
`connexion réussie`
`new connection with id CTxy3FlZYIe-G20HAAAD`


