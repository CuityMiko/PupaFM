import React, { Component } from 'react'
import AppSDK from 'dbfm-app-sdk'

import './index.scss'
import '../../assets/font/iconfont.scss'

import SongTitle from '../title'
import Progress from '../progress'
import Controls from '../controls'
import Cover from '../cover'

const sdk = new AppSDK()

class Song extends Component {

  constructor (props) {
    super(props)
    this.state = { song: {} }
  }

  updateState () {
    sdk.songs({
      channel_id: '123'
    }, (err, songs) => {
      if (err) return console.error(err)

      this.setState({
        song: songs[0]
      })
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

  listenUpdate () {
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
          <Controls />
        </div>
        <Cover {...this.state.song} />
      </div>
    )
  }
}

export default Song
