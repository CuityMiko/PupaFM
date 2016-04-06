import React, { Component } from 'react'

class SongSubTitle extends Component {
  render() {
    return (
      <div className='subtitle'>
        <a href={this.this.props.songUrl}>{this.props.songSubTitle}</a>
        <div className='fr'>
          <span className="time"></span>
        </div>
      </div>
    )
  }
}

export default SongSubTitle