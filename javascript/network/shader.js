import {
  getFetch,
  postFetch,
  putFetch,
  deleteFetch
} from 'network/fetchWrapper'

const BASE_URL = 'http://localhost:3000/shaders'

export default {
  all () {
    return getFetch(BASE_URL)
  },

  create (element) {
    return postFetch(BASE_URL, element)
  },

  update (element) {
    return putFetch(`${BASE_URL}/${element.id}`, element)
  },

  destroy (id) {
    return deleteFetch(`${BASE_URL}/${id}`)
  }
}
