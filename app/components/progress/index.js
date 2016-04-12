import React, { Component } from 'react'

import './index.scss'

class Progress extends Component {
  constructor (props) {
    super(props)
    this.state = { len: '0%' }
  }
  render () {
    return (
      <div className='progress'>
        <div className='progress-bar loading' style={{width: '100%'}}></div>
        <div className='progress-bar playing' style={{width: this.state.len}}></div>
      </div>
    )
  }
}

export default Progress
