<template>
    <div class="oc-search-bar">
        <form @submit.prevent="submitSearch">
            <input type="search" v-model="query">
            <button class="" type="submit" title="Søg">
                <svg class="oc-search-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path class="oc-search-svg-path" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            </button>
        </form>
        <search-result v-if="search_results" :results="search_results" />
    </div>
</template>

<script>
import SearchResult from './SearchResult.vue'

export default {
    components: {
        SearchResult
    },
    data: function() {
        return {
            query: null,
            search_results: null
        }
    },
    methods: {
        submitSearch: function() {
            // Inserting dummy search results
            this.search_results = [
                {uuid: '238gbkhef', name: 'Skole og børn', type: 'org'},
                {uuid: 'glhsnsglihso8h3', name: 'Social og sundhed', type: 'org'},
                {uuid: 'h83hsljdf', name: 'Ludvig Lund Schou Henriksen', type: 'person'},
                {uuid: '3o8hskuhlsj3f', name: 'Ragnhild Bruun Pasalic', type: 'person'},
                {uuid: '3o8hskuhlsj3f', name: 'Jane Kock', type: 'person'}
            ]
        }
    }
}
</script>

<style lang="scss">

.oc-search-bar {
    position: relative;
}

.oc-search-svg-path {
    fill: $color-1;
}

</style>