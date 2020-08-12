<template>
    <li class="oc-node">
        <div class="oc-node-body">
            <micro-dossier :node-data="nodeData" />
            <button 
                v-if="!branch_open && nodeData.child_count > 0" 
                class="oc-node-expand-btn" 
                type="button" 
                @click="expandBranch"
                title="Vis underordnede">
                    ⊕ {{ nodeData.child_count }}
            </button>
            <button 
                v-if="branch_open" 
                class="oc-node-expand-btn" 
                type="button" 
                @click="collapseBranch"
                title="Skjul underordnede">
                    ⊖
            </button>
        </div>
        <oc-branch v-if="branch_open" :uuid="nodeData.uuid" />
    </li>
</template>

<script>
import MicroDossier from '../dossier/MicroDossier.vue'

export default {
    components: {
        OcBranch: () => import('./Branch.vue'),
        MicroDossier
    },
    props: [
        'nodeData'
    ],
    data: function() {
        return {
            branch_open: false
        }
    },
    methods: {
        expandBranch: function() {
            this.branch_open = true
        },
        collapseBranch: function() {
            this.branch_open = false
        },
        // We might not need this
        fetchOrg: function(uuid) {
            fetch(`http://localhost:5001/service/ou/${ uuid }/`)
            .then((response) => {
                return response.json()
            })
            .then((org) => {
                
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style>
.oc-node {
    position: relative;
    text-align: center;
    padding: 0 1rem;
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
    box-shadow: .5rem .5rem 0 hsla(0,0%,0%,.33);
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