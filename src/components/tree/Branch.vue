<template>
    <ul v-if="nodes" class="oc-branch">
        <leaf v-for="node in nodes" :uuid="node.uuid" :key="node.uuid" :show-children="node.showchildren" />
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
            return this.$store.getters.getChildren(this.uuid)
        }
    }
}
</script>

<style lang="scss">
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
    background-color: $shade-lightest;
    z-index: 2;
}

@media screen and (max-width: 40rem) {

    .oc-branch {
        display: block;
        padding-left: 2rem;
    }

    .oc-branch::before {
        content: none;
    }
    
}

@media print {

    .oc-branch::before {
        content: '';
        position: absolute;
        top: -1rem;
        left: 50%;
        width: 1pt;
        height: 1rem;
        border-left: solid 3pt #000;
        z-index: 2;
    }

}

</style>