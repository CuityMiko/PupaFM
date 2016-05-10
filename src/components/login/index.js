'use strict'

import React, { Component } from 'react'
import { webOperate } from '../../actions/api'

import './index.scss'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      alias: '',
      form_password: '',
      captcha_solution: '',
      captcha_id: ''
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
    webOperate('captcha_id', null, (id) => {
      console.log(id)
      this.setState({ captcha_id: id })
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.login(this.state)
  }

  render () {
    return (
      <div className="overlay">
      <div className="pop">
        <form className="login-form" onSubmit={ this.handleSubmit.bind(this) } >
          <p className="legend">登录</p>
          <div className="error">密码不正确</div>
          <div className="item spec">
            <label for="email">邮箱 / 用户名</label>
            <input type="text" id="email" name="email" className="text email" tabindex="1"
              value={ this.state.email }
              onChange={ this.handleEmailChange.bind(this) }
            />
          </div>

          <div className="item spec">
            <label for="password">密码</label>
            <input type="password" id="password" name="password" className="text" tabindex="2"
              value={ this.state.password }
              onChange={ this.handlePasswordChange.bind(this) }
            />
          </div>

          <div className="item spec captcha">
            <label for="captcha_solution">验证码</label>
            <input type="text" name="captcha_solution" id="captcha_solution" className="text" tabindex="4"
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
            <input type="submit" id="submit" value="登 录" tabindex="5"/>
          </div>

        </form>
      </div>
      </div>
    )
  }
}

export default Login
