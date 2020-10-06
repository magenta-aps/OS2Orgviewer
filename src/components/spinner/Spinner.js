import './spinner.scss'

/**
 * Create a GUI spinner instance. Handy for when users have to wait for something to load.
 * @returns {object} spinner instance
 * @kind function
 */
const spinner = function() {

    const spin_el = document.createElement('div')
    spin_el.id = 'spinner'
    spin_el.role = 'alert'

    const
        /**
         * Test if a spinner is already in the GUI
         * @memberof spinner
         * @returns {boolean} True if a spinner element is in the DOM
         * @kind function
         */
        testSpin = function() {
            if (document.getElementById('spinner')) {
                return true
            } else {
                return false
            }
        },
        /**
         * Start a GUI spinner
         * @memberof spinner
         * @kind function
         */
        spinOn = function() {
            if (!testSpin()) {
                document.body.appendChild(spin_el)
            }
        },
        /**
         * Stop a GUI spinner
         * @memberof spinner
         * @kind function
         */
        spinOff = function() {
            if (testSpin()) {
                document.body.removeChild(spin_el)
            }
        }

    return {
        spinOn,
        spinOff
    }
}

export default spinner()