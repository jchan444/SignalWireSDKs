// import WebSocket from 'websocket'
const moment = require('moment')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Ws = require('websocket').w3cwebsocket

const ws = new Ws('wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self')

interface Entry {
  content: string
  id: Number
  sentAt: string
}

const messages: Entry[] = []

// websocket methods to let user know of major events
ws.onopen = () => {
  console.log('W3c Websocket connection established!')
}

ws.onerror = (event: Error) => {
  console.log(event)
}

ws.onclose = () => {
  console.log('Websocket closed!')
}
// will create and object, update the 'database'
ws.onmessage = (message: { data: string }) => {
  createMessageObj(message.data)
  console.log(message.data)
}

// call back function to print out current time whenever receive and send are called
const getTime = (): string => {
  const dateNow: string = moment().format('L')
  const timeNow: string = moment().format('LTS')
  return dateNow + ' ' + timeNow
}

// callback function to contruct the object for database storage
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
const send = async (message: string): Promise<void> => {
  createMessageObj(message)
  await ws.send(message)
  displayMessages(messages)
}
// disconnect function
const disconnect = (): void => {
  ws.close()
}

// function that contructs list item strings.
const displayMessages = (messages: Entry[]): string[] => {
  const list = messages.map((entry: Entry) => {
    return `<li date='${entry.sentAt}'>${entry.sentAt}: ${entry.content}</li>`
  })

  return list
}

module.exports = { send, disconnect, messages, displayMessages }
