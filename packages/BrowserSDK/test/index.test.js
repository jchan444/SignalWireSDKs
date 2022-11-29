const fs = require('fs')
const path = require('path')
const browserSdk = require('../index.ts')
const Ws = require('websocket').w3cwebsocket

describe('Websocket Connection', () => {
  afterEach(() => {
    ws.close()
  })

  test('connection error', (done) => {
    const ws = new Ws('wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1')
    ws.onerror = () => {
      done()
    }
  })

  test('connection successful', (done) => {
    const ws = new Ws('wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self')
    ws.onopen = () => {
      done()
    }
  })

  test('connection close', (done) => {
    const ws = new Ws('wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self')
    ws.close()
    ws.onclose = () => {
      done()
    }
  })
})
