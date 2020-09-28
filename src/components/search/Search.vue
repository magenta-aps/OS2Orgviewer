<template>
    <div class="oc-search" v-if="search_open">
        <h2>Søgning</h2>
        <form @submit.prevent="search">
            <input type="search" v-model="query">
            <input type="submit" value="Søg">
        </form>
        <h3>Personer</h3>
        <ul v-if="person_results">
            <li v-for="res in person_results" :key="res.uuid">
                <router-link :to="`/orgchart?root=${ root_org_unit_uuid }&org=${ root_org_unit_uuid }&person=${ res.uuid }&orgopen=1&showchildren=1`">
                    {{ res.name }}
                </router-link>
            </li>
        </ul>
        <h3>Afdelinger</h3>
        <ul v-if="org_results">
            <li v-for="res in org_results" :key="res.uuid">
                <router-link :to="`/orgchart?root=${ root_org_unit_uuid }&org=${ res.uuid }&orgopen=1&showchildren=1`">
                    {{ res.name }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import ajax from '../http/http.js'

export default {
    data: function() {
        return {
            search_open: false,
            query: null,
            person_results: null,
            org_results: null
        }
    },
    computed: {
        organisation_uuid: function() {
            return this.$store.getters.getOrganisations[0].uuid
        },
        root_org_unit_uuid: function() {
            return this.$store.getters.getRootOrgUnitUuid
        }
    },
    watch: {
        $route: function(to, from) {
            if (to.name === 'search') {
                this.search_open = true
            } else {
                this.search_open = false
            }
        }
    },
    methods: {
        search: function() {
            ajax(`/service/o/${ this.organisation_uuid }/e/?query=${ this.query }`)
            .then(res => {
                this.person_results = res.items
            })
            ajax(`/service/o/${ this.organisation_uuid }/ou/?query=${ this.query }`)
            .then(res => {
                this.org_results = res.items
            })
        }
    }
}
</script>

<style lang="scss">

    .oc-search {
        background-color: $shade-lightest;
        padding: 1rem;
    }

</style>