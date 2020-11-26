<template>
    <ul class="people-list" v-if="people_list">
        <li v-for="person in people_list" :key="person.uuid">
            <person-lite :person="person" :org-uuid="uuid" />
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
            let list = this.$store.getters.getOrgUnit(this.uuid).person_data

            if (GLOBAL_ORG_PERSON_RELATION === 'association') {
                return this.processByAssociation(list)
            } else {
                return this.processByEngagement(list)
            }
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
        },
        processByAssociation: function(people_list) {
            let unsorted_persons = [],
                sorted_persons = []

            for (let p in people_list) {
                let person = this.allpersons[people_list[p]]
                
                const association = person.association_data.find(a => {
                    return a.org_unit.uuid === this.uuid
                })

                switch (association.association_type.name) {
                    case 'Formand':
                        person.weight = 10
                    break
                    case 'LR, formand':
                        person.weight = 10
                    break
                    case 'LR':
                        person.weight = 9
                    break
                    case 'FTR, næstformand':
                        person.weight = 8
                    break
                    case 'TR, næstformand':
                        person.weight = 8
                    break
                    case 'Medarb.rep, næstformand':
                        person.weight = 8
                    break
                    case 'FTR':
                        person.weight = 7
                    break
                    case 'TR':
                        person.weight = 6
                    break
                    case 'Medarb.rep':
                        person.weight = 5
                    break
                    case 'AMR, næstformand':
                        person.weight = 4
                    break
                    case 'Næstformand':
                        person.weight = 4
                    break
                    case 'AMR':
                        person.weight = 3
                    break
                    default:
                        person.weight = 0
                }
                unsorted_persons.push(person)
            }
            sorted_persons = unsorted_persons.sort(function(a,b) {
                return a.weight < b.weight
            })
            return sorted_persons
        },
        processByEngagement: function(people_list) {
            let unsorted_persons = []

            for (let p in people_list) {
                let person = this.allpersons[people_list[p]]
                
                const association = person.engagement_data.find(a => {
                    return a.org_unit.uuid === this.uuid
                })

                unsorted_persons.push(person)
            }
            return unsorted_persons
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