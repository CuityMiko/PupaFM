import React, { Component } from 'react'

import './index.scss'

class SongTitle extends Component {

  handleClick (event) {
    let cn = event.target.className
    let isPause = false

    if (/icon-pause/.test(cn)) {
      event.target.className = 'iconfont icon-play'
      isPause = true
    } else {
      event.target.className = 'iconfont icon-pause'
    }
    this.props.onPlay(isPause)
  }

  render () {
    return (
      <div className='titles'>
        <div className='title'>
          <a href={this.props.url}>{this.props.title}</a>
        </div>

        <div className='subtitle'>
          <a href={`https://music.douban.com/${this.props.album}`} target='_blank'>
            {this.props.albumtitle}
          </a>
          <div className='fr'>
            <span className='time'>{this.props.time}</span>
            <span onClick={this.handleClick.bind(this)} className="iconfont icon-pause"></span>
          </div>
        </div>
      </div>
    )
  }
}

export default SongTitle
