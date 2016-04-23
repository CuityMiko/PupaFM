'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { nextSong, pauseSong, postNever, postLike, fetchMoreSongs, fetchSongs } from '../actions'

import Song from '../components/song'

const channel_id = '100'
// const sid = '1885670'

class App extends Component {

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchSongs(channel_id))
  }

  pause () {
    const { dispatch } = this.props
    dispatch(pauseSong())
  }

  // like this song
  star () {
    const { dispatch, current, songs } = this.props
    const song = songs[current]
    dispatch(postLike(song.like, channel_id, song.sid))
  }

  _skip (method) {
    const { dispatch, current, songs } = this.props
    const song = songs[current]

    if (songs.length <= current + 2) {
      dispatch(fetchMoreSongs(channel_id, song.sid, () => dispatch(method())))
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

  render () {
    const { current, songs, pause } = this.props
    const song = songs[current]
    return (
      <Song song={ song } pause={ pause }
        onPauseClick={ () => { this.pause() } }
        onStarClick={ () => { this.star() } }
        onNextClick={ () => { this.next() } }
        onNeverClick={ () => { this.never() } }
      />
    )
  }
}

App.PropTypes = {
  current: PropTypes.number.isRequired,
  songs: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  pause: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  const { pause, current, songs } = state
  return { pause, current, songs }
}

export default connect(mapStateToProps)(App)
