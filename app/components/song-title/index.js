import React, { Component } from 'react'

class SongTitle extends Component {
  render () {
    return (
      <div className='titles'>
        <div className='title'>
          <a href={this.props.songUrl}>{this.props.songTitle}</a>
        </div>
      </div>
    )
  }
}

export default SongTitle
