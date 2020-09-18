<template>
    <li class="oc-node" v-if="node_data">
        <div class="oc-node-body">
            <div class="oc-node-title">
                <org-lite :data="node_data" />
                <router-link 
                    class="oc-node-focus-btn btn"
                    v-if="node_data.uuid !== root_org_unit_uuid"
                    :to="`/orgchart?root=${ node_data.uuid }`"
                    :title="`Vis kun ${ node_data.name }`">
                    <svg class="svg-focus" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path class="svg-path" d="M5 15H3v4c0 1.1.9 2 2 2h4v-2H5v-4zM5 5h4V3H5c-1.1 0-2 .9-2 2v4h2V5zm14-2h-4v2h4v4h2V5c0-1.1-.9-2-2-2zm0 16h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zM12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg>
                </router-link>
            </div>
        
            <button 
                v-if="determineChildCount(node_data)"
                class="oc-node-expand-btn btn"
                :class="branch_open ? 'close': 'open'"
                type="button" 
                @click="toggleBranch"
                :title="branch_open ? `Skjul ${determineChildCount(node_data)} underenheder` : `Vis ${determineChildCount(node_data)} underenheder`">
                    <svg class="svg-toggle" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path class="svg-path" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
                    {{ determineChildCount(node_data) }}
            </button>
        
        </div>
        <branch v-if="branch_open" :uuid="uuid" />
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
    props: {
        uuid: String,
        expanded: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            branch_open: false
        }
    },
    computed: {
        node_data: function() {
            return this.$store.getters.getNode(this.uuid)
        },
        root_org_unit_uuid: function() {
            return this.$store.getters.getRootOrgUnitUuid
        },
    },
    methods: {
        toggleBranch: function() {
            this.branch_open = !this.branch_open
            if (this.branch_open) {
                this.$store.dispatch('fetchOrgUnitChildren', this.node_data.uuid)
            }
        },
        determineChildCount: function(data) {
            if (data.children) {
                return data.children.length
            } else if (data.child_count) {
                return data.child_count
            } else {
                return false
            }
        }
    }
}
</script>

<style lang="scss">

.oc-node {
    position: relative;
    text-align: center;
    padding: 0 .5rem;
    margin: 0 auto;
}

.oc-node-body {
    background-color: $shade-lighter;
    box-shadow: .5rem .5rem 0 hsla(0,0%,0%,.2);
    padding: 0;
    margin: 1rem auto;
    width: 10rem;
    height: auto;
    position: relative;
    text-align: left;
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
}

a.oc-node-focus-btn.btn,
a.oc-node-focus-btn.btn:link,
a.oc-node-focus-btn.btn:visited  {
    background-color: $shade-lightest;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    padding: .5rem;

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
    background-color: $color-2;
    
    .svg-path {
        fill: $shade-lightest;
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

@media screen and (max-width: 40rem) {

    .oc-node {
        padding: 1.25rem 0 0 0;
    }

    .oc-node-body {
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
    
}

@media screen and (min-width: 40rem) {

    .oc-node::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        height: 3px;
        width: 100%;
        background-color: $shade-lightest;
    }

    .oc-node:first-child::before {
        width: 50%;
        left: 50%;
    }

    .oc-node:last-child::before {
        width: 50%;
        left: auto;
        right: 50%;
    }

    .oc-node:first-child:last-child::before {
        content: none;
    }

    .oc-node-body::before {
        content: '';
        position: absolute;
        top: -1rem;
        left: 50%;
        width: 3px;
        height: 1rem;
        background-color: $shade-lightest;
        z-index: 2;
    }

}

@media print {

    .oc-node-body {
        background-color: #fff;
        box-shadow: none;
        border: solid 1pt #000;
    }

    .oc-node-body::before {
        background-color: #000;
    }

    .oc-node-expand-btn,
    .oc-node-focus-btn {
        display: none !important;
    }

    .oc-node::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        height: 1pt;
        width: 100%;
        border-top: solid 3pt #000;
    }

    .oc-node:first-child::before {
        width: 50%;
        left: 50%;
    }

    .oc-node:last-child::before {
        width: 50%;
        left: auto;
        right: 50%;
    }

    .oc-node:first-child:last-child::before {
        content: none;
    }

    .oc-node-body::before {
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