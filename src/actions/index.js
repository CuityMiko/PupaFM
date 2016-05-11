'use strict'

import { operate, webOperate } from './api'
import * as types from './types'

export function nextSong () {
  return { type: types.DO_NEXT }
}

export function pauseSong () {
  return { type: types.DO_PAUSE }
}

function never () {
  return { type: types.DO_NEVER }
}

function like () {
  return { type: types.DO_LIKE }
}

// never play again
function receiveNever () {
  return { type: types.RECEIVE_NEVER }
}

export function postNever (channelId, sid) {
  return function (dispatch) {
    dispatch(never())

    return operate('never_play_again', { channel_id: channelId, sid },
      () => receiveNever())
  }
}

// star song
function receiveLike () {
  return { type: types.RECEIVE_LIKE }
}

export function postLike (isLike, channelId, sid) {
  const method = isLike ? 'unstar' : 'star'
  return function (dispatch) {
    dispatch(like())

    return operate(method, { channel_id: channelId, sid },
      () => receiveLike())
  }
}

// fetch more
function requestMoreSongs (channelId, sid) {
  return { type: types.REQUEST_MORE, channel_id: channelId, sid }
}

function receiveMoreSongs (songs) {
  return { type: types.RECEIVE_MORE, songs }
}

export function fetchMoreSongs (channelId, sid, cb) {
  return function (dispatch) {
    dispatch(requestMoreSongs(channelId, sid))

    return operate('songs', { channel_id: channelId, sid },
      (songs) => {
        dispatch(receiveMoreSongs(songs))
        cb && cb()
      })
  }
}

// fetch songs
function requestSongs (channelId) {
  return { type: types.REQUEST_SONGS, channelId }
}

function receiveSongs (songs) {
  return { type: types.RECEIVE_SONGS, songs }
}

export function fetchSongs (channelId) {
  return function (dispatch) {
    dispatch(requestSongs(channelId))

    return operate('songs', { channel_id: channelId },
      (songs) => dispatch(receiveSongs(songs)))
  }
}

// lyric
export function showLyric () {
  return { type: types.SHOW_LYRIC }
}

function requestLyric () {
  return { type: types.REQUEST_LYRIC }
}

function receiveLyric (lyric) {
  return { type: types.RECEIVE_LYRIC, lyric }
}

export function fetchLyric (sid, cb) {
  return (dispatch) => {
    dispatch(requestLyric())

    return operate('lyric', { song_id: sid },
      (lyric) => {
        dispatch(receiveLyric(lyric))
        cb && cb()
      })
  }
}

export function changeChannel (channelId) {
  return { type: types.CHANGE_CHANNEL, channelId }
}

// login
function requestLogin () {
  return { type: types.REQUEST_LOGIN }
}

function receiveLogin (userInfo) {
  return { type: types.RECEIVE_LOGIN, userInfo }
}

function loginError (errMsg) {
  return { type: types.ERROR_LOGIN, errMsg }
}

export function login (opt) {
  return (dispatch) => {
    dispatch(requestLogin())
    return webOperate('login', opt, (data) => {
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

export function loginPop () {
  return { type: types.SHOW_LOGIN }
}
