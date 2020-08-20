<template>
    <ul v-if="nodes" class="oc-branch">
        <leaf v-for="node in nodes" :data="node" :key="node.uuid" />
    </ul>
</template>

<script>
import Leaf from './Leaf.vue'

export default {
    name: 'oc-branch',
    components: {
        Leaf
    },
    data: function() {
        return {
            nodes: null
        }
    },
    props: [
        'uuid'
    ],
    methods: {
        fetchOrgChildren: function(uuid) {
            fetch(`${ process.env.VUE_APP_API_BASEURL }/service/ou/${ uuid }/children`)
            .then((response) => {
                return response.json()
            })
            .then((orgs) => {
                this.nodes = orgs
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created: function() {
        this.fetchOrgChildren(this.uuid)
    }
}
</script>

<style>
.oc-branch {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-flow: row nowrap;
    position: relative;
}
.oc-branch::before {
    content: '';
    position: absolute;
    top: -1rem;
    left: 50%;
    width: 3px;
    height: 1rem;
    background-color: #000;
    z-index: 2;
}
</style>