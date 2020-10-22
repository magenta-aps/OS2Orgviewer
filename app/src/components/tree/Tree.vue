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
        if (this.$route.query.org !== this.$route.query.root) {
            this.$store.dispatch('fetchTree', this.$route.query.org)
        }
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

.oc-chart-root-nav {
    background-color: $shade-lightest;
    width: 100%;
}

.oc-branch.oc-chart-root-branch {
    width: 100%;
    padding-bottom: 2rem;
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

@media screen and (max-width: 40rem) {

    .oc-chart {
        display: block;
        margin: 0;
    }

}

@media screen and (min-width: 40rem) {

    .oc-chart-root-branch {
        padding: 0 0 2rem !important;
        overflow: auto;
        height: 100%;
        width: 100%;
    }

    .oc-chart-root-leaf {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    }

    .oc-chart-root-leaf::before {
        left: 50%;
    }

    .oc-chart-root-leaf > .oc-node-body::before {
        top: auto;
        bottom: -1.25rem;
        height: 1.25rem;
        width: 3px;
        left: 50%;
    }

    .oc-branch.oc-branch-level-1 {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        width: auto;
        margin: 1.25rem auto 0;
    }

    .oc-branch.oc-branch-level-1 > .oc-node {
        padding: 1.25rem 1rem 0;
    }

    .oc-branch.oc-branch-level-1 > .oc-node::before {
        height: 3px;
        width: 100%;
        top: 0;
        left: 0;
    }

    .oc-branch.oc-branch-level-1 > .oc-node:first-child:before {
        width: 100%;
        left: 6rem;
    }

    .oc-branch.oc-branch-level-1 > .oc-node:last-child:before {
        width: 6rem;
    }

    .oc-branch.oc-branch-level-1 > .oc-node > .oc-node-body::before {
        width: 3px;
        height: 1.25rem;
        top: -1.25rem;
        left: 50%;
    }

    .oc-chart-orgopen {
        width: calc(100% - 23rem);
    }

}

@media screen and (min-width: 60rem) {

    .oc-chart-orgopen {
        width: calc(100% - 28rem);
    }

}

@media print {

    .oc-chart {
        display: block !important;
    }

    .oc-chart-root-nav {
        display: none !important;
    }
}
</style>
