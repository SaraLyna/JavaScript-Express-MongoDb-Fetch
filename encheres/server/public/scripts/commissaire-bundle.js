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

/***/ "./src/scripts/commissaire-priseur.js":
/*!********************************************!*\
  !*** ./src/scripts/commissaire-priseur.js ***!
  \********************************************/
/***/ (() => {

eval("const socket = io();\r\n\r\nsocket.on('connection', () => {\r\n        console.log('Connecté au serveur de sockets en tant que commissaire-priseur');\r\n});\r\n\r\n\r\nfunction start() {\r\n    const item = document.getElementById('objet').value;\r\n    const initialPrice = document.getElementById('prix').value;\r\n    socket.emit('startAuction', item, initialPrice);\r\n}\r\n\r\nfunction end() {\r\n    socket.emit('endAuction');\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2NyaXB0cy9jb21taXNzYWlyZS1wcmlzZXVyLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGllbnQtYXBwLy4vc3JjL3NjcmlwdHMvY29tbWlzc2FpcmUtcHJpc2V1ci5qcz82NDU3Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNvY2tldCA9IGlvKCk7XHJcblxyXG5zb2NrZXQub24oJ2Nvbm5lY3Rpb24nLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Nvbm5lY3TDqSBhdSBzZXJ2ZXVyIGRlIHNvY2tldHMgZW4gdGFudCBxdWUgY29tbWlzc2FpcmUtcHJpc2V1cicpO1xyXG59KTtcclxuXHJcblxyXG5mdW5jdGlvbiBzdGFydCgpIHtcclxuICAgIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb2JqZXQnKS52YWx1ZTtcclxuICAgIGNvbnN0IGluaXRpYWxQcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcml4JykudmFsdWU7XHJcbiAgICBzb2NrZXQuZW1pdCgnc3RhcnRBdWN0aW9uJywgaXRlbSwgaW5pdGlhbFByaWNlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZW5kKCkge1xyXG4gICAgc29ja2V0LmVtaXQoJ2VuZEF1Y3Rpb24nKTtcclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/scripts/commissaire-priseur.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/scripts/commissaire-priseur.js"]();
/******/ 	
/******/ })()
;