<template>
    <article class="oc-org" v-if="org_visible && org_data">
        <oc-header>
            <h2 slot="title" tabindex="-1" id="orgtitle">{{ org_data.name }}</h2>
        </oc-header>
        <div class="oc-org-body">
            <!-- Managers seem to be redundant as they also appear in personlist -->
            <!-- <managers :uuid="org_data.uuid" /> -->
            <person-list :uuid="org_data.uuid" />
        </div>
        <router-link :to="{ name: 'orgchart', query: { root: root_org_uuid, org: org_data.uuid, orgopen: 'closed' } }" class="btn">
            Luk
        </router-link>
    </article>
</template>

<script>
import PersonList from '../person/PersonList.vue'
import Managers from '../person/Managers.vue'
import OcHeader from '../layout/Header.vue'
import store from '../../store.js'

export default {
    components: {
        PersonList,
        Managers,
        OcHeader
    },
    computed: {
        org_visible: function() {
            return this.$store.getters.getActiveOrgVisibility
        },
        org_uuid: function() {
            return this.$store.getters.getActiveOrgUuid
        },
        org_data: function() {
            return this.$store.getters.getNode(this.org_uuid)
        },
        root_org_uuid: function() {
            return this.$store.getters.getRootOrgUnitUuid
        }
    }
}
</script>

<style>

    .oc-org {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        background-color: #fff;
        z-index: 10;
        display: flex;
        flex-flow: column nowrap;
        overflow: auto;
    }

    .oc-header h2 {
        margin: 0;
        padding: 0;
    }

    .oc-org-body {
        padding: 1rem;
        flex-grow: 1;
        overflow: auto;
    }

    @media screen and (min-width: 40rem) {
        .oc-org {
            max-width: 30rem;
        }
    }

</style>