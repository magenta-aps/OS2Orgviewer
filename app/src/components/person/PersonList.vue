<template>
    <ul class="people-list" v-if="people_list">
        <li v-for="person in people_list">
            <person-lite :person="allpersons[person]" :org-uuid="uuid" />
        </li>
    </ul>
</template>

<script>
import PersonLite from './PersonLite.vue'
import Person from './Person.vue'

export default {
    components: {
        PersonLite,
        Person
    },
    props: [
        'uuid'
    ],
    computed: {
        allpersons: function() {
            return this.$store.getters.getPersons
        },
        people_list: function() {
            return this.$store.getters.getOrgUnit(this.uuid).person_data
        }
    },
    watch: {
        uuid: function(new_uuid) {
            this.update(new_uuid)
        }
    },
    methods: {
        update: function(uuid) {
            this.$store.dispatch('fetchPersons', {
                org_uuid: this.uuid,
                relation: GLOBAL_ORG_PERSON_RELATION
            })
        }
    },
    created: function() {
        this.update(this.uuid)
    }
}
</script>

<style>

    .people-list {
        list-style: none;
        margin: 0;
        padding: 0;
    }

</style>