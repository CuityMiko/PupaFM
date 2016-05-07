'use strict'

import React, { Component, PropTypes } from 'react'
import Channel from './item'

import './index.scss'

const channels = [{
  id: 0,
  name: '我的私人兆赫'
}, {
  id: -10,
  name: '豆瓣精选兆赫'
}]

class Channels extends Component {

  handleChannel (id) {
    this.props.onChannel(id)
  }

  render () {
    const { channelId } = this.props
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
  onChannel: PropTypes.func.isRequired
}

export default Channels

