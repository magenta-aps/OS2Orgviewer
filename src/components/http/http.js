import 'whatwg-fetch'
import spinner from '../spinner/Spinner.js'

let loadstack = []

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
    return fetch(process.env.VUE_APP_API_BASEURL + request)
    .then((response) => {
        return response.json()
    })
    .then((res) => {
        stopSpin()
        return res
    })
    .catch(err => {
        console.log(err)
        stopSpin()
        return err
    })
}

export default ajax