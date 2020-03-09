import
{
  SET_CAMERA,
  SET_GRAPHICS,
  PUSH_GRAPHICS
} from './mutation-types'

export default {
  [SET_CAMERA](state, camera) {
    if (camera) {
      state.camera = camera
    } else {
      state.camera = null
    }
  },

  [SET_GRAPHICS](state, graphics) {
    if (graphics) {
      state.graphics = graphics
    } else {
      state.graphics = []
    }
  },

  [PUSH_GRAPHICS](state, graphics) {
    if (graphics) {
       graphics.forEach(element => {
        state.graphics.push(element)
      });
    }
  }
}
