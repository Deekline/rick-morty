import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  withCredentials: false
})

const getCharacters = (page, type) => {
  if (type) {
    if (type === 'All') {
      return apiClient.get(`character/?page=${page}`)
    }
    return apiClient.get(`character/?page=${page}&type=${type}`)
  }
  return apiClient.get(`character/?page=${page}`)
}

const searchByName = (page, type, name) => {
  return apiClient.get(`character/?page=${page}&name=${name}`)
}

const getCharacter = (id) => {
  return apiClient.get(`character/${id}`)
}

export default {
  getCharacters,
  searchByName,
  getCharacter
}
