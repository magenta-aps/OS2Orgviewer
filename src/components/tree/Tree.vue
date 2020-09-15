<template>
    <div class="oc-chart" v-if="root_org_unit">
        <router-link 
            v-if="parent"
            class="oc-chart-root-link btn"
            :to="{ name: 'orgchart', query: { root: parent.uuid } }">
            {{ parent.name }}
        </router-link>

        <ul class="oc-branch oc-chart-root-branch">
            <leaf :uuid="root_org_unit_uuid" />
        </ul>

    </div>
</template>

<script>
import Leaf from './Leaf.vue'

export default {
    components: {
        Leaf
    },
    computed: {
        root_org_unit_uuid: function() {
            return this.$store.getters.getRootOrgUnitUuid
        },
        root_org_unit: function() {
            return this.$store.getters.getNode(this.root_org_unit_uuid)
        },
        parent: function() {
            return this.$store.getters.getNode(this.root_org_unit.parent_uuid)
        }
    },
    watch: {
        $route: function(to, from) {
            if (to.query.root !== from.query.root) {
                this.$store.commit('setRootOrgUnitUuid', to.query.root)
            }
        }
    },
    created: function() {
        // Look up url params and initialize tree component based on that
        if (this.$route.query.root) {
            this.$store.dispatch('initFromRoot', this.$route.query.root)
        } else {
            this.$store.dispatch('initFromNothing')
        }

        window.rq = this.$route.query
    }
}
</script>

<style lang="scss">

.oc-chart {
    flex-grow: 1;
    overflow: auto;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    flex-flow: column nowrap;
}

.oc-chart .oc-chart-root-node > .oc-node-body::before,
.oc-chart .oc-chart-root-branch::before {
    content: none;
}

.oc-chart-root-link {
    display: inline-block !important;
    box-shadow: $shadow-2;
}

.oc-branch {
    list-style: none;
    padding: 0;
    margin: 0;
}

@media screen and (max-width: 40rem) {

    .oc-chart {
        display: block;
        margin: 0 0 0 1rem;
    }

    .oc-branch.oc-chart-root-branch {
        padding-left: 0;
    }

}

</style>
