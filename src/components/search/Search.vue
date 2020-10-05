<template>
    <div class="oc-search">
        <h2>Søgning</h2>
        <form @submit.prevent="search">
            <input type="search" v-model="query" @input="considerSearching">
            <input type="submit" value="Søg">
        </form>
        <section v-if="person_results && person_results.length > 0">
            <h3>Personer</h3>
            <ul class="oc-search-list">
                <li v-for="res in person_results" :key="res.uuid">
                    <a href="#" @click.prevent="navToPerson(res.uuid)">{{ res.name }}</a>
                </li>
            </ul>
        </section>
        <section v-if="org_results && org_results.length > 0">
            <h3>Afdelinger</h3>
            <ul class="oc-search-list">
                <li v-for="res in org_results" :key="res.uuid">
                    <router-link :to="`/orgchart?root=${ root_org_unit_uuid }&org=${ res.uuid }&orgopen=1&showchildren=1`">
                        {{ res.name }}
                    </router-link>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
import ajax from '../http/http.js'

export default {
    data: function() {
        return {
            query: null,
            person_results: null,
            org_results: null,
            timeout: null
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
    methods: {
        debounce: function(func, wait) {
            return () => {
                const context = this,
                    args = arguments,
                    later = () => {
                        this.timeout = null
                        func.apply(context, args)
                    }
                clearTimeout(this.timeout)
                this.timeout = setTimeout(later, wait)
            }
        },
        considerSearching: function() {
            if (this.query.length > 2) {
                this.debounce(this.search, 300)()
            }
        },
        search: function() {
            ajax(`/service/o/${ this.organisation_uuid }/e/?query=${ this.query }`)
            .then(res => {
                this.person_results = res.items
            })
            ajax(`/service/o/${ this.organisation_uuid }/ou/?query=${ this.query }`)
            .then(res => {
                this.org_results = res.items
            })
        },
        navToPerson: function(person_uuid) {
            this.$store.dispatch('fetchPersonAssociations', person_uuid)
            .then(associations => {
                if (!associations || associations.length < 1) {
                    alert('Denne person er ikke tilknyttet nogen enhed i organisationen.')
                    return
                }
                this.$router.push({
                    name: 'orgchart',
                    query: {
                        root: this.root_org_unit_uuid,
                        org: associations[0].org_unit.uuid,
                        person: person_uuid,
                        orgopen: 1,
                        showchildren: 1
                    }
                })
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

    .oc-search-list {
        list-style: none;
        margin: 0;
        padding: 0;
    }

</style>