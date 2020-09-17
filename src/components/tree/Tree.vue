<template>
    <div class="oc-chart" v-if="root_org_unit" :class="{'oc-chart-orgopen': $route.query.orgopen === 'open'}">
        <router-link 
            v-if="parent"
            class="oc-chart-root-link btn"
            :to="{ name: 'orgchart', query: { root: parent.uuid } }">
            Et niveau op
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
    }
}
</script>

<style lang="scss">

.oc-chart {
    overflow: auto;
    height: 100%;
    width: auto;
    display: flex;
    align-items: flex-start;
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

@media screen and (min-width: 40rem) {

    .oc-branch.oc-chart-root-branch {
        margin: 0 auto;
    }

    .oc-chart-orgopen {
        margin-right: 20rem;
    }

}

@media screen and (min-width: 60rem) {

    .oc-chart-orgopen {
        margin-right: 25rem;
    }

}

</style>
