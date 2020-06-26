import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import serve from './serve'
import ConsoleWorkspace from './api/workspace/ConsoleWorkspace'
import ConsoleChannel from './api/channel/ConsoleChannel'
import LocalFileStore from './api/storage/LocalFileStore'

ConsoleWorkspace.LocalFileStore = LocalFileStore
ConsoleChannel.LocalFileStore = LocalFileStore

app.allowRendererProcessReuse = true

if (!app.isPackaged) {
  require('electron-reloader')(module, { ignore: ['packages'] })
}

const loadURL = serve({ directory: path.resolve(__dirname, '..', 'renderer') })

async function requestWithApi({ url, method, body }) {
  const workspace = ConsoleWorkspace.getWorkspace(body)
  const workspaceConfig = await workspace.getClientConfig(body)
  return {
    ok: true,
    status: 200,
    body: {
      workspaceConfig,
    },
  }
}

async function init() {
  await app.whenReady()

  ipcMain.on('rco.request', async (event, messageId, request) => {
    const response = await requestWithApi(request)
    event.reply('rco.response', messageId, response)
  })

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    backgroundColor: '#14191e',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.resolve(__dirname, 'preload.js'),
    },
  })

  await loadURL(mainWindow)
}

init()

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit()
})
