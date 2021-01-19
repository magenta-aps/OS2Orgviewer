<template>
    <li :id="`node-${ itemData.id }`" class="oc-tt-item" :class="{'active': active_org_uuid === itemData.id}">
        <span class="oc-tt-line" :style="displayItemConnector(itemData, parentPos)"></span>
        <span class="oc-tt-node" :style="displayItemPos(itemData)">
            <span class="oc-tt-node-head"></span>
            <span class="oc-tt-node-body">
                <org-lite :uuid="itemData.id" />
                <root-set-toggle :uuid="itemData.id" />
            </span>
            <expand-toggle :uuid="itemData.id" />
            <span v-if="itemData.children && itemData.children.length > 0" class="oc-tt-node-tail"></span>
        </span>
        <ul class="oc-tt-ul" :id="`branch-${ itemData.id }`">
            <tidy-tree-item v-for="item in itemData.children" :itemData="item" :key="item.id" :parentPos="[itemData.x, itemData.y]" :boundingBox="boundingBox" />
        </ul>
    </li>
</template>

<script>
import OrgLite from '../organisation/OrganisationLite.vue'
import ExpandToggle from './ExpandToggle.vue'
import RootSetToggle from './RootSetToggle.vue'

export default {
    name: 'tidy-tree-item',
    components: {
        OrgLite,
        ExpandToggle,
        RootSetToggle
    },
    props: [
        'itemData',
        'parentPos',
        'boundingBox'
    ],
    computed: {
        active_org_uuid: function() {
            return this.$store.getters.getCurrentOrgUnitUuid
        }
    },
    methods: {
        displayItemPos: function(item) {
            return `top: ${item.y}rem; left: ${item.x}rem; height: ${item.height}rem; width: ${item.width}rem;`
        },
        displayItemConnector: function(item, parent) {
            const top = item.y - 1.5
            let left,
                right
            if (item.x < parent[0]) {
                left = item.x + 5
                right = this.boundingBox.right - parent[0] - 5
            } else {
                left = parent[0] + 5
                right = this.boundingBox.right - item.x - 5.125
            }
            return `top: ${top}rem; left: ${left}rem; right: ${right}rem;`
        }
    }
}
</script>

<style lang="scss">

.oc-tt-node {
    box-sizing: border-box;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;

    .oc-tt-node-body {
        display: flex;
        flex-flow: row nowrap;
        width: 100%;
    }

    .oc-org-link {
        flex: 1 1 auto;
    }

    .oc-node-expand-btn {
        flex: 0 0 1.5rem;
    }
}

.oc-tt-item.active > .oc-tt-node > .oc-tt-node-body > .oc-org-link .svg-point {
    display: inline;
}

.oc-tt-ul {
    list-style: none;
}

@media screen and (max-width: 39.99rem) {

    .oc-tt-item {
        position: relative;
    }

    .oc-tt-node {
        height: auto !important;
    }

    .oc-tt-node-head {
        display: block;
        position: absolute;
        left: -1rem;
        height: 3px;
        width: 1rem;
        top: 1.125rem;
        background-color: $shade-lightest;
    }

    .oc-tt-item::before {
        content: '';
        display: block;
        position: absolute;
        left: -1rem;
        top: -1rem;
        bottom: 0;
        height: auto;
        width: 3px;
        background-color: $shade-lightest;
    }

    .oc-tt-item:last-child:before {
        bottom: auto;
        height: 2.25rem;
    }

    .oc-tt-ul {
        margin: 1rem 0;
    }

    .oc-tt-node-tail {
        display: none;
    }
}

@media screen and (min-width: 40rem) {

    .oc-tt-line {
        position: absolute;
        display: block;
        height: 1px;
        width: auto;
        border-top: solid 3px $shade-lightest;
    }

    .oc-tt-node {
        position: absolute;
        z-index: 2;

        .oc-tt-node-body {
            height: 4rem;
        }
    }

    .oc-tt-node-head,
    .oc-tt-node-tail {
        content: '';
        display: block;
        position: absolute;
        top: -1.5rem;
        height: 1.5rem;
        width: 3px;
        left: 50%;
        background-color: $shade-lightest;
    }

    .oc-tt-node-tail {
        top: 0;
        bottom: -1.5rem;
        height: auto;
        z-index: -1;
    }

    .oc-tt-ul {
        margin: 0;
    }
}

@media print {

    .oc-tt-item {
        position: relative;
    }

    .oc-tt-node  {
        border: solid 1pt black;
        font-size: 9pt;
        padding: 6pt;
        margin: 9pt 0;
        height: auto !important;
    }

    .oc-tt-node-head {
        display: block;
        position: absolute;
        left: -12pt;
        height: 1pt;
        width: 12pt;
        top: 15pt;
        border-top: solid 2pt black;
    }

    .oc-tt-item::before {
        content: '';
        display: block;
        position: absolute;
        left: -12pt;
        top: -9pt;
        bottom: 0;
        height: auto;
        width: 1pt;
        border-left: solid 2pt black;
    }

    .oc-tt-item:last-child:before {
        bottom: auto;
        height: 24pt;
    }
    
}
</style>