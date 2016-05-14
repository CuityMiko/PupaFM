'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { changeChannel } from '../../actions'

import Channel from './item'
import channels from './channels'

import './index.scss'

class Channels extends Component {

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
    const { channelId, changeChannel } = this.props
    const channelNodes = channels.map((channel) => {
      return (
        <Channel { ...channel } key={ channel.id }
          channelId={ channelId }
          channelClick={ () => { changeChannel(channel.id) } }
        />
      )
    })
    return (
      <div className="channels-wrap">
        { this.renderIcon() }
        <span className="channels-title">快捷收听</span>
        <ul className="channels clearfix">
          { channelNodes }
        </ul>
      </div>
    )
  }
}

Channels.propTypes = {
  changeChannel: PropTypes.func.isRequired
}

const mapStateToProps = state => state

const mapDispatchToProps = { changeChannel }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels)
