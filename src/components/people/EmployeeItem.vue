<template>
    <dl v-if="employeeData" class="employee-item">
        <dt>{{ employeeData.job_function.name }}</dt>
        <dd>{{ employeeData.person.name }}</dd>
    </dl>
</template>

<script>
export default {
    props: [
        'employeeData'
    ]
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