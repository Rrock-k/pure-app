import axios from 'axios'

const port = process.env.PORT || 5001
const productionUrl = 'http://46.101.222.34/'
const hostname = window.location.hostname
const devUrl = `http://${hostname}:${port}/`
const isLocalhost = hostname === 'localhost' || hostname.startsWith('192')
let BASE_URL = isLocalhost ? devUrl : productionUrl

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

export function getProducts() {
  return axios({
    method: 'get',
    url: `${getProductsUrl()}`,
  })
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

export function deleteProduct(id) {
  return axios({
    method: 'delete',
    url: `${getProductsUrl()}${id}`,
  })
}
