const state = {
  croppedImageInfo: null,
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
  }
}

const actions = {
  setCroppedImageInfo ({ commit }, info) {
    commit('SET_CROPPED_IMAGE_INFO', info)
  },
  setConfig ({ commit }, config) {
    commit('SET_CONFIG', config)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
