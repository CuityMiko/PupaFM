import WebSDK from 'dbfm-web-sdk'
import AppSDK from 'dbfm-app-sdk'

const sdk = new AppSDK()
const wsdk = new WebSDK()

export function operate (method, opt, cb) {
  sdk[method](opt, (err, data) => {
    if (err) return console.error(err)
    cb && cb(data)
  })
}

export function webOperate (method, opt, cb) {
  wsdk[method](opt, (err, data) => {
    if (err) return console.error(err)
    cb && cb(data)
  })
}
