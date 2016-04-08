import React, { Component } from 'react'

import 'index.scss'

class Progress extends Component {
  render () {
    return (
      <div className='progress'>
        <div className='progress-bar loading' style></div>
        <div className='progress-bar playing' style></div>
      </div>
    )
  }
}

export default Progress
