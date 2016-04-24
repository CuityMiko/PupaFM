import AppSDK from 'dbfm-app-sdk'
const sdk = new AppSDK()

export default function operate (method, opt, cb) {
  sdk[method](opt, (err, songs) => {
    if (err) return console.error(err)
    cb && cb(songs)
  })
}

