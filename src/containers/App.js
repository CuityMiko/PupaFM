'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { nextSong,
  pauseSong,
  postNever,
  postLike,
  fetchMoreSongs,
  fetchSongs,
  showLyric,
  fetchLyric
} from '../actions'

import Song from '../components/song'

import './base.scss'

const channelId = '100'
// const sid = '1885670'

class App extends Component {

  // constructor (props) {
  //   super(props)
  // }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchSongs(channelId))
  }

  // componentDidUpdate (prevProps, prevState) {
  //   console.log(prevProps)
  // }

  pause () {
    const { dispatch } = this.props
    dispatch(pauseSong())
  }

  // 加红心
  star () {
    const { dispatch, current, songs } = this.props
    const song = songs[current]
    dispatch(postLike(song.like, channelId, song.sid))
  }

  // 跳过
  _skip (method) {
    const { dispatch, current, songs } = this.props
    const song = songs[current]

    if (songs.length <= current + 2) {
      dispatch(fetchMoreSongs(channelId, song.sid,
        () => {
          dispatch(method())
          this.initLyric()
        })
      )
    } else {
      dispatch(method())
      this.initLyric()
    }
  }

  // 下一首
  next () {
    this._skip(nextSong)
  }

  // 不再播放
  never () {
    this._skip(postNever)
  }

  // 显示隐藏歌词
  showLyric () {
    const { dispatch, current, songs } = this.props
    const song = songs[current]
    if (song.lyric) {
      dispatch(showLyric())
    } else {
      dispatch(fetchLyric(song.sid, () => dispatch(showLyric())))
    }
  }

  // 如果是要显示歌词，在切换歌的时候，尝试获取歌词
  initLyric () {
    const { dispatch, current, songs, isShowLyric } = this.props
    const song = songs[current]
    if (isShowLyric && !song.lyric) {
      dispatch(fetchLyric(song.sid))
    }
  }

  render () {
    const { current, songs, pause, isShowLyric, isFetchingLyric } = this.props
    const song = songs[current]
    return (
      <Song song={ song }
        pause={ pause }
        isShowLyric={ isShowLyric }
        isFetchingLyric={ isFetchingLyric }
        onPauseClick={ () => { this.pause() } }
        onStarClick={ () => { this.star() } }
        onNextClick={ () => { this.next() } }
        onNeverClick={ () => { this.never() } }
        onShowLyric={ this.showLyric.bind(this) }
      />
    )
  }
}

App.PropTypes = {
  pause: PropTypes.bool.isRequired,
  current: PropTypes.number.isRequired,
  songs: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  isShowLyric: PropTypes.bool.isRequired,
  isFetchingLyric: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return state
}

export default connect(mapStateToProps)(App)
