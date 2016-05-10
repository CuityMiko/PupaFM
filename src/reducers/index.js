'use strict'

// import { combineReducers } from 'redux'

import { assign } from '../utils'

import {
  DO_NEVER, DO_LIKE, DO_NEXT, DO_PAUSE,
  REQUEST_SONGS, RECEIVE_SONGS, REQUEST_MORE, RECEIVE_MORE,
  SHOW_LYRIC, REQUEST_LYRIC, RECEIVE_LYRIC,
  CHANGE_CHANNEL,
  RECEIVE_LOGIN,
  SHOW_LOGIN
} from '../actions/types'

const initialState = {
  // login
  userInfo: {},
  isPop: false,
  channelId: 0,
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

// 解析歌词
function parseLyric (lyric) {
  var result = []
  var lines = lyric.split('\n')

  lines.forEach((line) => {
    var times = []

    line = line.replace(/\[(\d+):(\d+?(\.)?\d+)\]/g, ($0, m, s) => {
      times.push(parseInt(m) * 60 + parseFloat(s))
      return ''
    })

    // 循环歌词
    times.forEach((time, i) => {
      result.push({
        time: time,
        text: line
      })
    })
  })

  result = result.sort((a, b) => {
    return a.time - b.time
  })

  return result
}

export default function rootReducer (state = initialState, action) {
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
      return assign(state, { userInfo: action.userInfo })
    case SHOW_LOGIN:
      return assign(state, { isPop: !isPop })

    default:
      return state
  }
}

export default rootReducer
