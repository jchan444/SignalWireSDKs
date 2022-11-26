import fs from 'fs'
import moment from 'moment'
// import WebSocket from 'websocket'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const WebSocket = require('websocket').client

const ws = new WebSocket()

interface Message {
  type: string
  utf8Data: string
}

console.log('from package')

// Error handler to catch any error connecting to websocket address
ws.on('connectFailed', (error: string) => {
  console.log('Connection Error: ' + error)
})

// on event to make sure the websocket is open before executing functions
// error handling, close message, open message, onmessage functions
ws.on('connect', (connection: any) => {
  console.log('WebSocket client connection established!')

  connection.on('error', (error: string) => {
    console.log('Connection error: ' + error)
  })

  connection.on('close', () => {
    console.log('Connection closed!')
  })

  connection.on('message', (message: Message) => {
    // logs into log.txt as a message that was received.
    fs.appendFile('log.txt', `\n${getTime()} RECV: ${message.utf8Data}`, (err) => {
      if (err !== null) {
        console.log(err)
      } else {
        console.log(`${getTime()} RECV: ${message.utf8Data}`)
      }
    })
  })
})

ws.connect('wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self')

// call back function to print out current time whenever receive and send are called
const getTime = (): string => {
  const dateNow: string = moment().format('L')
  const timeNow: string = moment().format('LTS')
  return dateNow + ' ' + timeNow
}

// send function that will send message defined by the user
export const send = (message: string): void => {
  ws.on('connect', (connection: any) => {
    if (connection.connected !== undefined) {
      connection.sendUTF(message)
    } else console.log('Not connected to WebSocket Server')
  })

  // file write using fs library
  fs.appendFile('log.txt', `\n${getTime()} SEND: ${message}`, (err) => {
    if (err !== null) {
      console.log(err)
    } else {
      console.log(`${getTime()} SEND: ${message}`)
    }
  })
}
// disconnect function
export const disconnect = (): void => {
  ws.on('connect', (connection: any) => {
    if (connection.connected !== undefined) {
      connection.close()
    }
  })
}

export default { send, disconnect }
