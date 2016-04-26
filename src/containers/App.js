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

  pause () {
    const { dispatch } = this.props
    dispatch(pauseSong())
  }

  // like this song
  star () {
    const { dispatch, current, songs } = this.props
    const song = songs[current]
    dispatch(postLike(song.like, channelId, song.sid))
  }

  _skip (method) {
    const { dispatch, current, songs } = this.props
    const song = songs[current]

    if (songs.length <= current + 2) {
      dispatch(fetchMoreSongs(channelId, song.sid, () => dispatch(method())))
    } else {
      dispatch(method())
    }
  }

  // next
  next () {
    this._skip(nextSong)
  }

  // never play again
  never () {
    this._skip(postNever)
  }

  showLyric () {
    const { dispatch, current, songs } = this.props
    const song = songs[current]
    if (song.lyric) {
      dispatch(showLyric())
    } else {
      dispatch(fetchLyric(song.sid, () => dispatch(showLyric())))
    }
  }

  render () {
    const { current, songs, pause, isShowLyric } = this.props
    const song = songs[current]
    return (
      <Song song={ song } pause={ pause } isShowLyric={ isShowLyric }
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
  current: PropTypes.number.isRequired,
  songs: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  pause: PropTypes.bool.isRequired,
  isShowLyric: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  // const { pause, current, songs, isShowLyric } = state
  return { ...state }
}

export default connect(mapStateToProps)(App)
