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

eval("const socket = io();\r\nsocket.on('connection', () => {\r\n        console.log('Connecté au serveur de sockets en tant qu\\'enchérisseur');\r\n});\r\n\r\n\r\nsocket.on('startAuction', (item, initialPrice) => {\r\n    console.log(`Les enchères pour ${item} ont commencé avec un prix de départ de ${initialPrice}€`);\r\n});\r\n\r\nsocket.on('bid', (bidderId, amount) => {\r\n    console.log(`Nouvelle enchère de ${amount}€ de la part de l'enchérisseur ${bidderId}`);\r\n});\r\n\r\nsocket.on('endAuction', () => {\r\n    console.log('La vente aux enchères est terminée');\r\n});\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2NyaXB0cy9lbmNoZXJpc3NldXIuanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxNQUFNLHlDQUF5QyxhQUFhO0FBQ2pHLENBQUM7QUFDRDtBQUNBO0FBQ0EsdUNBQXVDLE9BQU8saUNBQWlDLFNBQVM7QUFDeEYsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGllbnQtYXBwLy4vc3JjL3NjcmlwdHMvZW5jaGVyaXNzZXVyLmpzP2ZmN2EiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc29ja2V0ID0gaW8oKTtcclxuc29ja2V0Lm9uKCdjb25uZWN0aW9uJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdDb25uZWN0w6kgYXUgc2VydmV1ciBkZSBzb2NrZXRzIGVuIHRhbnQgcXVcXCdlbmNow6lyaXNzZXVyJyk7XHJcbn0pO1xyXG5cclxuXHJcbnNvY2tldC5vbignc3RhcnRBdWN0aW9uJywgKGl0ZW0sIGluaXRpYWxQcmljZSkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coYExlcyBlbmNow6hyZXMgcG91ciAke2l0ZW19IG9udCBjb21tZW5jw6kgYXZlYyB1biBwcml4IGRlIGTDqXBhcnQgZGUgJHtpbml0aWFsUHJpY2V94oKsYCk7XHJcbn0pO1xyXG5cclxuc29ja2V0Lm9uKCdiaWQnLCAoYmlkZGVySWQsIGFtb3VudCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coYE5vdXZlbGxlIGVuY2jDqHJlIGRlICR7YW1vdW50feKCrCBkZSBsYSBwYXJ0IGRlIGwnZW5jaMOpcmlzc2V1ciAke2JpZGRlcklkfWApO1xyXG59KTtcclxuXHJcbnNvY2tldC5vbignZW5kQXVjdGlvbicsICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdMYSB2ZW50ZSBhdXggZW5jaMOocmVzIGVzdCB0ZXJtaW7DqWUnKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/scripts/encherisseur.js\n");

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