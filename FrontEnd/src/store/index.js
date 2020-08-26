import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    body: [],
    fuel: [],
    sorting: ''
  },
  mutations: {
    setBody(state, selection) {
      state.body = selection
    },
    setFuel(state, selection) {
      state.fuel = selection
    },
    setSort(state, selection) {
      state.sorting = selection
    }
  },
  getters: {
    getFilteredFuels: state => {
      return state.fuel
    },
    getFilteredBodies: state => {
      return state.body
    },
    getSort: state => {
      return state.sorting
    }
  },
  actions: {
  },
  modules: {
  }
})
