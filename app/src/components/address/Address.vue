<template>
    <span>{{ address }}</span>
</template>

<script>
import { getExternal } from '../http/http.js'

export default {
    props: [
        'uuid'
    ],
    data: function() {
        return {
            address: ''
        }
    },
    methods: {
        fetchDAWA: async function(uuid) {
            getExternal(`https://api.dataforsyningen.dk/adresser?id=${ uuid }`)
            .then(res => {
                if (res) {
                    this.address = res[0].adressebetegnelse
                } else {
                    this.address = 'Ukendt'
                }
            })
            .catch(err => {
                console.error(err)
                this.address = 'Ukendt'
            })
        }
    },
    watch: {
        uuid: function(new_val, old_val) {
            this.fetchDAWA(new_val)
        }
    },
    mounted: function() {
        this.fetchDAWA(this.uuid)
    }
}
</script>

<style scoped>

</style>
