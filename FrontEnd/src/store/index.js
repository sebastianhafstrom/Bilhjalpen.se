import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    body: [],
    fuel: [],
    cars: [],
    sorting: 'Namn A-Ö'
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
    },
    setCars(state, selection) {
      state.cars = selection
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
    },
    getCars: state => {
      return state.cars
    }
  },
  actions: {
  },
  modules: {
  }
})
