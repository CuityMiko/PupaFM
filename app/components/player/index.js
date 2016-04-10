import React, { Component } from 'react'

import './index.scss'

class Player extends Component {

  render () {
    return (
      <audio src={this.props.url}
      preload autoPlay />
    )
  }
}

export default Player
