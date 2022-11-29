"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import WebSocket from 'websocket'
const moment = require('moment');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Ws = require('websocket').w3cwebsocket;
const ws = new Ws('wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self');
const messages = [];
// websocket methods to let user know of major events
ws.onopen = () => {
    console.log('W3c Websocket connection established!');
};
ws.onerror = (event) => {
    console.log(event);
};
ws.onclose = () => {
    console.log('Websocket closed!');
};
// will create and object, update the 'database'
ws.onmessage = (message) => {
    createMessageObj(message.data);
    console.log(message.data);
};
// call back function to print out current time whenever receive and send are called
const getTime = () => {
    const dateNow = moment().format('L');
    const timeNow = moment().format('LTS');
    return dateNow + ' ' + timeNow;
};
// callback function to contruct the object for database storage
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
const send = (message) => __awaiter(void 0, void 0, void 0, function* () {
    createMessageObj(message);
    yield ws.send(message);
    displayMessages(messages);
});
// disconnect function
const disconnect = () => {
    ws.close();
};
// function that contructs list item strings.
const displayMessages = (messages) => {
    const list = messages.map((entry) => {
        return `<li date='${entry.sentAt}'>${entry.sentAt}: ${entry.content}</li>`;
    });
    return list;
};
module.exports = { send, disconnect, messages, displayMessages, createMessageObj };
