<template>
    <section class="oc-search">
        <h2 class="oc-search-title">Søg efter afdeling eller person</h2>
        <form @submit.prevent="search" class="oc-search-form">
            <label for="search-input" class="sr-only">Søg</label>
            <input type="search" v-model="query" @input="considerSearching" id="search-input" placeholder="Indtast afdeling eller person">
            <input type="submit" value="Søg" class="inverse oc-search-submit">
        </form>
        <div v-if="results && results.length > 0">
            <h3 class="oc-search-results-header" tabindex="-1">{{ results.length }} søgeresultater</h3>
            <ul class="oc-search-list">
                <li v-for="res in results" :key="res.uuid">
                    <a v-if="res.givenname" href="#" @click.prevent="navToPerson(res.uuid)">{{ res.name }}</a>
                    <router-link 
                        v-else
                        :to="{ name: 'orgchart', query: { target: 'orgunit', root: root_org_unit_uuid, org: res.uuid, orgopen: 1, showchildren: 1 } }">
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
            let search_res = []
            ajax(`/service/o/${ this.organisation_uuid }/e/?query=${ this.query }`)
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
                if (!associations || associations.length < 1) {
                    alert('Denne person er ikke tilknyttet nogen enhed i organisationen.')
                    return
                }
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
        document.getElementById('search-input').focus()
    }
}
</script>

<style lang="scss">

.oc-search {
    margin: 0;
    padding: 2rem 1rem;
    background-color: $shade-lightest;
    height: 100%;
    width: 100%;
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
    padding: 0 0 1rem;
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

.oc-search-results-header {
    text-align: center;
    margin: 1rem auto 0;
}

.oc-search-list {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    overflow: auto;
    height: 100%;
    column-count: 5;
    column-width: 12rem;
    column-gap: 2rem;
}

.oc-search-list > li {
    margin: 0 0 .5rem;
}

@media screen and (min-width: 40rem) {
    
    .oc-search {
        
    }
}
</style>