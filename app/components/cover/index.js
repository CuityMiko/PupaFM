import React, { Component } from 'react'

import './index.scss'

const styleCover = {
  width: 206,
  borderRadius: '50%'
}

class Cover extends Component {
  render () {
    return (
      <a className='playing-cover' href={`https://music.douban.com/${this.props.album}`} target='_blank'>
        <img className='cover' style={styleCover} src={this.props.picture} />
      </a>
    )
  }
}

export default Cover
