<template>
    <div class="people-list-wrapper" v-if="people_list">
        <ul class="people-list" v-if="people_list.length > 0">
            <li v-for="person in people_list" :key="person.uuid">
                <person-lite :person="person" :org-uuid="uuid" />
            </li>
        </ul>
        <p class="people-list-empty" v-if="!is_loading && people_list.length === 0">
            Ingen <span v-if="relation_type === 'association'">tilknyttede</span><span v-else>ansatte</span> fundet
        </p>
    </div>
</template>

<script>
import PersonLite from './PersonLite.vue'
import Person from './Person.vue'

export default {
    components: {
        PersonLite,
        Person
    },
    data: function() {
        return {
            relation_type: this.$store.state.relation_type
        }
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

            if (this.relation_type === 'association') {
                return this.processByAssociation(list)
            } else {
                return this.processByEngagement(list)
            }
        },
        is_loading: function() {
            return this.$store.getters.isLoading
        }
    },
    watch: {
        uuid: function(new_uuid, old_uuid) {
            if (new_uuid !== old_uuid) {
                this.update(new_uuid)
            }   
        }
    },
    methods: {
        update: function(uuid) {
            this.$store.dispatch('fetchPersons', {
                org_uuid: this.uuid,
                relation: this.relation_type
            })
        },
        processByAssociation: function(people_list) {
            if (people_list) {
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
                    return b.weight - a.weight
                })
                return sorted_persons
            }
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

<style lang="scss">

    .people-list-wrapper {
        margin: 1.5rem 0 0;
        padding: 1.5rem 0 0;
        border-top: solid 1px $shade-lighter;
    }

    .people-list {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .people-list-empty {
        padding: 0;
        margin: 0;
    }

</style>