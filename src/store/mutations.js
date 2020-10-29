import {SAVE_ADMIN_USER} from './mutation-type'

export default {
  [SAVE_ADMIN_USER](state, payload) {
    state.adminUser = payload
  }
}