import React, { Component } from 'react'
import AppSDK from 'dbfm-app-sdk'

import './index.scss'

import SongTitle from '../title'
import Player from '../player'
import Cover from '../cover'

const sdk = new AppSDK()

class Song extends Component {

  constructor (props) {
    super(props)
    this.state = { song: {} }
  }

  updateState () {
    sdk.songs({
      channel_id: '123'
    }, (err, songs) => {
      if (err) return console.error(err)

      this.setState({
        song: songs[0]
      })
      console.log(songs)
    })
  }

  componentDidMount () {
    this.updateState()
  }

  render () {
    return (
      <div className="fullplayer">
        <div className="playing-info">
          <SongTitle {...this.state.song} />
          <Player {...this.state.song} />
        </div>
        <Cover {...this.state.song} />
      </div>
    )
  }
}

export default Song
