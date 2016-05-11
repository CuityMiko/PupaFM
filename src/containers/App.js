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
  changeChannel,
  login,
  loginPop
} from '../actions'

import Song from '../components/song'
import Channels from '../components/channel'
import Login from '../components/login'
import User from '../components/user'

import './base.scss'

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

  login (opt) {
    console.log(opt)
    const { dispatch } = this.props
    dispatch(login(opt))
  }

  handleLogin () {
    const { dispatch } = this.props
    dispatch(loginPop())
  }

  render () {
    const { current, songs, pause, isShowLyric, isFetchingLyric, channelId,
      userInfo, isPop, errMsg } = this.props
    const song = songs[current]
    return (
      <div className="cl-player">

        <div className="cl-fr">
          <Channels channelId = { channelId }
            onChannel={ this.onChannel.bind(this) }
          />
          <User userInfo={ userInfo }
            handlePop={ this.handleLogin.bind(this) }
          />
        </div>

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

        <Login isPop={ isPop } errMsg={ errMsg }
          login={ (opt) => { this.login(opt) } }
          handlePop={ this.handleLogin.bind(this) }
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
