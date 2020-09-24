<template>
    <div class="oc-search" v-if="search_open">
        <h2>Søgning</h2>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            search_open: false
        }
    }
}
</script>

<style lang="scss">

    .oc-search {
        background-color: $shade-lightest;
    }

</style>