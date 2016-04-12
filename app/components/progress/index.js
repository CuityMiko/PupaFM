import React, { Component } from 'react'

import './index.scss'

class Progress extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className='progress'>
        <div className='progress-bar loading' style={{width: '100%'}}></div>
        <div className='progress-bar playing' style={{width: this.props.percent}}></div>
      </div>
    )
  }
}

export default Progress
