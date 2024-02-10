/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/encherisseur.js":
/*!*************************************!*\
  !*** ./src/scripts/encherisseur.js ***!
  \*************************************/
/***/ (() => {

eval("    const socket = io();\r\n\r\n    socket.on('connected', () => {\r\n        console.log('Connecté au serveur de sockets en tant qu\\'enchérisseur');\r\n        document.getElementById('welcome-span').innerText = `Votre ID d'enchérisseur : ${socket.id}`;\r\n    });\r\n\r\n    socket.on('auctionStarted', (item, initialPrice) => {\r\n        document.getElementById('time-remaining').innerText = 'En cours';\r\n        document.getElementById('current-price').innerText = initialPrice + '€';\r\n    });\r\n\r\n    socket.on('bidReceived', (bidderId, amount) => {\r\n        console.log('Reçu : bidReceived', bidderId, amount);\r\n        document.getElementById('current-price').innerText = amount + '€';\r\n    });\r\n\r\n    socket.on('auctionEnded', () => {\r\n        console.log('Reçu : auctionEnded');\r\n        document.getElementById('time-remaining').innerText = 'Terminée';\r\n    });\r\n\r\n    socket.on('bidderLeft', () => {\r\n        alert(\"Un enchérisseur a quitté la vente.\");\r\n    });\r\n\r\n\r\n\r\n\r\n    const bidButtons = document.querySelectorAll('.bid-options');\r\n\r\n    bidButtons.forEach(button => {\r\n        button.addEventListener('click', function() {\r\n            const amount = parseInt(this.dataset.amount);\r\n            placeBid(amount);\r\n        });\r\n    });\r\n\r\n\r\n    function placeBid(amount) {\r\n        socket.emit('bid', socket.id, amount);\r\n    }\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2NyaXB0cy9lbmNoZXJpc3NldXIuanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RkFBeUYsVUFBVTtBQUNuRyxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xpZW50LWFwcC8uL3NyYy9zY3JpcHRzL2VuY2hlcmlzc2V1ci5qcz9mZjdhIl0sInNvdXJjZXNDb250ZW50IjpbIiAgICBjb25zdCBzb2NrZXQgPSBpbygpO1xyXG5cclxuICAgIHNvY2tldC5vbignY29ubmVjdGVkJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdDb25uZWN0w6kgYXUgc2VydmV1ciBkZSBzb2NrZXRzIGVuIHRhbnQgcXVcXCdlbmNow6lyaXNzZXVyJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dlbGNvbWUtc3BhbicpLmlubmVyVGV4dCA9IGBWb3RyZSBJRCBkJ2VuY2jDqXJpc3NldXIgOiAke3NvY2tldC5pZH1gO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc29ja2V0Lm9uKCdhdWN0aW9uU3RhcnRlZCcsIChpdGVtLCBpbml0aWFsUHJpY2UpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGltZS1yZW1haW5pbmcnKS5pbm5lclRleHQgPSAnRW4gY291cnMnO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50LXByaWNlJykuaW5uZXJUZXh0ID0gaW5pdGlhbFByaWNlICsgJ+KCrCc7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzb2NrZXQub24oJ2JpZFJlY2VpdmVkJywgKGJpZGRlcklkLCBhbW91bnQpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygnUmXDp3UgOiBiaWRSZWNlaXZlZCcsIGJpZGRlcklkLCBhbW91bnQpO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50LXByaWNlJykuaW5uZXJUZXh0ID0gYW1vdW50ICsgJ+KCrCc7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzb2NrZXQub24oJ2F1Y3Rpb25FbmRlZCcsICgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygnUmXDp3UgOiBhdWN0aW9uRW5kZWQnKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGltZS1yZW1haW5pbmcnKS5pbm5lclRleHQgPSAnVGVybWluw6llJztcclxuICAgIH0pO1xyXG5cclxuICAgIHNvY2tldC5vbignYmlkZGVyTGVmdCcsICgpID0+IHtcclxuICAgICAgICBhbGVydChcIlVuIGVuY2jDqXJpc3NldXIgYSBxdWl0dMOpIGxhIHZlbnRlLlwiKTtcclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG5cclxuICAgIGNvbnN0IGJpZEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmlkLW9wdGlvbnMnKTtcclxuXHJcbiAgICBiaWRCdXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcclxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc3QgYW1vdW50ID0gcGFyc2VJbnQodGhpcy5kYXRhc2V0LmFtb3VudCk7XHJcbiAgICAgICAgICAgIHBsYWNlQmlkKGFtb3VudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgZnVuY3Rpb24gcGxhY2VCaWQoYW1vdW50KSB7XHJcbiAgICAgICAgc29ja2V0LmVtaXQoJ2JpZCcsIHNvY2tldC5pZCwgYW1vdW50KTtcclxuICAgIH1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/scripts/encherisseur.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/scripts/encherisseur.js"]();
/******/ 	
/******/ })()
;