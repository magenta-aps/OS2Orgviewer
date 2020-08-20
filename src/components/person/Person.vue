<template>
    <slider @closeflyout="closeFlyout">
        <article v-if="data" class="oc-person">
            <oc-header>
                <h3>{{ data.name }}</h3>
            </oc-header>
            <dl class="oc-person-body">
                <dt>Navn</dt>
                <dd>{{ data.name }}</dd>
            
                <template v-if="addresses && address_open">
                    <template v-for="address in addresses">
                        <dt :key="address.address_type.uuid">{{ address.address_type.name }}</dt>
                        <dd :key="address.uuid">{{ address.name }}</dd>
                    </template>
                </template>
            </dl>
        </article>
    </slider>
</template>

<script>
import Slider from '../layout/Slider.vue'
import OcHeader from '../layout/Header.vue'

export default {
    components: {
        Slider,
        OcHeader
    },
    props: [
        'data'
    ],
    data: function() {
        return {
            addresses: null
        }
    },
    watch: {
        data: function(new_val) {
            this.fetchAdresses(new_val.uuid)
        }
    },
    methods: {
        closeFlyout: function() {
            this.$emit('closeflyout')
        },
        fetchAdresses: function(person_uuid) {
            fetch(`${ process.env.VUE_APP_API_BASEURL }/service/e/${ person_uuid }/details/address`)
            .then((response) => {
                return response.json()
            })
            .then((addresses) => {
                this.addresses = addresses
                this.address_open = true
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created: function() {
        this.fetchAdresses(this.data.uuid)
    }
}
</script>

<style>

.oc-header h3 {
    margin: 0;
    padding: 0;
}

.oc-person-body {
    padding: 1rem;
}

</style>