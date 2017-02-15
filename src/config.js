const API_URL = 'http://api.discogs.com'

const API_TOKEN = 'wqGuPlsuLjmHvKJFDiRtVXQfQsFFXsQmHNVzQETg'

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyCrdQVOoZ1dolkAweUQc-wV18Vy_P0Q9DY',
  authDomain: 'vinyles-5dc00.firebaseapp.com',
  databaseURL: 'https://vinyles-5dc00.firebaseio.com',
  storageBucket: 'vinyles-5dc00.appspot.com',
  messagingSenderId: '305759742431',
}

function requestBuilder(url) {
  return url + '&token=' + API_TOKEN
}

export { API_URL, API_TOKEN, FIREBASE_CONFIG, requestBuilder }
