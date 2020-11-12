<template>
    <div v-if="person" class="oc-person-list-item">

        <dl>
            
            <template v-if="engagement && relation_type === 'engagement'">
                <dt>{{ engagement.job_function.name }}</dt>
            </template>

            <template v-if="association && relation_type === 'association'">        
                <dt>{{ association.association_type.name }}</dt>
            </template>

            <dd>
                <router-link
                    class="oc-person-open"
                    :to="{ name: 'orgchart', query: { target: 'person', root: root_org_uuid, org: orgUuid, person: person.uuid, orgopen: 1, showchildren: 1 } }">
                    <span class="sr-only">Vis detaljer for </span>
                    {{ person.name }}
                </router-link>
            </dd>

            <template v-if="association && relation_type === 'association' && association.substitute">
                <dt>Stedfortræder</dt>
                <dd>
                    <router-link
                        class="oc-person-open"
                        :to="{ name: 'orgchart', query: { target: 'person', person: association.substitute.uuid, orgopen: 1, showchildren: 1 } }">
                        <span class="sr-only">Vis detaljer for </span>
                        {{ association.substitute.name }}
                    </router-link>
                </dd>
            </template>

        </dl>
    </div>
</template>

<script>
export default {
    props: [
        'person',
        'orgUuid'
    ],
    data: function() {
        return {
            relation_type: GLOBAL_ORG_PERSON_RELATION
        }
    },
    computed: {
        association: function() {
            if (this.person.association_data) {
                return this.person.association_data.find(e => {
                    return e.org_unit.uuid === this.orgUuid
                })
            } else {
                return false
            }
        },
        engagement: function() {
            if (this.person.engagement_data) {
                return this.person.engagement_data.find(e => {
                    return e.org_unit.uuid === this.orgUuid
                })
            } else {
                return false
            }
        },
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