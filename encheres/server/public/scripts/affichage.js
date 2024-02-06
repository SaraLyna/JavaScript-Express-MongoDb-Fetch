const socket = io();
socket.emit("encheres");
socket.on("début", () => console.log("début"));


const handleSubmit = (event) => {
    const formElements = document.querySelectorAll('.newsletter-form input');
    const name = Array.from(formElements).filter(element => element.name)[0];
    Cookies.set("connect", "name");
    console.log(name);
}
