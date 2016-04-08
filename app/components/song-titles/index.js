import React, { Component } from 'react'

import SongTitle from '../song-title/index'
import SongSubTitle from '../song-title/index'

import 'index.scss'

class SongTitles extends Component {
  render () {
    return (
      <div className='titles'>
        <SongTitle />
        <SongSubTitle />
      </div>
    )
  }
}

export default SongTitles
