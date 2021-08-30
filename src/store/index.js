import Vue from 'vue'
import Vuex from 'vuex'
import ApiService from '@/services/ApiService'
import Storage from '../helpers/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: ['All', 'Human', 'Animal', 'Alien'],
    selectedCategory: 'All',
    characters: [],
    info: null,
    character: null,
    favoriteCharacters: [],
    search: '',
    loading: false
  },
  mutations: {
    ADD_CHARACTERS (state, characters) {
      state.characters = characters
    },
    SET_CHARACTER (state, character) {
      state.character = character
    },
    ADD_FAVORITE (state, character) {
      state.favoriteCharacters.push(character)
    },
    DELETE_FAVORITE (state, id) {
      state.favoriteCharacters = state.favoriteCharacters.filter(char => char.id !== id)
    },
    SET_CATEGORY (state, category) {
      state.selectedCategory = category
    },
    SET_FAVORITES (state, characters) {
      state.favoriteCharacters = characters || []
    },
    SET_INFO (state, info) {
      state.info = info
    },
    UPDATE_SEARCH (state, search) {
      state.search = search
    },
    REMOVE_SEARCH (state) {
      state.search = null
    },
    SET_LOADING (state, loading) {
      state.loading = loading
    }
  },
  actions: {
    fetchCharacters ({ commit }, { page, category, name }) {
      console.log({ page, category, name })
      commit('SET_LOADING', true)
      if (name) {
        return ApiService.searchByName(page, category, name).then((response) => {
          commit('ADD_CHARACTERS', response.data.results)
          commit('SET_INFO', response.data.info)
          commit('SET_LOADING', false)
        })
      }
      return ApiService.getCharacters(page, category).then((response) => {
        commit('ADD_CHARACTERS', response.data.results)
        commit('SET_INFO', response.data.info)
        commit('SET_LOADING', false)
      })
    },
    fetchCharacter ({ commit, getters }, id) {
      commit('SET_LOADING', true)
      const char = getters.getCharById(id)
      if (char) {
        commit('SET_CHARACTER', char)
        commit('SET_LOADING', false)
      } else {
        ApiService.getCharacter(id).then((resp) => {
          commit('SET_CHARACTER', resp.data)
          commit('SET_LOADING', false)
        })
      }
    },
    addFavorite ({ commit }, character) {
      commit('ADD_FAVORITE', character)
      Storage.setItem(character)
    },
    removeFavorite ({ commit }, id) {
      commit('DELETE_FAVORITE', id)
      Storage.removeItem(id)
    },
    setFavorites ({ commit }, characters) {
      commit('SET_FAVORITES', characters)
    },
    setCategory ({ commit }, category) {
      commit('SET_CATEGORY', category)
    },
    updateSearch ({ commit }, search) {
      commit('UPDATE_SEARCH', search)
    },
    removeSearch ({ commit }) {
      commit('REMOVE_SEARCH')
    }
  },
  modules: {},
  getters: {
    favoritesQuantity (state) {
      console.log(state.favoriteCharacters.length)
      return state.favoriteCharacters.length
    },
    getCharById: (state) => (id) => {
      return state.characters.find((char) => char.id === id)
    }
  }
})
