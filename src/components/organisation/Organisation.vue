<template>
    <slider v-if="node" @closeflyout="closeDossier">
        <article class="oc-org" :id="`details_${ node.uuid }`">
            <oc-header>
                <h2>{{ node.name }}</h2>
            </oc-header>
            <div class="oc-org-body">
                <manager v-for="manager in managers" :data="manager" :key="manager.uuid" />
                <person-list :uuid="node.uuid" />
            </div>
        </article>
    </slider>
</template>

<script>
import Slider from '../layout/Slider.vue'
import PersonLite from '../person/PersonLite.vue'
import PersonList from '../person/PersonList.vue'
import Manager from './Manager.vue'
import OcHeader from '../layout/Header.vue'

export default {
    components: {
        PersonLite,
        PersonList,
        Slider,
        Manager,
        OcHeader
    },
    props: [
        'uuid'
    ],
    data: function() {
        return {
            node: null,
            managers: null
        }
    },
    methods: {
        closeDossier: function() {
            location.hash = `#node_${ this.node.uuid }`
            this.node = null
            this.$emit('closedossier')
        },
        fetchOrg: function(uuid) {
            fetch(`${ process.env.VUE_APP_API_BASEURL }/service/ou/${ uuid }/`)
            .then((response) => {
                return response.json()
            })
            .then((org) => {
                this.node = org
                this.fetchManagers(org.uuid)
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchManagers: function(org_uuid) {
            fetch(`${ process.env.VUE_APP_API_BASEURL }/service/ou/${ org_uuid }/details/manager`)
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
        this.fetchOrg(this.uuid)
    }
}
</script>

<style>

    .oc-header h2 {
        margin: 0;
        padding: 0;
    }

    .oc-org-body {
        padding: 1rem;
    }

</style>