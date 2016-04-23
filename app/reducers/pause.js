import { DO_PAUSE } from '../actions/types'

// 暂停播放
const initialState = false
export default function pause (state = initialState, action) {
  switch (action.type) {
    case DO_PAUSE:
      return !state
    default :
      return state
  }
}
