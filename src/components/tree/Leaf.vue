<template>
    <li class="oc-node" v-if="node_data">
        <div class="oc-node-body">
            <org-lite :data="node_data" />
            <div class="oc-node-actions">
                <template v-if="determineChildCount(node_data)">
                    <button 
                        v-if="!branch_open" 
                        class="oc-node-expand-btn btn open"
                        type="button" 
                        @click="expandBranch"
                        title="Vis underenheder">
                            {{ determineChildCount(node_data) }}
                    </button>
                    <button 
                        v-if="branch_open"
                        class="oc-node-expand-btn btn close"
                        type="button" 
                        @click="collapseBranch"
                        title="Skjul underenheder">
                            {{ determineChildCount(node_data) }}
                    </button>
                </template>
                <router-link 
                    class="oc-node-focus-btn btn"
                    v-if="node_data.uuid !== root_org_unit_uuid"
                    :to="`/orgchart?root=${ node_data.uuid }`"
                    :title="`Fokusér på ${ node_data.name }`">
                    ☆
                </router-link>
            </div>
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

.oc-node-actions {
    display: flex;
    justify-content: flex-end;
}

.oc-node-expand-btn {
    font-size: smaller;
    text-align: right;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.oc-node-expand-btn::before {
    content: '';
    display: inline-block;
    width: .25rem;
    height: .25rem;
    margin: 0 .25rem 0 0;
    border: solid 0 $shade-lightest;
    border-width: 2px 2px 0 0;
    transition: transform .3s;
    transform: rotate(-45deg);
}

.oc-node-expand-btn.open::before {
    transform: rotate(135deg);
}

button.oc-node-focus-btn {
    background-color: $color-2;
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

</style>