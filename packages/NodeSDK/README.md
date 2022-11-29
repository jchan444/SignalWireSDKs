# SignalWire Node.js SDK
This WebSocket SDK for Node.js enables Node.js developers to connect to a Websocket Server (https://www.piesocket.com/websocket-tester) send messages, and receive them which will log each message in a log.txt in the root project folder. This server will echo the sent message back.

## Getting Started
Run 'npm i signalwire-node-sdk' to get the latest version of the package.

## Developers
There are currently two methods that you can use - 

send(message: string);
    Sends the string message to the WebSocket server and records the entry with date and time in log.txt at root folder

disconnect();
    Cleanly disconnects from the WebSocket Server

While connected to the server - Event handler for incoming messages will automatically append the message with date and time in log.txt

**Note - You may run into unsolicited incoming messages from the WebSocket Server as it is a shared open resource and many developers are given the same API key.

## License

This is a free software and may be redistributed under the terms specified in the MIT-LICENSE file.