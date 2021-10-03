import { DEFAULT_COLORS } from '../../constants'

const state = {
  croppedImageInfo: null,
  colors: localStorage.getItem('palette') ? JSON.parse(localStorage.getItem('palette')) : DEFAULT_COLORS,
  config: {
    algorithm: 'CIE76',
    drawLine: true,
    palette: true,
    fillNums: true,
    statistics: true
  }
}

const mutations = {
  SET_CROPPED_IMAGE_INFO: (state, info) => {
    state.croppedImageInfo = info
  },
  SET_CONFIG: (state, config) => {
    state.config = config
  },
  SET_COLORS: (state, colors) => {
    state.colors = colors
  }
}

const actions = {
  setCroppedImageInfo ({ commit }, info) {
    commit('SET_CROPPED_IMAGE_INFO', info)
  },
  setConfig ({ commit }, config) {
    commit('SET_CONFIG', config)
  },
  setColors ({ commit }, colors) {
    localStorage.setItem('palette', JSON.stringify(colors))
    commit('SET_COLORS', colors)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
