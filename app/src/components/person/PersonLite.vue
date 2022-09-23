<template>
    <div v-if="person" class="oc-person-list-item">
        <dl>

            <template v-if="relation_type === 'association'">        
                <dt>{{ person.association_type.name }}</dt>
            </template>
            <template v-else>
                <dt>{{ person.job_function.name }}</dt>
            </template>

            <dd>
                <router-link
                    class="oc-person-open"
                    :to="`/person/${ person.employee[0].uuid }/${ org_uuid }/${ root_uuid }`">
                    <span class="sr-only">Vis detaljer for </span>
                    {{ person.employee[0].name }}
                </router-link><br>
                <span v-if="person.dynamic_class && relation_type === 'association'" class="oc-person-asso-mainorg">
                    <span v-if="person.dynamic_class.parent">
                        {{ person.dynamic_class.parent.name }} /
                    </span>
                    {{ person.dynamic_class.name }} 
                </span>
            </dd>

            <template v-if="relation_type === 'association' && person.substitute">
                <dt>Stedfortræder</dt>
                <dd>
                    <router-link
                        class="oc-person-open"
                        :to="`/person/${ person.substitute.uuid }/${ org_uuid }`">
                        <span class="sr-only">Vis detaljer for </span>
                        {{ person.substitute.name }} 
                    </router-link>
                </dd>
            </template>

        </dl>
    </div>
</template>

<script>
export default {
    props: [
        'person'
    ],
    data: function() {
        return {
            relation_type: this.$store.state.relation_type
        }
    },
    computed: {
        root_uuid: function() {
            return this.$store.getters.getRootUuid
        },
        org_uuid: function() {
            return this.$route.params.orgUnitId ? this.$route.params.orgUnitId : this.root_uuid
        }
    }
}
</script>

<style>

.oc-person-list-item {
    margin: 0 0 .5rem;
}

.oc-person-asso-mainorg {
    font-size: smaller;
}

</style>
