<template>
    <button 
        v-if="node_data && node_data.child_count > 0"
        class="oc-node-expand-btn inverse"
        :class="branch_open ? 'close': 'open'"
        :aria-expanded="branch_open ? 'true': 'false'"
        :title="branch_open ? `Skjul ${ node_data.child_count } underenheder` : `Vis ${ node_data.child_count } underenheder`"
        type="button" 
        @click="toggleBranch">
            <svg class="svg-toggle" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path class="svg-path" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
            <span class="sr-only">{{ branch_open ? 'Skjul' : 'Vis' }}</span>
            {{ node_data.child_count }} <span class="sr-only">underenheder</span>
    </button>
</template>

<script>
export default {
    props: [
        'uuid'
    ],
    data: function() {
        return {
            branch_open: false
        }
    },
    computed: {
        node_data: {
            get: function() {
                let node = this.$store.getters.getOrgUnit(this.uuid)
                if (node.showchildren) {
                    this.branch_open = true
                }
                return node
            }, 
            set: function(new_node) {
                this.$store.commit('updateNode', new_node)
            }
        },
        root_org_unit_uuid: function() {
            return this.$store.getters.getRootOrgUnitUuid
        }
    },
    methods: {
        toggleBranch: function() {
            this.branch_open = !this.branch_open
            this.$router.push(`/tree/${ this.node_data.uuid }/${ this.root_org_unit_uuid }?showchildren=${ this.branch_open ? 1 : 0 }`)
            if (this.branch_open) {
                this.node_data.showchildren = true
                this.$store.dispatch('getChildren', this.uuid)
            } else {
                this.node_data.showchildren = false
            }
            this.$store.dispatch('updateTreeData')
        }
    }
    
}
</script>

<style>

.oc-node-expand-btn {
    width: 100%;
    font-size: smaller;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: .125rem .5rem !important;
}

.svg-toggle {
    transition: transform .3s;
}

.svg-toggle .svg-path {
    fill: var(--shade-lightest);
}

.oc-node-expand-btn.close .svg-toggle {
    transform: rotate(180deg);
}

@media print {

    .oc-node-expand-btn {
        display: none !important;
    }
}
</style>