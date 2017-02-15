import md5 from 'md5'

export default function(email) {
  return 'https://www.gravatar.com/avatar/' + md5(email)
}

