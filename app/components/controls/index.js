'use strict'

import React, { Component } from 'react'

import './index.scss'

class Controls extends Component {

  handleNext (event) {
    this.props.onNext()
  }

  handleStar (event) {
    this.props.onStar()
  }

  handleTrash () {
    this.props.onTrash()
  }

  render () {
    return (
      <div className="playing-controls">
        <div className="controls">
          <span className={ 'iconfont icon-heart ' + (this.props.like ? 'like' : '') }
            onClick={this.handleStar.bind(this)}
          ></span>
          <span className="iconfont icon-trash" onClick={this.handleTrash.bind(this)}></span>
          <span className="iconfont icon-skip"
            onClick={this.handleNext.bind(this)}>
          </span>
        </div>
      </div>
    )
  }
}

export default Controls
