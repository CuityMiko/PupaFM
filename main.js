'use strict'

const electron = require('electron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow = null

app.on('window-all-closed', () => {
  app.quit()
})

let winProps = {
  width: 800,
  height: 600
}

if (process.env.NODE_ENV !== 'dev') {
  winProps = {
    width: 800,
    height: 350,
    frame: true,
    resizeable: false
  }
}

app.on('ready', () => {
  mainWindow = new BrowserWindow(winProps)

  // mainWindow.loadURL('http://douban.fm')

  mainWindow.loadURL(`file://${__dirname}/index.html`)

  if (process.env.NODE_ENV === 'dev') {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})
