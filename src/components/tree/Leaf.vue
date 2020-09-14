<template>
    <li class="oc-node" v-if="node_data">
        <div class="oc-node-body">
            <org-lite :data="node_data" />
            <router-link 
                v-if="node_data.uuid !== root_org_unit_uuid"
                :to="`/orgchart?root=${ node_data.uuid }`">
                Fokuser
            </router-link>
            <template v-if="determineChildCount(node_data)">
                <button 
                    v-if="!branch_open" 
                    class="oc-node-expand-btn" 
                    type="button" 
                    @click="expandBranch"
                    title="Vis underordnede">
                        + {{ determineChildCount(node_data) }}
                </button>
                <button 
                    v-if="branch_open"
                    class="oc-node-expand-btn"
                    type="button" 
                    @click="collapseBranch"
                    title="Skjul underordnede">
                        - {{ determineChildCount(node_data) }}
                </button>
            </template>
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
        expandBranch: function() {
            this.branch_open = true
            this.$store.dispatch('fetchOrgUnitChildren', this.node_data.uuid)
        },
        collapseBranch: function() {
            this.branch_open = false
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

<style>

    .oc-node {
        position: relative;
        text-align: center;
        padding: 0 .5rem;
        margin: 0 auto;
    }

    .oc-node::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        height: 3px;
        width: 100%;
        background-color: #000;
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

    .oc-node-body {
        background-color: #eee;
        box-shadow: .5rem .5rem 0 hsla(0,0%,0%,.2);
        padding: 0;
        margin: 1rem auto;
        width: 10rem;
        height: auto;
        position: relative;
        text-align: left;
    }

    .oc-node-body::before {
        content: '';
        position: absolute;
        top: -1rem;
        left: 50%;
        width: 3px;
        height: 1rem;
        background-color: #000;
        z-index: 2;
    }

    .oc-node-expand-btn {
        display: block;
        border: none;
        background-color: #eee;
        font-size: smaller;
        padding: .5rem;
        width: 100%;
        text-align: right;
    }

    .oc-node-expand-btn:hover,
    .oc-node-expand-btn:active,
    .oc-node-expand-btn:focus {
        background-color: #ddd;
    }
</style>