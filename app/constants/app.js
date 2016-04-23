'use strict'

import React, { Component } from 'react'
import AppSDK from 'dbfm-app-sdk'

import Song from '../components/song'

const sdk = new AppSDK()

let opt = {
  channel_id: '100',
  sid: '1885670',
  pt: '0.5'
}

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      pause: false,
      current: 0,
      songs: [{
        singers: [{ id: '0', name: 'xwartz' }],
        title: 'douban.fm',
        album: '/subject/1458963/',
        url: 'https://xwartz.github.com',
        picture: 'https://img3.doubanio.com/lpic/s7052285.jpg',
        like: false,
        sid: ''
      }]
    }
  }

  updateState (nextState) {
    let newState = Object.assign({}, this.state, nextState)
    this.setState(newState)
  }

  fetchSongs () {
    sdk.songs(opt, (err, songs) => {
      if (err) return console.error(err)

      this.updateState({ pause: false, current: 0, songs })

      console.log(songs)
    })
  }

  componentDidMount () {
    this.fetchSongs()
  }

  pause () {
    this.updateState({ pause: !this.state.pause })
  }

  // play the nth form current song
  _skip (n) {
    const current = this.state.current + n
    let newState = Object.assign({}, this.state, { pause: false }, { current })
    this.updateState(newState)
  }

  skip (n) {
    const { songs, current } = this.state
    if (songs.length <= current + 2) {
      this.updateSongs(this._skip.bind(this, n))
    } else {
      this._skip(n)
    }
  }

  // next
  next () {
    this.skip(1)
  }

  // like this song
  star () {
    let method = 'star'
    const { current, songs } = this.state
    const newSongs = songs.map((song, index) => {
      if (index === current) {
        method = song.like ? 'unstar' : 'star'
        return Object.assign({}, song, { like: !song.like })
      } else {
        return song
      }
    })

    this.operate(method, (songs) => {
      this.updateState({ songs: newSongs })
    })
  }

  // never play again
  never () {
    const { current, songs } = this.state
    this.operate('never_play_again', () => {
      const newSongs = songs.filter((song, index) => index !== current)
      // @todo
      this.state.songs = [...newSongs]
      this.skip(0)
    })
  }

  operate (method, cb) {
    sdk[method]({
      channel_id: opt.channel_id,
      sid: this.state.sid
    }, (err, songs) => {
      if (err) return console.error(err)
      cb && cb(songs)
    })
  }

  updateSongs (cb) {
    this.operate('songs', (songs) => {
      // @todo
      const newSongs = [...this.state.songs, ...songs]
      this.updateState({ songs: newSongs })
      cb && cb()
      console.log(this.state.songs)
    })
  }

  render () {
    let current = this.state.current
    const songs = this.state.songs
    const pause = this.state.pause
    const song = songs[current]
    return (
      <Song song={ song } pause={ pause }
        onPauseClick={ () => { this.pause() } }
        onStarClick={ () => { this.star() } }
        onNextClick={ () => { this.next() } }
        onNeverClick={ () => { this.never() } }
      />
    )
  }
}

export default App
