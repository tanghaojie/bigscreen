import
{
  SET_NAME,
  SET_CAMERA,
  SET_GRAPHICS,
  PUSH_GRAPHICS
} from './mutation-types'

export default {
  [SET_NAME](state, name) {
    if (name) {
      state.name = name
    } else {
      state.name = {}
    }
  },

  [SET_CAMERA](state, camera) {
    if (camera) {
      state.camera = camera
    } else {
      state.camera = {}
    }
  },

  [SET_GRAPHICS](state, graphics) {
    if (graphics) {
      state.graphics = graphics
    } else {
      state.graphics = {}
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
