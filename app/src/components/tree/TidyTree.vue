<template>
    <ul v-if="tree" class="oc-tt-ul-root" :style="displayBB(tree.boundingBox)">
        <tidy-tree-item :itemData="tree.result" :parentPos="[tree.result.x, tree.result.y]" :boundingBox="tree.boundingBox" />
    </ul>
</template>

<script>
import { BoundingBox, Layout } from 'non-layered-tidy-tree-layout'
import TidyTreeItem from './TidyTreeItem.vue'

const bb = new BoundingBox(1, 3)
const layout = new Layout(bb)

export default {
    components: {
        TidyTreeItem
    },
    computed: {
        root_org_uuid: function() {
            return this.$store.getters.getRootOrgUnitUuid
        },
        org_units: function() {
            return this.$store.getters.getOrgUnits
        },
        tree: function() {
            let tree_data = this.$store.getters.getTreeData
            if (tree_data) {
                return layout.layout(tree_data)
            } else {
                return false
            }
        },
        is_loading: function() {
            return this.$store.getters.isLoading
        }
    },
    watch: {
        org_units: function(new_obj) {
            this.checkToRenderTreeData()
        },
        root_org_uuid: function(new_obj) {
            this.checkToRenderTreeData()
        },
        tree: function(new_tree, old_tree) {
            if (new_tree !== old_tree && !this.is_loading) {
                setTimeout(() => {
                    document.querySelector(`#node-${this.$route.params.orgUnitId} > .oc-tt-node`).scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    })
                }, 300)
            }
        }
    },
    methods: {
        displayBB: function(boundingbox) {
            return `width: ${ boundingbox.right}rem; height: ${ boundingbox.bottom}rem;`
        }, 
        checkToRenderTreeData: function() {
            if (this.org_units && this.root_org_uuid) {
                this.$store.dispatch('updateTreeData')
            }
        }
    }
}
</script>

<style>

@media print {
    
    .oc-tt-ul {
        padding: 0 0 0 30pt;
    }

    .oc-tt-ul-root {
        padding: 0;
        width: auto !important;
        height: auto !important;
    }

    .oc-tt-ul-root > .oc-tt-item::before {
        display: none !important;
    }
}
</style>