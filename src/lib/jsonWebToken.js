import jwt_decode from 'jwt-decode'

export const decodeJwt = (token) => {
  if (token) {
    token = token.replace('Bearer ', '')
    const decoded = jwt_decode(token)
    return decoded
  }
}
