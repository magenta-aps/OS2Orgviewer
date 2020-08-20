<template>
    <div v-if="employees">
        <h3>Ansatte</h3>
        <ul class="employee-list">
            <li v-for="employee in employees" :key="employee.uuid">
                <person-lite :data="employee" />
            </li>
        </ul>
    </div>
</template>

<script>
import PersonLite from './PersonLite.vue'

export default {
    components: {
        PersonLite
    },
    props: [
        'uuid'
    ],
    data: function() {
        return {
            employees: null
        }
    },
    watch: {
        uuid: function(new_val) {
            this.fetchEmployees(new_val)
        }
    },
    methods: {
        fetchEmployees: function(org_uuid) {
            fetch(`${ process.env.VUE_APP_API_BASEURL }/service/ou/${ org_uuid }/details/engagement`)
            .then((response) => {
                return response.json()
            })
            .then((employees) => {
                this.employees = employees
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created: function() {
        this.fetchEmployees(this.uuid)
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