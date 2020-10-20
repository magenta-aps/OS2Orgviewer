import 'whatwg-fetch'
import spinner from '../spinner/Spinner.js'
import router from '../../router.js'

let loadstack = []

const ajax_init = {
    method: 'GET',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-Client-Name': 'OS2mo-UI',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT'
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

function ajax(request) {
    startSpin()
    return fetch(GLOBAL_API_URL + request, ajax_init)
    .then((response) => {
        return response.json()
    })
    .then((res) => {
        stopSpin()
        return res
    })
    .catch(err => {
        stopSpin()
        router.push('/error')
        //return err
    })
}

export default ajax