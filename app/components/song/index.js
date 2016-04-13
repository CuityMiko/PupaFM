import React, { Component } from 'react'
import AppSDK from 'dbfm-app-sdk'

import './index.scss'
import '../../assets/font/iconfont.scss'

import SongTitle from '../title'
import Progress from '../progress'
import Controls from '../controls'
import Cover from '../cover'

const sdk = new AppSDK()

let channelId = 123

class Song extends Component {

  constructor (props) {
    super(props)
    this.songs = []
    this.index = 0
    this.state = { song: {} }
  }

  updateState () {
    sdk.songs({
      channel_id: channelId
    }, (err, songs) => {
      if (err) return console.error(err)

      this.setState({
        song: songs[0]
      })

      this.songs = songs
      this.index = 0

      console.log(songs)
    })
  }

  componentDidMount () {
    this.updateState()
    this.listenUpdate()
  }

  pause () {
    this.refs.play.pause()
  }

  play () {
    this.refs.play.play()
  }

  handlePlay (pause) {
    pause ? this.pause() : this.play()
  }

  // next
  skip () {
    this.index += 1
    this.setState({
      song: this.songs[this.index]
    })

    this.updateSong()
  }

  updateSong () {
    if (this.songs.length <= this.index + 1) {
      sdk.songs({
        channel_id: channelId,
        sid: this.state.song.sid
      }, (err, songs) => {
        if (err) return console.error(err)
        this.songs = this.songs.concat(songs)
      })
    }
  }

  listenUpdate () {
    // 监听时间更新
    this.refs.play.addEventListener('timeupdate', () => {
      let pt = this.refs.play.currentTime
      let dt = this.refs.play.duration

      this.setState({
        play: {
          percent: pt / dt * 100 + '%',
          time: this.formatTime(pt)
        }
      })
    })

    // 监听播放结束
    this.refs.play.addEventListener('ended', () => {
      this.skip()
    })
  }

  // 格式化时间
  formatTime (n) {
    var m = Math.floor(n / 60)
    var s = Math.ceil(n % 60)
    m = m < 10 ? '0' + m : m
    s = s < 10 ? '0' + s : s
    return m + ':' + s
  }

  render () {
    return (
      <div className="fullplayer">
        <div className="playing-info">
          <audio ref='play' src={this.state.song.url} preload autoPlay />
          <SongTitle {...this.state.song} {...this.state.play} onPlay={(pause) => { this.handlePlay(pause) }} />
          <Progress {...this.state.song} {...this.state.play} />
          <div className="below-progress"></div>
          <Controls onSkip={() => { this.skip() }} />
        </div>
        <Cover {...this.state.song} />
      </div>
    )
  }
}

export default Song
