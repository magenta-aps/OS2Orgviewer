<template>
    <ul class="people-list" v-if="people">
        <li v-for="person in people" :key="person.uuid">
            <person-lite :data="person" />
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
        people: function() {
            return this.$store.getters.getPersons
        }
    },
    watch: {
        uuid: function(new_uuid) {
            this.$store.dispatch('fetchAssociatedPeople', new_uuid)
        }
    },
    created: function() {
        this.$store.dispatch('fetchAssociatedPeople', this.uuid)
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