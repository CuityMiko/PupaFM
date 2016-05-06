'use strict'

import React, { Component, PropTypes } from 'react'

import './index.scss'

class Channel extends Component {

  handleChannel () {
    const { id } = this.props
    this.props.channelClick(id)
  }

  renderIcon () {
    return (
      <svg size="12" version="1.1" color="#5CBC7D" className="icon" viewBox="0,0,12,12" height="12" width="12" >
        <g id="Page-1" stroke="none" stroke-width="1" fill="none">
          <line className="icon-playing-bar1" stroke-width="1" stroke="#5CBC7D" stroke-linecap="round" id="line-1" x1="2" y1="12" x2="2" y2="1"></line>
          <line className="icon-playing-bar2" stroke-width="1" stroke="#5CBC7D" stroke-linecap="round" x1="5" y1="12" x2="5" y2="1"></line>
          <line className="icon-playing-bar3" stroke-width="1" stroke="#5CBC7D" stroke-linecap="round" x1="8" y1="12" x2="8" y2="1"></line>
          <line className="icon-playing-bar4" stroke-width="1" stroke="#5CBC7D" stroke-linecap="round" x1="11" y1="12" x2="11" y2="1"></line>
        </g>
      </svg>
    )
  }

  render () {
    const { id, name, channelId } = this.props
    return (
      <li
        className={ 'channel' + (channelId === id ? ' active' : '') } key={ id }>
        { this.renderIcon() }
        <a href='javascript:;' onClick={ this.handleChannel.bind(this) }>{ name }</a>
      </li>
    )
  }
}

Channel.propTypes = {
  channelClick: PropTypes.func.isRequired
}

export default Channel

