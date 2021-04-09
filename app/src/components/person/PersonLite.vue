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
                    :to="`/person/${ person.uuid }/${ orgUuid }/${ root_org_uuid ? root_org_uuid : null}`">
                    <span class="sr-only">Vis detaljer for </span>
                    {{ person.name }}
                </router-link><br>
                <span v-if="association && association.dynamic_classes && relation_type === 'association'" class="oc-person-asso-mainorg">
                    <span v-for="dc in association.dynamic_classes" :key="dc.uuid">
                        {{ dc.full_name }}
                    </span>
                </span>
            </dd>

            <template v-if="association && relation_type === 'association' && association.substitute">
                <dt>Stedfortræder</dt>
                <dd>
                    <router-link
                        class="oc-person-open"
                        :to="`/person/${ association.substitute.uuid }/${ orgUuid }`">
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
            relation_type: this.$store.state.relation_type
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

.oc-person-asso-mainorg {
    font-size: smaller;
}

</style>