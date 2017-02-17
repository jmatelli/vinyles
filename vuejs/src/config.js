import { discogs, firebase } from './config'

const API_URL = 'http://api.discogs.com'

const API_TOKEN = discogs.token

const FIREBASE_CONFIG = firebase

function requestBuilder(url) {
  return url + '&token=' + API_TOKEN
}

export { API_URL, API_TOKEN, FIREBASE_CONFIG, requestBuilder }
