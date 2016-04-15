'use strict'

import React, { Component } from 'react'

import './index.scss'

class SongTitle extends Component {

  handleClick (event) {
    this.props.onPlay()
  }

  render () {
    let singerNodes = this.props.singers.map((singer) => {
      return (
        <a key={singer.id}
           href={`http://douban.fm/artist/${singer.id}`} target='_blank'>
          {singer.name}
        </a>
      )
    })
    return (
      <div className='titles'>
        <div className='title'>
          <a href={`https://music.douban.com${this.props.album}`} target='_blank'>
            {this.props.title}
          </a>
        </div>

        <div className='subtitle'>
          {singerNodes}
          <div className='fr'>
            <span className='time'>{this.props.time}</span>
            <span onClick={this.handleClick.bind(this)}
              className={'iconfont ' + (this.props.pause ? 'icon-play' : 'icon-pause')}>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default SongTitle
