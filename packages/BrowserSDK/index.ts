// import WebSocket from 'websocket'
import moment from 'moment'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Ws = require('websocket').w3cwebsocket

const ws = new Ws('wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self')

interface Entry {
  content: string
  id: Number
  sentAt: string
}

const messages: Entry[] = []
let list: string[]

// Error handler to catch any error connecting to websocket address

ws.onopen = () => {
  console.log('W3c Websocket connection established!')
}

ws.onerror = (event: Error) => {
  console.log(event)
}

ws.onclose = () => {
  console.log('Websocket closed!')
}

ws.onmessage = (message: { data: string }) => {
  createMessageObj(message.data)
  displayMessages(messages)
  console.log(message.data)
}

// call back function to print out current time whenever receive and send are called
const getTime = (): string => {
  const dateNow: string = moment().format('L')
  const timeNow: string = moment().format('LTS')
  return dateNow + ' ' + timeNow
}

const createMessageObj = (message: string): void => {
  const dateNow: string = getTime()
  const idx: number = Date.now()

  const entryMessage: Entry = {
    content: message,
    id: idx,
    sentAt: dateNow
  }

  messages.push(entryMessage)
}

// send function that will send message defined by the user
const send = (message: string): void => {
  createMessageObj(message)
  ws.send(message)
  displayMessages(messages)
}
// disconnect function
const disconnect = (): void => {
  ws.close()
}

const displayMessages = (messages: Entry[]): void => {
  list = messages.map((entry: Entry) => {
    return `<li date='${entry.sentAt}'>${entry.sentAt}: ${entry.content}</li>`
  })
}

module.exports = { send, disconnect, messages }
