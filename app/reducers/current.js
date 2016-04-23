import { DO_NEXT } from '../actions/types'

// 当前播放的
const initialState = 0

export default function next (state = initialState, action) {
  switch (action.type) {
    case DO_NEXT:
      return action.index + 1
    default :
      return state
  }
}
