<template>
    <div class="oc-search-bar">
        <form @submit.prevent="submitSearch">
            <input type="search" v-model="query">
            <input type="submit" value="Søg">
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

<style>

.oc-search-bar {
    position: relative;
}

</style>