import store from './store.js'

const clientId = 'orgviewer'
const realm = 'mo'

export async function initKeycloak() {
  const url = `${store.state.global_api_url}/auth`
  const clientSecret = store.state.keycloak_client_secret

  const keycloak_url = `${url}/realms/${realm}/protocol/openid-connect/token`

  const res = await fetch(
      keycloak_url, {
      method: 'POST',
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )

  const json = await res.json()
  store.commit('setAccessToken', json.access_token)

  // Token refresh
  setInterval(() => {
    initKeycloak().catch(() => {
      console.error("Failed to refresh token")
    })
  }, 60000)
}
