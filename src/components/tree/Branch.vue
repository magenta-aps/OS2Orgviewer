<template>

    <ul v-if="nodes && nodes.length > 0" :class="`oc-branch oc-branch-level-${ level }`">
        <leaf v-for="node in nodes" :uuid="node.uuid" :key="node.uuid" :show-children="node.showchildren" :level="level" />
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
        'uuid',
        'level'
    ],
    computed: {
        nodes: function() {
            return this.$store.getters.getChildren(this.uuid)
        }
    },
    watch: {
        uuid: function(new_uuid) {
            this.update(new_uuid)
        }
    },
    methods: {
        update: function(uuid) {
            if (uuid) {
                this.$store.dispatch('fetchOrgUnitChildren', uuid)
            }
        }
    },
    created: function() {
        this.update(this.uuid)
    }
}
</script>

<style lang="scss">

.oc-branch {
    list-style: none;
    padding: 0 0 0 3rem;
    margin: 0;
    display: block;
    position: relative;
}

@media screen and (min-width: 40rem) {
    
}

@media print {


}
</style>