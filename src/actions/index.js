'use strict'

import { operate } from './api'
import * as types from './types'

export const nextSong = () => {
  return { type: types.DO_NEXT }
}

export const pauseSong = () => {
  return { type: types.DO_PAUSE }
}

const never = () => {
  return { type: types.DO_NEVER }
}

const like = () => {
  return { type: types.DO_LIKE }
}

// never play again
const receiveNever = () => {
  return { type: types.RECEIVE_NEVER }
}

export const postNever = (channelId, sid) => {
  return (dispatch) => {
    dispatch(never())

    return operate('never_play_again', { channel_id: channelId, sid },
      () => receiveNever())
  }
}

// star song
const receiveLike = () => {
  return { type: types.RECEIVE_LIKE }
}

export const postLike = (isLike, channelId, sid) => {
  const method = isLike ? 'unstar' : 'star'
  return (dispatch) => {
    dispatch(like())

    return operate(method, { channel_id: channelId, sid },
      () => receiveLike())
  }
}

// fetch more
const requestMoreSongs = (channelId, sid) => {
  return { type: types.REQUEST_MORE, channel_id: channelId, sid }
}

const receiveMoreSongs = (songs) => {
  return { type: types.RECEIVE_MORE, songs }
}

export const fetchMoreSongs = (channelId, sid, cb) => {
  return (dispatch) => {
    dispatch(requestMoreSongs(channelId, sid))

    return operate('songs', { channel_id: channelId, sid },
      (songs) => {
        dispatch(receiveMoreSongs(songs))
        cb && cb()
      })
  }
}

// fetch songs
const requestSongs = (channelId) => {
  return { type: types.REQUEST_SONGS, channelId }
}

const receiveSongs = (songs) => {
  return { type: types.RECEIVE_SONGS, songs }
}

export const fetchSongs = (channelId) => {
  return (dispatch) => {
    dispatch(requestSongs(channelId))

    return operate('songs', { channel_id: channelId },
      (songs) => dispatch(receiveSongs(songs)))
  }
}

// lyric
export const showLyric = () => {
  return { type: types.SHOW_LYRIC }
}

const requestLyric = () => {
  return { type: types.REQUEST_LYRIC }
}

const receiveLyric = (lyric) => {
  return { type: types.RECEIVE_LYRIC, lyric }
}

export const fetchLyric = (sid, ssid, cb) => {
  return (dispatch) => {
    dispatch(requestLyric())

    return operate('lyric', { sid, ssid },
      (res) => {
        dispatch(receiveLyric(res.lyric))
        cb && cb()
      })
  }
}

export const changeChannel = (channelId) => {
  return { type: types.CHANGE_CHANNEL, channelId }
}

// login
const requestLogin = () => {
  return { type: types.REQUEST_LOGIN }
}

const receiveLogin = (userInfo) => {
  return { type: types.RECEIVE_LOGIN, userInfo }
}

const loginError = (errMsg) => {
  return { type: types.ERROR_LOGIN, errMsg }
}

export const login = (opt) => {
  return (dispatch) => {
    dispatch(requestLogin())
    return operate('login', opt, (data) => {
      console.log(data)
      if (data.body.r === 0) {
        dispatch(receiveLogin(data.body.user_info))
        dispatch(loginPop())
      } else {
        dispatch(loginError(data.body.err_msg))
      }
    })
  }
}

export const loginPop = () => {
  return { type: types.SHOW_LOGIN }
}

export const logout = () => {
  return { type: types.REQUEST_LOGOUT }
}
