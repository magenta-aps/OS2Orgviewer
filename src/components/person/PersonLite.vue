<template>
    <dl v-if="data" class="employee-item">
        <dt>{{ data.job_function.name }}</dt>
        <dd>
            <a href="#" @click="details_open = true">
                {{ data.person.name }}
            </a>
            <person v-if="details_open" :data="data.person" @closeflyout="closeDetails" />
        </dd>
    </dl>
</template>

<script>
import Person from './Person.vue'

export default {
    components: {
        Person
    },
    props: [
        'data'
    ],
    data: function() {
        return {
            details_open: false
        }
    },
    methods: {
        closeDetails: function() {
            this.details_open = false
        }
    }
}
</script>

<style>

    .employee-item {
        margin-top: 1rem;
    }

    .employee-item dd {
        margin: 0;
    }

</style>