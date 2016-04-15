'use strict'

import React, { Component } from 'react'

import './index.scss'

class Controls extends Component {

  handleSkip (event) {
    this.props.onSkip()
  }

  handleStar (event) {
    this.props.onStar()
  }

  render () {
    return (
      <div className="playing-controls">
        <div className="controls">
          <span className={ 'iconfont icon-heart ' + (this.props.like ? 'like' : '') }
            onClick={this.handleStar.bind(this)}
          ></span>
          <span className="iconfont icon-trash"></span>
          <span className="iconfont icon-skip"
            onClick={this.handleSkip.bind(this)}>
          </span>
        </div>
      </div>
    )
  }
}

export default Controls
