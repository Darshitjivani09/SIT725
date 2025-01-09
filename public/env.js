// connect to the socket
let socket = io();
socket.on('number', (msg) => {
console.log('Random Number is: ' + msg*msg);
})