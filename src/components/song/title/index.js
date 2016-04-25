'use strict'

import React, { Component, PropTypes } from 'react'

import './index.scss'

class SongTitle extends Component {

  render () {
    const { onPause, singers, album, title, time, pause } = this.props

    let singerNodes = singers.map((singer) => {
      return (
        <a key={ singer.id }
           href={ `http://douban.fm/artist/${singer.id}` } target='_blank'>
          { singer.name }
        </a>
      )
    })

    return (
      <div className='titles'>
        <div className='title'>
          <a href={ `https://music.douban.com${album}` } target='_blank'>
            { title }
          </a>
        </div>

        <div className='subtitle'>
          { singerNodes }
          <div className='fr'>
            <span className='time'>{ time }</span>
            <span onClick={ () => { onPause() } }
              className={ 'iconfont ' + (pause ? 'icon-play' : 'icon-pause') }>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

SongTitle.propTypes = {
  onPause: PropTypes.func.isRequired,
  singers: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  album: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  pause: PropTypes.bool.isRequired
}

export default SongTitle
