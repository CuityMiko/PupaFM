'use strict'

import os from 'os'
import webpack from 'webpack'
import packager from 'electron-packager'
import del from 'del'
import { exec } from 'child_process'
import parseArgs from 'minimist'

import electronCfg from './webpack.config.electron'
import proCfg from './webpack.config.pro'
import pkg from './package'

const argv = parseArgs(process.argv.slice(2))

// const deps = Object.keys(pkg.dependencies)
// const devDeps = Object.keys(pkg.devDependencies)

const appName = argv.name || argv.n || pkg.productName
const shouldUseAsar = argv.asar || argv.a || false
const shouldBuildAll = argv.all || false

const DEFAULT_OPTS = {
  dir: './',
  name: appName,
  asar: shouldUseAsar,
  ignore: [
    '/test($|/)',
    '/tools($|/)',
    '/release($|/)',
    '/main.dev.js',
    'webpack.config.*',
    'screen.png',
    '/node_modules/',
    '/app/'
  ]
  // .concat(devDeps.map((name) => `/node_modules/${name}($|/)`))
  // .concat(
  //   deps.filter((name) => !electronCfg.externals.includes(name))
  //     .map((name) => `/node_modules/${name}($|/)`)
  // )
}

const icon = argv.icon || argv.i || 'icons/logo'

if (icon) {
  DEFAULT_OPTS.icon = icon
}

const version = argv.version || argv.v

if (version) {
  DEFAULT_OPTS.version = version
  startPack()
} else {
  // use the same version as the currently-installed electron-prebuilt
  exec('npm list electron-prebuilt --dev', (err, stdout) => {
    if (err) {
      DEFAULT_OPTS.version = '0.37.6'
    } else {
      DEFAULT_OPTS.version = stdout.split('electron-prebuilt@')[1].replace(/\s/g, '')
    }
    startPack()
  })
}

function build (cfg) {
  return new Promise((resolve, reject) => {
    webpack(cfg, (err, stats) => {
      if (err) return reject(err)
      resolve(stats)
    })
  })
}

function startPack () {
  console.log('start pack...')
  build(electronCfg)
    .then(() => build(proCfg))
    .then(() => del('release/**', { force: true }))
    .then((paths) => {
      if (shouldBuildAll) {
        // build for all platforms
        const archs = ['ia32', 'x64']
        const platforms = ['linux', 'win32', 'darwin']

        platforms.forEach((plat) => {
          archs.forEach((arch) => {
            pack(plat, arch, log(plat, arch))
          })
        })
      } else {
        // build for current platform only
        pack(os.platform(), os.arch(), log(os.platform(), os.arch()))
      }
    })
    .catch((err) => {
      console.error(err)
    })
}

function pack (plat, arch, cb) {
  // there is no darwin ia32 electron
  if (plat === 'darwin' && arch === 'ia32') return

  const iconObj = {
    icon: DEFAULT_OPTS.icon + (() => {
      let extension = '.png'
      if (plat === 'darwin') {
        extension = '.icns'
      } else if (plat === 'win32') {
        extension = '.ico'
      }
      return extension
    })()
  }

  const opts = Object.assign({}, DEFAULT_OPTS, iconObj, {
    platform: plat,
    arch,
    prune: true,
    'app-version': pkg.version || DEFAULT_OPTS.version,
    out: `release/${plat}-${arch}`
  })

  packager(opts, cb)
}

function log (plat, arch) {
  return (err, filepath) => {
    if (err) return console.error(err)
    console.log(`${plat}-${arch} finished!`)
  }
}
