import React, { Component } from 'react'

import './index.scss'

class SongTitle extends Component {
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
            <span className='time'>{this.props.length}</span>
            <span className="iconfont icon-pause"></span>
          </div>
        </div>
      </div>
    )
  }
}

export default SongTitle
