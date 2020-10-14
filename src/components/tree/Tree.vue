<template>
    <div class="oc-chart" v-if="root_org_uuid" :class="{'oc-chart-orgopen': $route.query.orgopen == 1}">
        <nav v-if="root_org_unit && root_org_unit.parent" class="oc-chart-root-nav">
            <router-link 
                class="oc-chart-root-link btn inverse"
                :to="{ name: 'orgchart', query: { root: root_org_unit.parent.uuid, org: root_org_uuid, showchildren: 1, orgopen: 0 } }">
                <svg class="svg-toggle" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path class="svg-path" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
                Niveau op
                <svg class="svg-toggle" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path class="svg-path" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
            </router-link>
        </nav>
        <ul class="oc-branch oc-chart-root-branch">
            <leaf :uuid="root_org_uuid" :show-children="true" class="oc-chart-root-leaf" :level="0" />
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
    height: 100%;
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-flow: column nowrap;
}

.oc-chart .oc-chart-root-node > .oc-node-body::before,
.oc-chart .oc-chart-root-branch::before {
    content: none;
}

.oc-chart-root-nav {
    background-color: $shade-lightest;
    width: 100%;
}

.oc-branch.oc-chart-root-branch {
    width: 100%;
    overflow: auto;
    flex-grow: 1;
}

.oc-chart-root-link {
    display: block !important;
    box-shadow: $shadow-1;
    padding: 0 1.5rem .75rem !important;
    margin: 0 auto;

    .svg-toggle {
        transform: rotate(180deg) translateY(-.33rem);
    }
}

.oc-branch {
    list-style: none;
    padding: 0;
    margin: 0;
}

@media screen and (max-width: 40rem) {

    .oc-chart {
        display: block;
        margin: 0;
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

@media print {
    .oc-chart {
        display: block !important;
    }
}
</style>
