<template>
    <dl v-if="employeeData">
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

</style>