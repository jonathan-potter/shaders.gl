const BASE_URL = 'http://localhost:3000/shaders'

export default {
  all () {
    return fetch(BASE_URL)
      .then(response => response.json())
  },

  create (element) {
    return fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(element)
    }).then(response => response.json())
  },

  update (element) {
    return fetch(`${BASE_URL}/${element.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(element)
    }).then(response => response.json())
  },

  destroy (id) {
    return fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}
