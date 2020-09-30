<template>
    <div class="oc-chart" v-if="root_org_uuid" :class="{'oc-chart-orgopen': $route.query.orgopen == 1}">
        <router-link 
            v-if="root_org_unit && root_org_unit.parent"
            class="oc-chart-root-link btn"
            :to="{ name: 'orgchart', query: { root: root_org_unit.parent.uuid, org: root_org_uuid, showchildren: 1, orgopen: 0 } }">
            Et niveau op
        </router-link>
        <ul class="oc-branch oc-chart-root-branch">
            <leaf :uuid="root_org_uuid" :show-children="true" />
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
        root_org_uuid: function() {
            return this.$route.query.root
        },
        root_org_unit: function() {
            return this.$store.getters.getOrgUnit(this.$route.query.root)
        }
    },
    watch: {
        $route: function(to) {
            this.update(to.query.root)
        }
    },
    methods: {
        update: function(root_uuid) {
            if (root_uuid) {
                this.$store.dispatch('fetchOrgUnit', root_uuid)
            }
        }
    },
    created: function() {
        this.update(this.$route.query.root)
        this.$store.dispatch('fetchTree', this.$route.query.org)
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
    margin: 0 auto;
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
        margin-right: 23rem;
    }

}

@media screen and (min-width: 60rem) {

    .oc-chart-orgopen {
        margin-right: 28rem;
    }

}

</style>
