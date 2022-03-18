<template>
    <ul v-if="list" class="oc-engagements">
        <li v-for="engagement in list" :key="engagement.uuid">
            {{ engagement.org_unit.name }}
        </li>
    </ul>
</template>

<script>
export default {
    props: [
        'list'
    ]
}
</script>

<style>

    .oc-engagements {
        list-style: none;
        padding: 0;
        margin: 0;
    }

</style>