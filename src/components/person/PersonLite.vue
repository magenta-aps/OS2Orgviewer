<template>
    <div v-if="data" class="oc-person-list-item">
        <dl v-if="data.person">
            <dt>{{ data.association_type.name }}</dt>
            <dd>
                <router-link
                    class="oc-person-open"
                    :to="{ name: 'orgchart', query: { target: 'person', root: root_org_uuid, org: data.org_unit.uuid, person: data.person.uuid, orgopen: 1, showchildren: 1 } }">
                    {{ data.person.name }}
                </router-link>
            </dd>
        </dl>
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