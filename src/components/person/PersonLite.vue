<template>
    <div v-if="data" class="oc-person-list-item">
        <template v-if="data.person">
            <router-link
                class="oc-person-open"
                :to="{ name: 'orgchart', query: { root: root_org_uuid, org: data.org_unit.uuid, orgopen: 'open', person: data.person.uuid } }">
                {{ data.person.name }}
            </router-link>
        </template>
    </div>
</template>

<script>
export default {
    props: [
        'data'
    ],
    computed: {
        root_org_uuid: function() {
            return this.$store.getters.getRootOrgUnitUuid
        }
    }
}
</script>

<style>

.oc-person-list-item {
    margin: 0 0 .5rem;
}

</style>