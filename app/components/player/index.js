import React, { Component } from 'react'
import AppSDK from 'dbfm-app-sdk'

import './index.scss'

const sdk = new AppSDK()

class Player extends Component {

  constructor (props) {
    super(props)
    this.state = { data: [] }
  }

  updateState () {
    sdk.songs({
      channel_id: '1'
    }, (err, songs) => {
      if (err) return console.error(err)

      this.setState({
        data: songs
      })
      console.log(songs)
    })
  }

  componentDidMount () {
    this.updateState()
  }

  render () {
    return (
      <audio src={this.state.data[0] && this.state.data[0].url}
      preload autoPlay />
    )
  }
}

export default Player
