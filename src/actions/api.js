import WebSDK from 'doubanfm-sdk'

const wsdk = new WebSDK()

export function operate (method, opt, cb) {
  wsdk[method](opt, (err, data) => {
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
