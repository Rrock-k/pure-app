import axios from 'axios'

const port = process.env.PORT || 5001
const productionUrl = 'http://46.101.222.34/'
const hostname = window.location.hostname
const devUrl = `http://${hostname}:${port}/`
const isLocalhost = hostname === 'localhost' || hostname.startsWith('192')
let BASE_URL = isLocalhost ? devUrl : productionUrl

const getAuthHeaderOption = () => ({ Authorization: `Bearer ${localStorage.getItem('jwt')}` })

export const PHOTOS_URL = BASE_URL + 'images/uploads/'

export const getAllPhotosUrls = () => BASE_URL + 'api/images/'
export const getImagesUploadUrl = () => BASE_URL + 'api/upload/'
export const getProductsUrl = () => BASE_URL + 'api/products/'
export const getAuthUrl = () => BASE_URL + 'api/auth/'
export const getUsersUrl = () => BASE_URL + 'api/users/'
export const getFileUploadUrl = () => BASE_URL + 'api/upload-file'
export const getSubscribersUrl = () => BASE_URL + 'api/subscribers'
export const getImageSrcFromImageName = imgName => PHOTOS_URL + imgName
export const getProductCardUrl = id => `shop/products/${id || ''}`

export function getProducts(query) {
  const dbQuery = JSON.stringify(query)
  return axios({
    method: 'get',
    url: `${getProductsUrl()}`,
    params: { dbQuery },
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

export function postProduct(product) {
  return axios({
    method: 'post',
    url: getProductsUrl(),
    headers: getAuthHeaderOption(),
    data: product,
  })
}

export function replaceProduct(id, product) {
  return axios({
    method: 'put',
    url: `${getProductsUrl()}${id}`,
    headers: getAuthHeaderOption(),
    data: product,
  })
}

export function changeProduct(id, product) {
  return axios({
    method: 'patch',
    url: `${getProductsUrl()}${id}`,
    headers: getAuthHeaderOption(),
    data: product,
  })
}

export function deleteProduct(id) {
  return axios({
    method: 'delete',
    url: `${getProductsUrl()}${id}`,
    headers: getAuthHeaderOption(),
  })
}

export function uploadImage(image, objectId) {
  const data = new FormData()
  data.append('image', image, `${objectId || 'missing_object_id'}-${image.name}`)

  return axios({
    url: getImagesUploadUrl(),
    method: 'post',
    headers: getAuthHeaderOption(),
    data,
    onUploadProgress: function (progressEvent) {
      var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      console.log(`${percentCompleted} upload percent completed for ${image.name}`)
    },
  })
}

export function uploadFile(file) {
  const data = new FormData()
  data.append('file', file, `${file.name}`)

  return axios({
    method: 'post',
    url: getFileUploadUrl(),
    headers: getAuthHeaderOption(),
    data,
  })
}

export function loginUser(userData) {
  return axios.post(getAuthUrl(), userData)
}

export function registerUser(userData) {
  return axios.post(getUsersUrl(), userData)
}

export function subscribeUser(email) {
  return axios.post(getSubscribersUrl(), { email })
}
