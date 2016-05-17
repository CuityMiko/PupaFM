'use strict'

import { app, BrowserWindow } from 'electron'

let mainWindow = null

app.on('window-all-closed', () => {
  app.quit()
})

let winProps = {
  width: 1000,
  height: 800
}

if (process.env.NODE_ENV !== 'development') {
  winProps = {
    width: 800,
    height: 435,
    frame: true,
    resizeable: false
  }
}

app.on('ready', () => {
  mainWindow = new BrowserWindow(winProps)

  // mainWindow.loadURL('http://douban.fm')

  mainWindow.loadURL(`file://${__dirname}/index.html`)

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})
