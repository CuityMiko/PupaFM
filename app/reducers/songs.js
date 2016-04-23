import { DO_NEVER, DO_LIKE } from '../actions/types'

// 歌曲
const initialState = [
  {
    singers: [],
    title: '',
    album: '',
    time: '',
    percent: '0%',
    url: '',
    picture: '',
    like: false,
    sid: ''
  }
]

export default function song (state = initialState, action) {
  switch (action.type) {
    case DO_NEVER:
      return state.filter((song) => {
        song.sid !== action.sid
      })
    case DO_LIKE:
      return state.map((song) => {
        song.sid === action.sid ? Object.assign({}, song, { like: !song.like }) : song
      })
    default :
      return state
  }
}
