import axios from 'axios'
import {API_URL} from './config'

const instance = axios.create({
  baseURL: API_URL,
  // headers: {
  //   'Accept': 'application/json',
  //   'Content-Type': 'application/json',
  // },
})

// instance.defaults.headers.common['Access-Control-Allow-Origin'] = 'https://api-img.discogs.com'

export default instance
