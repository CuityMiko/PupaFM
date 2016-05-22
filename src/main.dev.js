'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'

let mainWindow = null

app.on('window-all-closed', () => {
  app.quit()
})

let winProps = {
  width: 1000,
  height: 800,
  titleBarStyle: 'hidden-inset'
}

if (process.env.NODE_ENV !== 'development') {
  winProps = {
    width: 800,
    height: 435,
    frame: true,
    resizeable: false,
    titleBarStyle: 'hidden-inset'
  }
}

app.on('ready', () => {
  mainWindow = new BrowserWindow(winProps)

  mainWindow.loadURL(`file://${__dirname}/index.html`)

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})

ipcMain.on('showWindow', (event, data) => {
  mainWindow.show()
})
