<template>
    <ul class="employee-list" v-if="employees">
        <li v-for="employee in employees" :key="employee.uuid">
            <person-lite :data="employee" />
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
        employees: function() {
            return this.$store.getters.getPersons
        }
    },
    watch: {
        uuid: function(new_uuid) {
            this.$store.dispatch('fetchEmployees', new_uuid)
        }
    },
    created: function() {
        this.$store.dispatch('fetchEmployees', this.uuid)
    }
}
</script>

<style>

    .employee-list {
        list-style: none;
        margin: 0;
        padding: 0;
    }

</style>