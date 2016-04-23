'use strict'

import {
  DO_NEVER, DO_LIKE, DO_NEXT, DO_PAUSE,
  REQUEST_SONGS, RECEIVE_SONGS, REQUEST_MORE, RECEIVE_MORE
} from '../actions/types'

const initialState = {
  pause: false,
  current: 0,
  songs: [{
    singers: [{ id: '0', name: 'xwartz' }],
    title: 'douban.fm',
    album: '/subject/1458963/',
    url: 'https://xwartz.github.com',
    picture: 'https://img3.doubanio.com/lpic/s7052285.jpg',
    like: false,
    sid: ''
  }]
}

export default function rootReducer (state = initialState, action) {
  const { songs, current, pause } = state

  switch (action.type) {
    case DO_NEVER:
      return Object.assign({}, state, {
        songs: songs.filter((song, index) => index !== current),
        pause: false
      })

    case DO_LIKE:
      return Object.assign({}, state, {
        songs: songs.map((song, index) =>
          index === current ? Object.assign({}, song, { like: !song.like }) : song)
      })

    case DO_PAUSE:
      return Object.assign({}, state, { pause: !pause })

    case DO_NEXT:
      return Object.assign({}, state, { pause: false }, { current: current + 1 })

    case RECEIVE_SONGS:
      return Object.assign({}, state, { songs: action.songs })

    case RECEIVE_MORE:
      return Object.assign({}, state, { songs: [...songs, ...action.songs] })
    case REQUEST_SONGS:
    case REQUEST_MORE:
      return state

    default:
      return state
  }
}

export default rootReducer
