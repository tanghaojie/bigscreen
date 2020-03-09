export default {
  name: (state) => (val) => {
    return val + state.name
  }
}
