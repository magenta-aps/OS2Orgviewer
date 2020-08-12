<template>
    <div v-if="managers">
        <div v-for="manager in managers" :key="manager.uuid">        
            <h3>{{ manager.manager_type.name }}</h3>
            <p style="margin: 0;">{{ manager.person.name }}</p>
            <addresses :person-uuid="manager.person.uuid" />
        </div>
    </div>
</template>

<script>
import Addresses from '../addresses/Addresses.vue'

export default {
    components: {
        Addresses
    },
    props: [
        'orgUuid'
    ],
    data: function() {
        return {
            managers: null
        }
    },
    watch: {
        orgUuid: function(new_val) {
            this.fetchManager(new_val)
        }
    },
    methods: {
        fetchManager: function(org_uuid) {
            fetch(`http://localhost:5001/service/ou/${ org_uuid }/details/manager`)
            .then((response) => {
                return response.json()
            })
            .then((managers) => {
                this.managers = managers
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created: function() {
        this.fetchManager(this.orgUuid)
    }
}
</script>

<style>

</style>