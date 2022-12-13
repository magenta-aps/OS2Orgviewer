import "whatwg-fetch"
import spinner from "../spinner/Spinner.js"
import router from "../../router.js"
import store from "../../store.js"
import { initKeycloak } from "../../keycloak.js"

let loadstack = []

const api_url = process.env.VUE_APP_MO_BASEURL
  ? process.env.VUE_APP_MO_BASEURL
  : "https://moratest.magenta.dk"

const ajax_init = {
  method: "GET",
  credentials: "same-origin",
  mode: "cors",
}

function authFetch(url, args) {
  function addAuthHeader(args) {
    if (args.headers === undefined) {
      args.headers = { Authorization: `Bearer ${store.state.access_token}` }
    } else {
      args.headers["Authorization"] = `Bearer ${store.state.access_token}`
    }
  }

  // Make sure access_token has been retrieved
  if (store.state.access_token === undefined) {
    return initKeycloak().then(() => {
      addAuthHeader(args)
      return fetch(url, args)
    })
  }

  addAuthHeader(args)
  return fetch(url, args)
}

function startSpin() {
  loadstack.push(true)
  if (loadstack.length > 0) {
    spinner.spinOn()
    store.commit("setLoading", true)
  }
}

function stopSpin() {
  loadstack.pop()
  if (loadstack.length < 1) {
    spinner.spinOff()
    store.commit("setLoading", false)
  }
}

function ajax(request, options) {
  if (!options) {
    options = {}
  }
  if (!options.silent) {
    startSpin()
  }
  return authFetch(api_url + request, ajax_init)
    .then((response) => {
      return response.json()
    })
    .then((res) => {
      if (!options.silent) {
        stopSpin()
      }
      return res
    })
    .catch((err) => {
      if (!options.silent) {
        stopSpin()
      }
      console.error(err)
      router.push("/error")
    })
}

function getExternal(url) {
  startSpin()
  return authFetch(url, { method: "GET" })
    .then((response) => {
      return response.json()
    })
    .then((res) => {
      stopSpin()
      return res
    })
    .catch((err) => {
      stopSpin()
      console.error(err)
      router.push("/error")
    })
}

function postQuery(query) {
  startSpin()

  return authFetch(`${api_url}/graphql/v3`, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query), // body data type must match "Content-Type" header
  })
    .then((response) => {
      return response.json()
    })
    .then((res) => {
      stopSpin()
      return res.data
    })
    .catch((err) => {
      stopSpin()
      console.error(err)
      router.push("/error")
    })
}

export { ajax, postQuery, getExternal }
