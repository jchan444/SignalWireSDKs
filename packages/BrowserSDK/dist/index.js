"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import WebSocket from 'websocket'
const moment_1 = __importDefault(require("moment"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Ws = require('websocket').w3cwebsocket;
const ws = new Ws('wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self');
const messages = [];
let list;
// Error handler to catch any error connecting to websocket address
ws.onopen = () => {
    console.log('W3c Websocket connection established!');
};
ws.onerror = (event) => {
    console.log(event);
};
ws.onclose = () => {
    console.log('Websocket closed!');
};
ws.onmessage = (message) => {
    createMessageObj(message.data);
    displayMessages(messages);
    console.log(message.data);
};
// call back function to print out current time whenever receive and send are called
const getTime = () => {
    const dateNow = (0, moment_1.default)().format('L');
    const timeNow = (0, moment_1.default)().format('LTS');
    return dateNow + ' ' + timeNow;
};
const createMessageObj = (message) => {
    const dateNow = getTime();
    const idx = Date.now();
    const entryMessage = {
        content: message,
        id: idx,
        sentAt: dateNow
    };
    messages.push(entryMessage);
};
// send function that will send message defined by the user
const send = (message) => {
    createMessageObj(message);
    ws.send(message);
    displayMessages(messages);
};
// disconnect function
const disconnect = () => {
    ws.close();
};
const displayMessages = (messages) => {
    list = messages.map((entry) => {
        return `<li date='${entry.sentAt}'>${entry.sentAt}: ${entry.content}</li>`;
    });
};
module.exports = { send, disconnect, messages };
