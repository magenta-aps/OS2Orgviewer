import 'whatwg-fetch'
import spinner from '../spinner/Spinner.js'
import router from '../../router.js'
import store from '../../store.js'

let loadstack = []

const api_url = OC_GLOBAL_CONF.VUE_APP_API_BASEURL ? OC_GLOBAL_CONF.VUE_APP_API_BASEURL : 'https://moratest.magenta.dk'

const ajax_init = {
    method: 'GET',
    credentials: 'same-origin',
    mode: 'cors'
}

function startSpin() {
    loadstack.push(true)
    if (loadstack.length > 0) {
        spinner.spinOn()
        store.commit('setLoading', true)
    }
}

function stopSpin() {
    loadstack.pop()
    if (loadstack.length < 1) {
        spinner.spinOff()
        store.commit('setLoading', false)
    }
}

function ajax(request, options) {
    if (!options) {
        options = {}
    }
    if (!options.silent) {
        startSpin() 
    }
    return fetch(api_url + request, ajax_init)
    .then((response) => {
        return response.json()
    })
    .then((res) => {
        if (!options.silent) {
            stopSpin()
        }
        return res
    })
    .catch(() => {
        if (!options.silent) {
            stopSpin()
        }
        router.push('/error')
    })
}

export default ajax