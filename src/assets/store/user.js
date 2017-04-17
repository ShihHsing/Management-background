import Vue from 'vue'

export const USER_SIGNIN = 'USER_SIGNIN' // 登录成功
export const USER_SIGNOUT = 'USER_SIGNOUT' // 退出登录
// export const SHOW_NAV = 'SHOW_NAV' // 控制左侧导航栏的现显示状态

export default {
  // state: {
  //     user: JSON.parse(sessionStorage.getItem('user')) || {},
  //     nav_show: true
  // },
  state: JSON.parse(window.sessionStorage.getItem('user')) || {},
  mutations: {
    [USER_SIGNIN] (state, user) {
      window.sessionStorage.setItem('user', JSON.stringify(user))
      Object.assign(state, user)
    },
    [USER_SIGNOUT] (state) {
      window.sessionStorage.removeItem('user')
      Object.keys(state).forEach(k => Vue.delete(state, k))
    }
    // [SHOW_NAV](state) {
    //     state.nav_show = false
    // }
  },
  actions: {
    [USER_SIGNIN] ({ commit }, user) {
      commit(USER_SIGNIN, user)
    },
    [USER_SIGNOUT] ({ commit }) {
      commit(USER_SIGNOUT)
    }
    // [SHOW_NAV]({commit}) {
    //     commit(SHOW_NAV)
    // }
  }
}
