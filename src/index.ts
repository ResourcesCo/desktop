import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import serve from 'electron-serve'

app.allowRendererProcessReuse = true

if (!app.isPackaged) {
  require('electron-reloader')(module, { ignore: ['packages'] })
}

const loadURL = serve({ directory: path.resolve(__dirname, '..', 'renderer') })

async function init() {
  await app.whenReady()

  ipcMain.on('rco.request', (event, messageId, request) => {
    const response = { text: 'somethingFromNode' }
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
