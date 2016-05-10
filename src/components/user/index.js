'use strict'

import React, { Component, PropTypes } from 'react'
import { isEmpty } from '../../utils'

import './index.scss'

class User extends Component {

  handleChannel (id) {
    this.props.onChannel(id)
  }

  renderInfo () {
    const { userInfo, handlePop } = this.props
    if (isEmpty(userInfo)) {
      return (
        <a href="javascript:;" className="login" onClick={ handlePop }>登录</a>
      )
    } else {
      const sty = {
        backgroundImage: `url(http://img3.douban.com/icon/ul${userInfo.id}-10.jpg)`,
        height: '22px',
        width: '22px',
        display: 'inline-block',
        borderRadius: '50%',
        backgroundSize: 'cover'
      }
      return (
        <div className="avatar" style={ sty }></div>
      )
    }
  }

  render () {
    return (
      <div className="user-block">
        { this.renderInfo() }
      </div>
    )
  }
}

User.propTypes = {
  userInfo: PropTypes.object.isRequired,
  handlePop: PropTypes.func.isRequired
}

export default User

