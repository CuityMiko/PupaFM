'use strict'

import React, { Component, PropTypes } from 'react'

import './index.scss'

class Channel extends Component {

  handleChannel () {
    const { id } = this.props
    this.props.channelClick(id)
  }

  render () {
    const { id, name, channelId } = this.props
    return (
      <li
        className={ channelId === id ? 'channel active' : 'channel' }
        key={ id }>
        <span className='c-playing'></span>
        <a href='javascript:;' onClick={ this.handleChannel.bind(this) }>{ name }</a>
      </li>
    )
  }
}

Channel.propTypes = {
  channelClick: PropTypes.func.isRequired
}

export default Channel

