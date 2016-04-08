'use strict'

const AppSDK = require('dbfm-app-sdk')

const sdk = new AppSDK()

sdk.songs({
  channel_id: '123'
}, (err, songs) => {
  if (err) {
    console.log(err)
  }
  console.log(songs)
})

console.log('hello s')
