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
  fetchLyric,
  changeChannel
} from '../actions'

import Song from '../components/song'
import Channels from '../components/channel'

import './base.scss'

const channels = [{
  id: 0,
  name: '我的私人兆赫'
}, {
  id: -10,
  name: '豆瓣精选兆赫'
}]

// const sid = '1885670'

class App extends Component {

  // constructor (props) {
  //   super(props)
  // }

  componentDidMount () {
    const { dispatch, channelId } = this.props
    dispatch(fetchSongs(channelId))
  }

  componentDidUpdate (prevProps, prevState) {
    const { dispatch, channelId } = this.props
    if (prevProps.channelId !== channelId) {
      dispatch(fetchSongs(channelId))
    }
  }

  pause () {
    const { dispatch } = this.props
    dispatch(pauseSong())
  }

  // 加红心
  star () {
    const { dispatch, current, songs, channelId } = this.props
    const song = songs[current]
    dispatch(postLike(song.like, channelId, song.sid))
  }

  // 跳过
  _skip (method) {
    const { dispatch, current, songs, channelId } = this.props
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

  onChannel (id) {
    const { dispatch } = this.props
    dispatch(changeChannel(id))
  }

  render () {
    const { current, songs, pause, isShowLyric, isFetchingLyric, channelId } = this.props
    const song = songs[current]
    return (
      <div className="cl-player">

        <Channels channels={ channels }
          channelId = { channelId }
          onChannel={ this.onChannel.bind(this) }
        />

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
      </div>
    )
  }
}

App.PropTypes = {
  channelId: PropTypes.number.isRequired,
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
