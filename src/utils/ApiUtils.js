export function buildKarmaCartApiUrl () {
  let host
  if (process.env.REACT_APP_KARMACART_ENVIRONMENT === 'eng' || process.env.REACT_APP_KARMACART_ENVIRONMENT === 'local') {
    host = 'karma-cart-api-eng.andersbuck.dev'
  } else if (process.env.REACT_APP_KARMACART_ENVIRONMENT === 'prod') {
    host = 'karma-cart-api.andersbuck.dev'
  } else {
    throw new Error('Unexpected KarmaCart environment!')
  }
  return `https://${host}`
}

export const KARMACART_API_URL = buildKarmaCartApiUrl()
