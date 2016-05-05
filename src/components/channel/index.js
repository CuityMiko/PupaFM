'use strict'

import React, { Component, PropTypes } from 'react'
import Channel from './item'

import './index.scss'

class Channels extends Component {

  handleChannel (id) {
    this.props.onChannel(id)
  }

  render () {
    const { channels, channelId } = this.props
    const channelNodes = channels.map((channel) => {
      return (
        <Channel { ...channel } key={ channel.id }
          channelId={ channelId }
          channelClick={ this.handleChannel.bind(this) }
        />
      )
    })
    return (
      <ul className="channels">
        { channelNodes }
      </ul>
    )
  }
}

Channels.propTypes = {
  onChannel: PropTypes.func.isRequired,
  channels: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
}

export default Channels

