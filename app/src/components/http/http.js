import 'whatwg-fetch'
import spinner from '../spinner/Spinner.js'
import router from '../../router.js'

let loadstack = []

const ajax_init = {
    method: 'GET',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-Client-Name': 'OS2mo-UI'
    },
    credentials: 'same-origin',
    mode: 'cors'
}

function startSpin() {
    loadstack.push(true)
    if (loadstack.length > 0) {
        spinner.spinOn()
    }
}

function stopSpin() {
    loadstack.pop()
    if (loadstack.length < 1) {
        spinner.spinOff()
    }
}

function ajax(request, options) {
    if (!options) {
        options = {}
    }
    if (!options.silent) {
        startSpin() 
    }
    return fetch(GLOBAL_API_URL + request, ajax_init)
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