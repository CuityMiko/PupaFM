'use strict'

import React, { Component, PropTypes } from 'react'

import './index.scss'

class Lyric extends Component {
  render () {
    const { lyric, closeLyric, isShowLyric } = this.props

    let ldiv
    if (lyric) {
      let ls = lyric.split('\n')
      let lyricNodes = ls.map((l, index) => {
        return <p key={ index }>{ l }</p>
      })
      ldiv = <div className="ps-container">{ lyricNodes }</div>
    } else {
      ldiv = <div className="no-lyric">暂无歌词</div>
    }

    return (
      <div className={ isShowLyric ? 'playing-lyric' : 'hide' }>
        <div className="lyric">
          { ldiv }
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
