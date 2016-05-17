'use strict'

// import { combineReducers } from 'redux'

import { assign, parseLyric } from '../utils'

import {
  DO_NEVER, DO_LIKE, DO_NEXT, DO_PAUSE,
  REQUEST_SONGS, RECEIVE_SONGS, REQUEST_MORE, RECEIVE_MORE,
  SHOW_LYRIC, REQUEST_LYRIC, RECEIVE_LYRIC,
  CHANGE_CHANNEL,
  RECEIVE_LOGIN,
  SHOW_LOGIN,
  ERROR_LOGIN,
  REQUEST_LOGOUT
} from '../actions/types'

const rootReducer = (state, action) => {
  const { songs, current, pause, isShowLyric, isPop } = state

  switch (action.type) {
    case DO_NEVER:
      return Object.assign({}, state, {
        songs: songs.filter((song, index) => index !== current),
        pause: false
      })

    case DO_LIKE:
      return Object.assign({}, state, {
        songs: songs.map((song, index) =>
          index === current ? assign(song, { like: !song.like }) : song)
      })

    case DO_PAUSE:
      return assign(state, { pause: !pause })

    case DO_NEXT:
      return assign(state, { pause: false }, { current: current + 1 })

    case RECEIVE_SONGS:
      return assign(state, { current: 0 }, { songs: action.songs })

    case RECEIVE_MORE:
      return assign(state, { songs: [...songs, ...action.songs] })

    case SHOW_LYRIC:
      return assign(state, { isShowLyric: !isShowLyric })

    case RECEIVE_LYRIC:
      return assign(state, { isFetchingLyric: false },
        { songs: songs.map((song, index) =>
            index === current ? assign(song,
              { lyric: parseLyric(action.lyric) }) : song)
        }
      )

    case REQUEST_LYRIC:
      return assign(state, { isFetchingLyric: true })
    case REQUEST_SONGS:
    case REQUEST_MORE:
      return state

    case CHANGE_CHANNEL:
      return assign(state, { channelId: action.channelId })

    case RECEIVE_LOGIN:
      return assign(state, { userInfo: action.userInfo, errMsg: '' })
    case SHOW_LOGIN:
      return assign(state, { isPop: !isPop })
    case ERROR_LOGIN:
      return assign(state, { errMsg: action.errMsg })
    case REQUEST_LOGOUT:
      return assign(state, { userInfo: {} })

    default:
      return state
  }
}

export default rootReducer
