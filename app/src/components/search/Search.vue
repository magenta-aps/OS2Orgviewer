<template>
    <section class="oc-search">
        <h2 class="oc-search-title">Søg efter afdeling eller person</h2>
        <form @submit.prevent="search" class="oc-search-form">
            <label for="search-input" class="sr-only">Søg</label>
            <input type="search" v-model="query" @input="considerSearching" id="search-input" placeholder="Indtast afdeling eller person">
            <input type="submit" value="Søg" class="inverse oc-search-submit">
        </form>
        <div v-if="results && results.length > 0" class="oc-search-results">
            <h3 class="oc-search-results-header" tabindex="-1">{{ results.length }} søgeresultater</h3>
            <ul class="oc-search-list">
                <li v-for="res in results" :key="res.uuid">
                    <a v-if="res.givenname" href="#" @click.prevent="navToPerson(res.uuid)">
                        <span class="label">Person</span><br>
                        {{ res.name }}
                    </a>
                    <router-link 
                        v-else
                        :to="{ name: 'orgchart', query: { target: 'orgunit', root: root_org_unit_uuid, org: res.uuid, orgopen: 1, showchildren: 1 } }">
                        <span class="label">Enhed</span><br>
                        {{ res.name }}
                    </router-link>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import Vue from 'vue'
import ajax from '../http/http.js'

export default {
    data: function() {
        return {
            query: null,
            results: null,
            timeout: null
        }
    },
    computed: {
        organisation_uuid: function() {
            if (this.$store.getters.getOrganisations) {
                return this.$store.getters.getOrganisations[0].uuid
            } else {
                return false
            }
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
            let search_res = []
            ajax(`/service/o/${ this.organisation_uuid }/e/?query=${ this.query }&associated=true`)
            .then(person_res => {
                ajax(`/service/o/${ this.organisation_uuid }/ou/?query=${ this.query }`)
                .then(org_res => {
                    search_res = person_res.items.concat(org_res.items)
                    this.results = search_res.sort(function(a,b) {
                        return a.name > b.name
                    })
                    Vue.nextTick(() => {
                        document.querySelector('.oc-search-results-header').focus()
                    })
                })    
            })
            
        },
        navToPerson: function(person_uuid) {
            this.$store.dispatch('fetchPersonAssociations', person_uuid)
            .then(associations => {
                this.$router.push({
                    name: 'orgchart',
                    query: {
                        target: 'person',
                        root: this.root_org_unit_uuid,
                        org: associations[0].org_unit.uuid,
                        person: person_uuid,
                        orgopen: 1,
                        showchildren: 1
                    }
                })
            })
        }
    },
    mounted: function() {
        if (!this.organisation_uuid) {
            this.$store.dispatch('fetchGlobalOrgs')
            .then(orgs => {
                this.$store.commit('setOrganisations', orgs)
            })
        }
        document.getElementById('search-input').focus()
    }
}
</script>

<style lang="scss">

.oc-search {
    margin: 0;
    padding: 2rem 0 0;
    background-color: $shade-lightest;
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-flow: column nowrap;
}

.oc-search-title {
    text-align: center;
    font-size: 1.25rem;
    padding: 0;
    margin: 1rem;
}

.oc-search-form {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-self: center;
    padding: 0 1rem 1rem;
}

#search-input {
    padding: .5rem .75rem;
    flex: 1 0 auto;
    max-width: 20rem;
    border: solid 1px $shade-lighter;
    font-size: smaller;
}

.oc-search-submit {
    display: inline-block !important;
    font-size: smaller !important;
    padding: .75rem 1rem !important;
}

.oc-search-results {
    flex: 0 1 auto;
    height: 100%;
    overflow: auto;
    padding: 0 1rem;
}

.oc-search-results-header {
    text-align: center;
    margin: 1rem auto 0;
}

.oc-search-list {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
}

.oc-search-list > li {
    margin: 0 0 .5rem;
}

@media screen and (min-width: 40rem) {

    .oc-search-results-header { 
        margin: 1rem 2rem 0;
    }
    
    .oc-search-list {
        margin-top: 0;
        padding: 2rem;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 1rem 2rem;
    }
}

@media screen and (min-width: 60rem) {

    .oc-search-results-header {
        width: 56rem;
        margin: 1rem auto 0;
    }
    
    .oc-search-list {
        grid-template-columns: 1fr 1fr 1fr 1fr;
        width: 60rem;
    }
}
</style>