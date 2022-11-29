"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.send = void 0;
const fs_1 = __importDefault(require("fs"));
const moment_1 = __importDefault(require("moment"));
// import WebSocket from 'websocket'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const WebSocket = require('websocket').client;
const ws = new WebSocket();
// Error handler to catch any error connecting to websocket address
ws.on('connectFailed', (error) => {
    console.log('Connection Error: ' + error);
});
// on event to make sure the websocket is open before executing functions
// error handling, close message, open message, onmessage functions
ws.on('connect', (connection) => {
    console.log('WebSocket client connection established!');
    connection.on('error', (error) => {
        console.log('Connection error: ' + error);
    });
    connection.on('close', () => {
        console.log('Connection closed!');
    });
    connection.on('message', (message) => {
        // logs into log.txt as a message that was received.
        fs_1.default.appendFile('log.txt', `\n${getTime()} RECV: ${message.utf8Data}`, (err) => {
            if (err !== null) {
                console.log(err);
            }
            else {
                console.log(`${getTime()} RECV: ${message.utf8Data}`);
            }
        });
    });
});
// call back function to print out current time whenever receive and send are called
const getTime = () => {
    const dateNow = (0, moment_1.default)().format('L');
    const timeNow = (0, moment_1.default)().format('LTS');
    return dateNow + ' ' + timeNow;
};
// send function that will send message defined by the user
const send = (message) => {
    ws.on('connect', (connection) => {
        if (connection.connected !== undefined) {
            connection.sendUTF(message);
        }
        else
            console.log('Not connected to WebSocket Server');
    });
    // file write using fs library
    fs_1.default.appendFile('log.txt', `\n${getTime()} SEND: ${message}`, (err) => {
        if (err !== null) {
            console.log(err);
        }
        else {
            console.log(`${getTime()} SEND: ${message}`);
        }
    });
};
exports.send = send;
// disconnect function
const disconnect = () => {
    ws.on('connect', (connection) => {
        if (connection.connected !== undefined) {
            connection.close();
        }
    });
};
exports.disconnect = disconnect;
exports.default = { send: exports.send, disconnect: exports.disconnect };
