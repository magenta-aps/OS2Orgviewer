<template>
  <section class="oc-search">
    <h2 class="oc-search-title">Søg efter afdeling eller person</h2>
    <form @submit.prevent="search" class="oc-search-form">
      <label for="search-input" class="sr-only">Søg</label>
      <input
        type="search"
        v-model="query"
        @input="considerSearching"
        id="search-input"
        placeholder="Indtast afdeling eller person"
      />
      <input type="submit" value="Søg" class="inverse oc-search-submit" />
    </form>
    <div v-if="results && results.length > 0" class="oc-search-results">
      <h3 class="oc-search-results-header" tabindex="-1">
        {{ results.length }} søgeresultater
      </h3>
      <ul class="oc-search-list">
        <li v-for="res in results" :key="res.uuid">
          <router-link v-if="res.givenname" :to="`/person/${res.uuid}`">
            <span class="label">Person</span><br />
            {{ res.name }}
          </router-link>
          <router-link v-else :to="`/orgunit/${res.uuid}`">
            <span class="label">Enhed</span><br />
            {{ res.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import Vue from "vue"
import { ajax } from "../http/http.js"

export default {
  data: function () {
    return {
      query: null,
      results: null,
      timeout: null,
      relation_type: this.$store.state.relation_type,
      global_org_uuid: null,
    }
  },
  computed: {
    root_uuid: function () {
      return this.$store.getters.getRootUuid
    },
  },
  methods: {
    debounce: function (func, wait) {
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
    considerSearching: function () {
      if (this.query.length > 2) {
        this.debounce(this.search, 300)()
      }
    },
    search: function () {
      let search_res = []
      let search_associated = ""
      if (this.relation_type === "association") {
        search_associated = "associated=true"
      } else {
        search_associated = "associated=false"
      }
      ajax(
        `/service/o/${this.global_org_uuid}/e/?query=${this.query}&${search_associated}`
      ).then((person_res) => {
        ajax(
          `/service/o/${this.global_org_uuid}/ou/?query=${this.query}&root=${this.root_uuid}`
        ).then((org_res) => {
          search_res = person_res.items.concat(org_res.items)
          this.results = search_res.sort(function (a, b) {
            return a.name > b.name
          })
          Vue.nextTick(() => {
            if (search_res.length > 0) {
              document.querySelector(".oc-search-results-header").focus()
            }
          })
        })
      })
    },
    getGlobalOrg: function () {
      ajax("/service/o/").then((org) => {
        this.global_org_uuid = org[0].uuid
      })
    },
    navigateToPerson: function (person_uuid) {
      this.$store.dispatch("fetchPerson", person_uuid)
      this.awaitPersonData(person_uuid)
    },
    awaitPersonData: function (person_uuid) {
      setTimeout(() => {
        let person_data = this.$store.getters.getPerson(person_uuid)
        let org_unit_uuid = null
        if (!person_data) {
          this.awaitPersonData(person_uuid)
        } else {
          // Set org unit from person's association/engagement data
          if (this.relation_type === "association") {
            org_unit_uuid = person_data.association_data[0].org_unit.uuid
          } else {
            org_unit_uuid = person_data.engagement_data[0].org_unit.uuid
          }
          this.$router.push(`/person/${person_uuid}/${org_unit_uuid}`)
          return
        }
      }, 400)
    },
  },
  mounted: function () {
    document.getElementById("search-input").focus()
  },
  created: function () {
    this.getGlobalOrg()
  },
}
</script>

<style lang="scss">
.oc-search {
  margin: 0;
  padding: 2rem 0 0;
  background-color: var(--shade-lightest);
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
  padding: 0.5rem 0.75rem;
  flex: 1 0 auto;
  max-width: 20rem;
  border: solid 1px var(--shade-lighter);
  font-size: smaller;
  transition: all 0.3s ease-in-out;
}

#search-input:focus {
  border: solid 1px var(--primary-color);
  box-shadow: var(--shadow-1);
  outline: none;
}

.oc-search-submit {
  display: inline-block !important;
  font-size: smaller !important;
  padding: 0.75rem 1rem !important;
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
  margin: 0 0 0.5rem;
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
