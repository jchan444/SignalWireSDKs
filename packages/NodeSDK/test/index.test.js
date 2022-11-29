const fs = require('fs')
const { describe, default: test } = require('node:test')
const path = require('path')
const nodeSDK = require('../index.ts')
const WebSocket = require('websocket').client
const ws = new WebSocket()

const testLogFile = path.resolve(__dirname, './testLogFile.txt')

describe('Websocket Connection', () => {
  afterEach(() => {
    ws.on('connect', (connection) => {
      if (connection.connected !== undefined) {
        connection.close()
      }
    })
  })

  test('connection error', (done) => {
    ws.connect('wss://demo.piesocket.com/v3/channel_123?api_ey=VCXCEuvhGBDP7hiJJUDvR1e1D3eiVjgZ9VRiaV&notify_sel')
    ws.on('connectFailed', () => {
      done()
    })
  })

  test('connection successful', (done) => {
    ws.connect('wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self')
    ws.on('connect', () => {
      done()
    })
  })

  test('connection close', (done) => {
    ws.connect('wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self')
    ws.on('connect', (connection) => {
      if (connection.connected !== undefined) {
        connection.close()
        done()
      }
    })
  })
})

describe('functional tests', () => {
  test('send message', () => {
    nodeSDK.send('Turkey')
    ws.on('connect', (connection) => {
      connection.on('message', (message) => {
        const receive = message.utf8Data
        expect(receive).toEqual('Turkey')
      })
    })
  })
})

describe('log.txt tests', () => {
  beforeAll((done) => {
    fs.writeFile(testLogFile, JSON.stringify([]), () => {
      done()
    })
  })

  afterAll((done) => {
    fs.writeFile(testLogFile, JSON.stringify([]), () => {
      done()
    })
  })
})
