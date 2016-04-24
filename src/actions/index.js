'use strict'

import operate from './api'
import * as types from './types'

export function nextSong () {
  return { type: types.DO_NEXT }
}

export function pauseSong () {
  return { type: types.DO_PAUSE }
}

//
export function never () {
  return { type: types.DO_NEVER }
}

export function like () {
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
