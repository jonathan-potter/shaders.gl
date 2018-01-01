const { fetch } = window

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export function getFetch (url) {
  return fetchJSON(url)
}

export function postFetch (url, body) {
  return fetchJSON(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  })
}

export function putFetch (url, body) {
  return fetchJSON(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body)
  })
}

export function deleteFetch (url) {
  return fetch(url, {
    method: 'DELETE',
    headers
  })
}

function fetchJSON (url, options) {
  return fetch(url, options)
    .then(response => response.json())
}
