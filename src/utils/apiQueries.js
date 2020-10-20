import axios from 'axios'

console.log('apiQueries code executed')

const port = process.env.PORT || 5001
const productionUrl = 'http://46.101.222.34/'
const devUrl = `http://192.168.1.101:${port}/`
const hostname = window.location.hostname
const isLocalhost = hostname === 'localhost' || hostname.startsWith('192')
let BASE_URL = isLocalhost ? devUrl : productionUrl
console.log(BASE_URL)

export const PHOTOS_URL = BASE_URL + 'images/uploads/'

export function getAllPhotosUrls() {
  return BASE_URL + 'api/images/'
}

export function getImagesUploadUrl() {
  return BASE_URL + 'api/upload/'
}

export function getProductsUrl() {
  return BASE_URL + 'api/products/'
}

export function getProductById(id) {
  return axios({
    method: 'get',
    url: `${getProductsUrl()}${id}`,
  })
}

export function getShopItems(query) {
  return axios.get(getProductsUrl(), {
    params: { ...query },
  })
}
