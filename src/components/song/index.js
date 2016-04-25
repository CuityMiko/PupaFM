'use strict'

import React, { Component, PropTypes } from 'react'

import './index.scss'
import '../../assets/font/iconfont.scss'

import SongTitle from '../title'
import Progress from '../progress'
import Controls from '../controls'
import Cover from '../cover'

class Song extends Component {

  constructor (props) {
    super(props)
    this.state = {
      time: '0.00',
      percent: '0%'
    }
  }

  updateState (props) {
    const nState = Object.assign({}, this.state, props)
    this.setState(nState)
  }

  componentDidMount () {
    this.listenUpdate()
  }

  pauseSong () {
    this.refs.player.pause()
  }

  playSong () {
    this.refs.player.play()
  }

  handlePause () {
    this.props.pause ? this.playSong() : this.pauseSong()
    this.props.onPauseClick()
  }

  handleNext () {
    this.props.onNextClick()
  }

  handleStar () {
    this.props.onStarClick()
  }

  handleNever () {
    this.props.onNeverClick()
  }

  listenUpdate () {
    // 监听时间更新
    this.refs.player.addEventListener('timeupdate', () => {
      let pt = this.refs.player.currentTime
      let dt = this.refs.player.duration

      this.updateState({
        percent: pt / dt * 100 + '%',
        time: this.formatTime(pt)
      })
    })

    // 监听播放结束
    this.refs.player.addEventListener('ended', () => {
      this.handleNext()
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
    const { song, pause } = this.props
    return (
      <div className="fullplayer">
        <div className="playing-info">

          <audio ref='player' src={ song.url } preload autoPlay />

          <SongTitle { ...song } time={ this.state.time } pause={ pause }
            onPause={ () => { this.handlePause() } }
          />

          <Progress percent={ this.state.percent } />

          <div className="below-progress"></div>

          <Controls { ...song }
            onNext={ () => { this.handleNext() } }
            onStar={ () => { this.handleStar() } }
            onTrash={ () => { this.handleNever() } }
          />

        </div>

        <Cover { ...song } />

      </div>
    )
  }
}

Song.propTypes = {
  song: PropTypes.object.isRequired,
  onNextClick: PropTypes.func.isRequired,
  onStarClick: PropTypes.func.isRequired,
  onPauseClick: PropTypes.func.isRequired,
  onNeverClick: PropTypes.func.isRequired
}

export default Song
