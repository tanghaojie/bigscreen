import {
  SET_NAME,
  SET_CAMERA,
  SET_GRAPHICS,
  PUSH_GRAPHICS
} from './mutation-types'

export default {
  setName(context, name) {
    context.commit(SET_NAME, name)
  },
  setCamera(context, camera) {
    context.commit(SET_CAMERA, camera)
  },
  setGraphics(context, graphics) {
    context.commit(SET_GRAPHICS, graphics)
  },
  pushGraphics(context, ...graphics) {
    context.commit(PUSH_GRAPHICS, graphics)
  }
}
