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
    
    .oc-branch.oc-chart-root-branch {
        display: flex;
        flex-flow: row nowrap;
        padding: 0;
    }

    .oc-branch.oc-chart-root-branch::before {
        content: '';
        position: absolute;
        top: -1rem;
        left: 50%;
        width: 3px;
        height: 1rem;
        background-color: $shade-lightest;
        z-index: 2;
    }

    .oc-branch-level-2::before {
        content: '';
        position: absolute;
        top: -1rem;
        left: 6.5rem;
        width: 3px;
        height: 1rem;
        background-color: $shade-lightest;
    }

    .oc-branch-level-2::after {
        content: '';
        position: absolute;
        top: 0;
        left: 1.75rem;
        width: 5rem;
        height: 3px;
        background-color: $shade-lightest;
    }
}

@media print {


}
</style>