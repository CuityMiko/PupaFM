import React, { Component } from 'react'

import 'index.scss'

class SongTitle extends Component {
  render() {
    return (
      <div className='titles'>
        <div className='title'>
          <a href={this.this.props.songUrl}>{this.props.songTitle}</a>
        </div>
      </div>
    )
  }
}

export default SongTitle