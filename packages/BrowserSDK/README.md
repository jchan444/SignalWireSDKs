# SignalWire Node.js SDK
This WebSocket SDK for browser enables Node.js developers to connect to a Websocket Server (https://www.piesocket.com/websocket-tester) send messages, and receive them which will then allow the developer to display them on directly on the browser

## Getting Started
Run 'npm i signalwire-node-sdk' to get the latest version of the package.

## Developers
There are currently two methods that you can use - 

send(message: string)
    Sends the string message to the WebSocket server and records the entry within a messages array

displayMessages(messages: [])
    Creates a list using <li> tag for each element in the messages array

disconnect()
    Cleanly disconnects from the WebSocket Server

**Note - You may run into unsolicited incoming messages from the WebSocket Server as it is a shared open resource and many developers are given the same API key.

## License

This is a free software and may be redistributed under the terms specified in the MIT-LICENSE file.
