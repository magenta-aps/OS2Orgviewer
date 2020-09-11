<template>
    <dl v-if="data" class="employee-item">
        <dd v-if="data.person">
            <router-link
                class="oc-person-close"
                :to="{ name: 'orgchart', query: { root: root_org_uuid, org: data.org_unit.uuid, orgopen: 'open', person: data.person.uuid } }">
                {{ data.person.name }}
            </router-link>
        </dd>
    </dl>
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

    .employee-item {
        margin-top: 1rem;
    }

    .employee-item dd {
        margin: 0;
    }

    .oc-person-close {

    }

</style>