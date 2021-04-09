<template>
    <dl class="oc-managers" v-if="org_data.manager_data && org_data.manager_data.length > 0">
        <template v-for="m in org_data.manager_data">
            <dt :key="m.manager_type.uuid">{{ m.manager_type.name }}</dt>
            <dd :key="m.uuid">
                <router-link
                    class="oc-person-open"
                    :to="`/person/${ m.person.uuid }/${ org_data.uuid }/${ root_org_uuid ? root_org_uuid : null}`">
                    <span class="sr-only">Vis detaljer for </span>
                    {{ m.person.name }}
                </router-link>
            </dd>
        </template>
    </dl>
</template>

<script>
export default {
    props: [
        'uuid'
    ],
    computed: {
        org_data: function() {
            return this.$store.getters.getOrgUnit(this.uuid)
        },
        root_org_uuid: function() {
            return this.$store.getters.getRootOrgUnitUuid
        }
    }
}
</script>

<style lang="scss">

    .oc-managers {
        margin: 1.5rem 0 0;
        padding-top: 1.5rem;
        border-top: solid 1px $shade-lighter;
    }

</style>