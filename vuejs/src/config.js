export const API_URL = 'http://api.discogs.com'

export const API_TOKEN = 'wqGuPlsuLjmHvKJFDiRtVXQfQsFFXsQmHNVzQETg'

export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDBnsNWresFKu11LmT49iotnUz8XfrvOT0',
  authDomain: 'vinyles-4b04e.firebaseapp.com',
  databaseURL: 'https://vinyles-4b04e.firebaseio.com',
  storageBucket: 'vinyles-4b04e.appspot.com',
  messagingSenderId: '383821469303',
}

export function requestBuilder(url) {
  return url + '&token=' + API_TOKEN
}
