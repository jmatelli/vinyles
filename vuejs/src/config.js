export const API_URL = 'https://api.discogs.com'
export const API_TOKEN = 'wqGuPlsuLjmHvKJFDiRtVXQfQsFFXsQmHNVzQETg'
export function requestBuilder(url) {
  return url + '&token=' + API_TOKEN
}
