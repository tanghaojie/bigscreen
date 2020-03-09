import {
  SET_CAMERA,
  SET_GRAPHICS,
  PUSH_GRAPHICS
} from './mutation-types'

export default {
  setCamera(context, camera) {
    context.commit(SET_CAMERA, null)
    context.commit(SET_CAMERA, camera)
  },
  setGraphics(context, graphics) {
    context.commit(SET_GRAPHICS, [])
    context.commit(SET_GRAPHICS, graphics)
  },
  pushGraphics(context, graphics) {
    context.commit(PUSH_GRAPHICS, graphics)
  }
}
