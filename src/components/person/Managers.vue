<template>
    <dl v-if="managers" class="oc-manager-item">
        <template v-for="manager in managers">
            <dt :key="manager.uuid">{{ manager.manager_type.name }}</dt>
            <dd :key="manager.person.uuid">
                <router-link :to="{ name: 'orgchart', query: { root: root_org_uuid, org: uuid, orgopen: 1, person: manager.person.uuid } }">
                    {{ manager.person.name }}
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
    computed:{
        managers: function() {
            return this.$store.getters.getManagers
        },
        root_org_uuid: function() {
            return this.$store.getters.getRootOrgUnitUuid
        }
    },
    watch: {
        uuid: function(new_uuid) {
            this.$store.dispatch('fetchManagers', new_uuid)
        }
    },
    created: function() {
        this.$store.dispatch('fetchManagers', this.uuid)
    }
}
</script>

<style>

    .oc-manager-item {
        margin-top: 1rem;
    }

    .oc-manager-item dd {
        margin: 0;
    }

</style>