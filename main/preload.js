const { contextBridge, ipcRenderer } = require('electron')
let currentMessageId = 0

const openRequests = {}

const handleRequest = request => {
  const messageId = currentMessageId++
  const promise = new Promise((resolve, reject) => {
    openRequests[messageId] = [resolve, reject]
  })
  ipcRenderer.send('rco.request', messageId, request)
  return promise
}

ipcRenderer.on('rco.response', (event, messageId, response) => {
  const [resolve, reject] = openRequests[messageId]
  delete openRequests[messageId]
  resolve(response)
})

const rco = {
  async request(request) {
    let requestData
    try {
      requestData = JSON.parse(JSON.stringify(request))
    } catch (err) {
      return { error: 'Error parsing request' }
    }

    let response
    try {
      response = await handleRequest(requestData)
    } catch (err) {
      return { error: `Error handling request: ${err}` }
    }
    let responseData
    try {
      responseData = JSON.parse(JSON.stringify(response))
    } catch (err) {
      return { error: 'Error parsing response' }
    }
    return responseData
  },
}

contextBridge.exposeInMainWorld('rco', rco)
