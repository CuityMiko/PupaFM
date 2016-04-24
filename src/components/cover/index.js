'use strict'

import React, { Component, PropTypes } from 'react'

import './index.scss'

const styleCover = {
  width: 206,
  borderRadius: '50%'
}

class Cover extends Component {
  render () {
    const { picture, album } = this.props

    return (
      <a className='playing-cover' href={`https://music.douban.com${album}`} target='_blank'>
        <img className='cover' style={styleCover} src={picture} />
      </a>
    )
  }
}

Cover.propTypes = {
  picture: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired
}

export default Cover
