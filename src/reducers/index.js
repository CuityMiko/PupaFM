'use strict'

// import { combineReducers } from 'redux'

import {
  DO_NEVER, DO_LIKE, DO_NEXT, DO_PAUSE,
  REQUEST_SONGS, RECEIVE_SONGS, REQUEST_MORE, RECEIVE_MORE,
  SHOW_LYRIC, REQUEST_LYRIC, RECEIVE_LYRIC
} from '../actions/types'

const initialState = {
  // 是否显示歌词
  isShowLyric: false,
  // 暂停/播放
  pause: false,
  // 当前歌曲索引
  current: 0,
  // 正在获取歌曲
  isFetchingSong: false,
  // 正在获取歌词
  isFetchingLyric: false,
  // 歌曲列表
  songs: [{
    singers: [{ id: '0', name: 'xwartz' }],
    title: 'douban.fm',
    album: '/subject/1458963/',
    url: 'https://xwartz.github.com',
    picture: 'https://img3.doubanio.com/lpic/s7052285.jpg',
    like: false,
    lyric: [],
    sid: ''
  }]
}

function _assign (target, ...sources) {
  return Object.assign({}, target, ...sources)
}

function parseLyric (lyric) {
  let result = []
  let lines = lyric.split('\n')

  lines.forEach((line) => {
    let time

    line = line.replace(/\[(\d+):(\d+?(\.)?\d+)\]/g, ($0, m, s) => {
      time = parseInt(m) * 60 + parseFloat(s)
      return ''
    })

    result.push({
      time: time,
      text: line
    })
  })

  return result
}

export default function rootReducer (state = initialState, action) {
  const { songs, current, pause, isShowLyric } = state

  switch (action.type) {
    case DO_NEVER:
      return Object.assign({}, state, {
        songs: songs.filter((song, index) => index !== current),
        pause: false
      })

    case DO_LIKE:
      return Object.assign({}, state, {
        songs: songs.map((song, index) =>
          index === current ? _assign(song, { like: !song.like }) : song)
      })

    case DO_PAUSE:
      return _assign(state, { pause: !pause })

    case DO_NEXT:
      return _assign(state, { pause: false }, { current: current + 1 })

    case RECEIVE_SONGS:
      return _assign(state, { songs: action.songs })

    case RECEIVE_MORE:
      return _assign(state, { songs: [...songs, ...action.songs] })

    case SHOW_LYRIC:
      return _assign(state, { isShowLyric: !isShowLyric })

    case RECEIVE_LYRIC:
      return _assign(state, { isFetchingLyric: false },
        { songs: songs.map((song, index) =>
            index === current ? _assign(song,
              { lyric: parseLyric(action.lyric) }) : song)
        }
      )

    case REQUEST_LYRIC:
      return _assign(state, { isFetchingLyric: true })
    case REQUEST_SONGS:
    case REQUEST_MORE:
      return state

    default:
      return state
  }
}

export default rootReducer
