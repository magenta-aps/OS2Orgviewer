<template>
    <slider v-if="node" @closeflyout="closeDossier">
        <article class="dossier" :id="`details_${ node.uuid }`">
            <div>
                <div class="dossier-avatar">{{ makeAvatar(node.name) }}</div>
                <h2>{{ node.name }}</h2>
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

export default {
    components: {
        PersonLite,
        PersonList,
        Slider,
        Manager
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
        },
        makeAvatar: function(string) {
            return string.substring(0,1)
        }
    },
    created: function() {
        this.fetchOrg(this.uuid)
    }
}
</script>

<style>
    
    .dossier-avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
        background-color: #faa;
        color: #fff;
        font-size: 3rem;
        margin: 0 auto;
    }

</style>