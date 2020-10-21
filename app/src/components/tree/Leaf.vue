<template>
    <li class="oc-node" v-if="node_data">
        <div class="oc-node-body" :class="{'active': active_org_uuid === node_data.uuid}">
            <div class="oc-node-title">
                <org-lite :data="node_data" />
                <router-link
                    class="oc-node-focus-btn btn"
                    v-if="node_data.uuid !== root_org_unit_uuid"
                    :to="`/orgchart?root=${ node_data.uuid }&org=${ node_data.uuid }&showchildren=1`">
                    <svg class="svg-focus" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path class="svg-path" d="M5 15H3v4c0 1.1.9 2 2 2h4v-2H5v-4zM5 5h4V3H5c-1.1 0-2 .9-2 2v4h2V5zm14-2h-4v2h4v4h2V5c0-1.1-.9-2-2-2zm0 16h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zM12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg>
                    <span class="sr-only">Fokusér på {{ node_data.name }}</span>
                </router-link>
            </div>
            <button 
                v-if="node_data.child_count"
                class="oc-node-expand-btn inverse"
                :class="branch_open ? 'close': 'open'"
                :aria-expanded="branch_open ? 'true': 'false'"
                type="button" 
                @click="toggleBranch">
                    <svg class="svg-toggle" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path class="svg-path" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
                    <span class="sr-only">{{ branch_open ? 'Skjul' : 'Vis' }}</span>
                    {{ node_data.child_count }}
                    <span class="sr-only"> underenheder</span>
            </button>
        </div>
        <branch v-if="branch_open" :uuid="uuid" :level="level + 1" />
    </li>
</template>

<script>
import OrgLite from '../organisation/OrganisationLite.vue'
import Org from '../organisation/Organisation.vue'

export default {
    components: {
        Branch: () => import('./Branch.vue'),
        OrgLite,
        Org
    },
    data: function() {
        return {
            branch_open: false
        }
    },
    props: {
        uuid: String,
        showChildren: {
            type: Boolean,
            default: false
        },
        level: Number
    },
    computed: {
        node_data: function() {
            return this.$store.getters.getOrgUnit(this.uuid)
        },
        root_org_unit_uuid: function() {
            return this.$route.query.root
        },
        active_org_uuid: function() {
            return this.$route.query.org
        },
        query_showchildren_applies: function() {
            if (this.$route.query.org === this.uuid && this.$route.query.showchildren == 1) {
                return true
            } else {
                return false
            }
        }
    },
    watch: {
        showChildren: function(new_bool) {
            this.update(new_bool)
        },
        node_data: function(new_org_unit) {
            this.update(this.showChildren)
        }
    },
    methods: {
        update: function(show_children_bool) {
            if (show_children_bool || this.query_showchildren_applies) {
                this.$store.dispatch('checkOrgChildren', this.uuid)
                this.branch_open = true
            }
        },
        toggleBranch: function() {
            this.branch_open = !this.branch_open
            let route = {
                name: 'orgchart',
                query: {
                    root: this.root_org_unit_uuid, 
                    org: this.node_data.uuid,
                    orgopen: 0,
                    showchildren: this.branch_open ? 1 : 0
                }
            }
            this.$router.push(route)
        }
    },
    created: function() {
        this.update(this.showChildren)
    }
}
</script>

<style lang="scss">

.oc-node {
    position: relative;
    text-align: center;
    padding: 1.25rem 0 0 0;
    margin: 0;
}

.oc-node::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: -1.25rem;
    height: calc(100% + 1rem);
    width: 3px;
    background-color: $shade-lightest;
}

.oc-node:last-child::before {
    height: 2.5rem;
}

.oc-node-body::before {
    content: '';
    display: block;
    position: absolute;
    top: 1.25rem;
    left: -1.25rem;
    height: 3px;
    width: 1.25rem;
    background-color: $shade-lightest;
}

.oc-node-body {
    background-color: $shade-lighter;
    box-shadow: .5rem .5rem 0 hsla(0,0%,0%,.2);
    padding: 0;
    margin: 0;
    width: 10rem;
    height: auto;
    position: relative;
    text-align: left;
}

.oc-node-body.active {
    box-shadow: 0 0 0 .75rem hsla(0,0%,100%,.5);
}

.oc-node-title {
    display: flex;
    flex-flow: row nowrap;
}

.oc-node .oc-org-link {
    flex-grow: 1;
}

.oc-node-expand-btn {
    width: 100%;
    font-size: smaller;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: .125rem .5rem !important;
}

a.oc-node-focus-btn.btn,
a.oc-node-focus-btn.btn:link,
a.oc-node-focus-btn.btn:visited  {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    .svg-focus {
        width: .75rem;
        height: .75rem;
    }

    .svg-path {
        fill: $color-1;
    }
}

a.oc-node-focus-btn.btn:hover,
a.oc-node-focus-btn.btn:active,
a.oc-node-focus-btn.btn:focus {
    .svg-path {
        fill: $shade-darkest;
    }
}

.svg-toggle {
    transition: transform .3s;
}

.svg-toggle .svg-path {
    fill: $shade-lightest;
}

.oc-node-expand-btn.close .svg-toggle {
    transform: rotate(180deg);
}

@media screen and (min-width: 40rem) {

   
}

@media print {

    .oc-node {
        padding: .5rem 0 0 0;
    }

    .oc-node::before {
        content: '';
        display: block;
        border-right: solid 1pt #000;
        height: 100%;
        width: 1pt;
        position: absolute;
        left: -2rem;
        top: 0;
    }

    .oc-node-body {
        background-color: #fff;
        box-shadow: none;
        border: solid 1pt #000;        
    }

    .oc-node-body::before {
        content: '';
        display: block;
        border-top: solid 1pt #000;
        height: 1pt;
        width: 2rem;
        position: absolute;
        left: -2rem;
        top: 1.5rem;
    }

    .oc-node-title a {
        font-size: smaller !important;
        padding: .5rem 1rem !important;
    }

    .oc-node-expand-btn,
    .oc-node-focus-btn {
        display: none !important;
    }
}

</style>