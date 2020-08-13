<template>
    <div v-if="employees">
        <h3>Ansatte</h3>
        <ul class="employee-list">
            <li v-for="employee in employees" :key="employee.uuid">
                <employee :employee-data="employee" />
                <addresses :person-uuid="employee.person.uuid" />
            </li>
        </ul>
    </div>
</template>

<script>
import Employee from './EmployeeItem.vue'
import Addresses from '../addresses/Addresses.vue'

export default {
    components: {
        Employee,
        Addresses
    },
    props: [
        'orgUuid'
    ],
    data: function() {
        return {
            employees: null
        }
    },
    watch: {
        orgUuid: function(new_val) {
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
        this.fetchEmployees(this.orgUuid)
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