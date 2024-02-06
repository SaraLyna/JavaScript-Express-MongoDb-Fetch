const socket = io();
socket.emit("encheres");
socket.on("début", () => console.log("début"));
