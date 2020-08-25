<template>
    <ul class="oc-search-result">
        <li v-for="result in results" :key="result.uuid">
            <dl>
                <dt v-if="result.type === 'org'">Afdeling</dt>
                <dt v-else>Medarbejder</dt>
                <dd><a href="#">{{ result.name }}</a></dd>
            </dl>
        </li>
    </ul>
</template>

<script>
export default {
    props: [
        'results'
    ]
}
</script>

<style>

.oc-search-result {
    position: absolute;
    top: 1.5rem;
    z-index: 5;
    list-style: none;
    padding: 1rem;
    margin: 0;
    background-color: white;
}

</style>