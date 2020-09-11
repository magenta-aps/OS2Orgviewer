<template>
    <ul v-if="nodes" class="oc-branch">
        <leaf v-for="node in nodes" :uuid="node.uuid" :key="node.uuid" />
    </ul>
</template>

<script>
import Leaf from './Leaf.vue'

export default {
    name: 'oc-branch',
    components: {
        Leaf
    },
    props: [
        'uuid'
    ],
    computed: {
        nodes: function() {
            if (this.uuid) {
                return this.$store.getters.getChildren(this.uuid)
            } else {
                const roots = this.$store.getters.getRootUuids
                let root_nodes = []
                for (let root in roots) {
                    root_nodes.push(this.$store.getters.getNode(roots[root]))
                }
                return root_nodes
            }
        }
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