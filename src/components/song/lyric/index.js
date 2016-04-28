'use strict'

import React, { Component, PropTypes } from 'react'

import './index.scss'

class Lyric extends Component {

  renderLyric () {
    let { lyric, time } = this.props
    lyric = lyric || []

    let ldiv
    let len = lyric.length
    let cLine = 0

    if (len) {
      for (let i = 0; i < len; i++) {
        if (time < lyric[i].time) {
          cLine = i === 0 ? 0 : i - 1
          break
        }
      }

      let lyricNodes = lyric.map((l, index) => {
        return <p key={ index }
          className={ cLine === index ? 'on' : '' }>{ l.text }</p>
      })

      ldiv = <div className="ps-container">{ lyricNodes }</div>
    } else {
      ldiv = <div className="no-lyric">暂无歌词</div>
    }

    return ldiv
  }

  render () {
    const { closeLyric, isShowLyric } = this.props

    return (
      <div className={ isShowLyric ? 'playing-lyric' : 'hide' }>
        <div className="lyric">
          { this.renderLyric() }
        </div>
        <div className="lyric-toolbar">
          <a href="javascript:;" onClick={ () => closeLyric() } >关闭歌词</a>
        </div>
      </div>
    )
  }
}

Lyric.propTypes = {
  closeLyric: PropTypes.func.isRequired
}

export default Lyric
