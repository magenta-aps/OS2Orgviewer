<template>
    <dl v-if="managers">
        <template v-for="manager in managers">
            <dt>{{ manager.manager_type.name }}</dt>
            <dd>{{ manager.person.name }}</dd>
        </template>
    </dl>
</template>

<script>
export default {
    props: [
        'orgUuid'
    ],
    data: function() {
        return {
            managers: null
        }
    },
    watch: {
        orgUuid: function(new_val) {
            this.fetchManager(new_val)
        }
    },
    methods: {
        fetchManager: function(org_uuid) {
            fetch(`http://localhost:5001/service/ou/${ org_uuid }/details/manager`)
            .then((response) => {
                return response.json()
            })
            .then((managers) => {
                this.managers = managers
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created: function() {
        this.fetchManager(this.orgUuid)
    }
}
</script>

<style>

</style>