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
export function postNever (channel_id, sid) {
  return function (dispatch) {
    dispatch(never())

    return operate('never_play_again', { channel_id, sid },
      () => receiveNever())
  }
}

// star song
function receiveLike () {
  return { type: types.RECEIVE_LIKE }
}

export function postLike (isLike, channel_id, sid) {
  const method = isLike ? 'unstar' : 'star'
  return function (dispatch) {
    dispatch(like())

    return operate(method, { channel_id, sid },
      () => receiveLike())
  }
}

// fetch more
function requestMoreSongs (channel_id, sid) {
  return { type: types.REQUEST_MORE, channel_id, sid }
}

function receiveMoreSongs (songs) {
  return { type: types.RECEIVE_MORE, songs }
}

export function fetchMoreSongs (channel_id, sid, cb) {
  return function (dispatch) {
    dispatch(requestMoreSongs(channel_id, sid))

    return operate('songs', { channel_id, sid },
      (songs) => {
        dispatch(receiveMoreSongs(songs))
        cb && cb()
      })
  }
}

// fetch songs
function requestSongs (channel_id) {
  return { type: types.REQUEST_SONGS, channel_id }
}

function receiveSongs (songs) {
  return { type: types.RECEIVE_SONGS, songs }
}

export function fetchSongs (channel_id) {
  return function (dispatch) {
    dispatch(requestSongs(channel_id))

    return operate('songs', { channel_id },
      (songs) => dispatch(receiveSongs(songs)))
  }
}
