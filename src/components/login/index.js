'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { operate } from '../../actions/api'
import { login, loginPop } from '../../actions'

import './index.scss'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      alias: '',
      form_password: '',
      captcha_solution: '',
      captcha_id: '',
      source: 'radio',
      task: 'sync_channel_list'
    }
  }

  componentWillMount () {
    this.handleCaptchaClick()
  }

  handleEmailChange (e) {
    this.setState({ alias: e.target.value })
  }

  handlePasswordChange (e) {
    this.setState({ form_password: e.target.value })
  }

  handleCaptchaChange (e) {
    this.setState({ captcha_solution: e.target.value })
  }

  handleCaptchaClick (e) {
    operate('captchaId', null, (id) => {
      this.setState({ captcha_id: id })
    })
  }

  handleSubmit (e) {
    const { login } = this.props
    e.preventDefault()
    login(this.state)
  }

  renderError () {
    const { errMsg } = this.props
    if (!errMsg) {
      return ''
    } else {
      return (
        <div className="error" style={{ display: 'block' }}>{ errMsg }</div>
      )
    }
  }

  render () {
    const { isPop, loginPop } = this.props
    return (
      <div className="overlay" style={{ display: isPop ? 'block' : 'none' }}>
      <div className="pop">
        <a href="javascript:;" className="close" onClick={ loginPop }>x</a>
        <form className="login-form" onSubmit={ this.handleSubmit.bind(this) } >
          <p className="legend">登录</p>
          { this.renderError() }
          <div className="item spec">
            <label htmlFor="email">邮箱 / 用户名</label>
            <input type="text" id="email" name="email" className="text email" tabIndex="1"
              value={ this.state.email }
              onChange={ this.handleEmailChange.bind(this) }
            />
          </div>

          <div className="item spec">
            <label htmlFor="password">密码</label>
            <input type="password" id="password" name="password" className="text" tabIndex="2"
              value={ this.state.password }
              onChange={ this.handlePasswordChange.bind(this) }
            />
          </div>

          <div className="item spec captcha">
            <label htmlFor="captcha_solution">验证码</label>
            <input type="text" name="captcha_solution" id="captcha_solution" className="text" tabIndex="4"
              value={ this.state.captcha_solution }
              onChange={ this.handleCaptchaChange.bind(this) }
            />
          </div>
          <img alt="captcha" width="130" height="35" title="看不清楚?点图片可以换一个"
            src={ 'http://douban.fm/misc/captcha?size=m&id=' + this.state.captcha_id }
            onClick={ this.handleCaptchaClick.bind(this) }
          />

          <div className="item recsubmit">
            <span className="loading"></span>
            <input type="submit" id="submit" value="登 录" tabIndex="5"/>
          </div>

        </form>
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.login
  }
}

const mapDispatchToProps = { login, loginPop }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
