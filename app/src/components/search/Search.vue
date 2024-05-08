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
          <router-link
            v-if="res.__typename == 'OrganisationUnit'"
            :to="`/orgunit/${res.uuid}`"
          >
            <span class="label">Enhed</span>
            <br />
            {{ res.name }}
            <br />
            <span v-for="value in result2phonenumbers(res)">
              {{ value }}
            </span>
          </router-link>
          <router-link v-else :to="`/person/${res.uuid}`">
            <span class="label">Person</span>
            <br />
            <span>{{ res.name }}</span>
            <br />
            <span v-for="value in result2phonenumbers(res)">
              {{ value }}
            </span>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import Vue from "vue"
import { postQuery } from "../http/http.js"

export default {
  data: function () {
    return {
      query: null,
      results: null,
      timeout: null,
      relation_type: this.$store.state.relation_type,
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
      let engagement = this.relation_type == "engagement"
      let filter = { employee: { query: this.query } }
      let employee_search_query = `
      query EmployeesSearch($engagement: Boolean!, $engagementFilter: EngagementFilter, $associationFilter: AssociationFilter) {
        ...engagementOrAssociation
      }

      fragment engagementOrAssociation on Query {
        engagements(filter: $engagementFilter) @include(if: $engagement) {
          objects {
            current {
              person {
                __typename
                uuid
                name
                addresses {
                  value
                  address_type {
                    scope
                  }
                  visibility {
                    scope
                  }
                }
              }
            }
          }
        }
        associations(filter: $associationFilter) @skip(if: $engagement) {
          objects {
            current {
              person {
                __typename
                uuid
                name
                addresses {
                  value
                  address_type {
                    scope
                  }
                  visibility {
                    scope
                  }
                }
              }
            }
          }
        }
      }
      `
      let orgunit_search_query = `
      query OrgUnitsSearch($filter: OrganisationUnitFilter) {
        org_units(filter: $filter) {
          objects {
            current {
              __typename

              uuid
              name

              addresses {
                value
                address_type {
                  scope
                }
                visibility {
                  scope
                }
              }
            }
          }
        }
      }`
      return postQuery({
        query: employee_search_query,
        variables: {
          engagement: engagement,
          engagementFilter: filter,
          associationFilter: filter,
        },
      }).then((personRes) => {
        return postQuery({
          query: orgunit_search_query,
          variables: { filter: { query: this.query } },
        }).then((orgRes) => {
          let people = personRes.engagements
            ? personRes.engagements.objects.flatMap((value) =>
                value.current.person.map((person) => ({
                  __typename: person.__typename || "",
                  uuid: person.uuid || "",
                  name: person.name || "",
                  addresses: person.addresses || [],
                }))
              )
            : personRes.associations.objects.flatMap((value) =>
                value.current.person.map((person) => ({
                  __typename: person.__typename || "",
                  uuid: person.uuid || "",
                  name: person.name || "",
                  addresses: person.addresses || [],
                }))
              )

          let orgs = orgRes.org_units.objects.map((value) => ({
            __typename: value.current.__typename || "",
            uuid: value.current.uuid || "",
            name: value.current.name || "",
            addresses: value.current.addresses || [],
          }))

          let allData = people.concat(orgs)

          // Make sure people are unique
          let uniqueData = [
            ...new Map(allData.map((obj) => [`${obj.uuid}:${obj.name}`, obj])).values(),
          ]

          this.results = uniqueData.sort((a, b) => a.name.localeCompare(b.name))

          Vue.nextTick(() => {
            if (this.results.length > 0) {
              document.querySelector(".oc-search-results-header").focus()
            }
          })
        })
      })
    },
    result2phonenumbers: function (res) {
      let addresses = res.addresses
      // Filter non-phone number addresses, and private addresses
      // TODO: These filters should be done in GraphQL
      let phone_numbers = addresses.filter(
        (address) => address.address_type.scope == "PHONE"
      )
      let public_phone_numbers = phone_numbers.filter(
        (phone) =>
          // first check can be removed when: https://redmine.magenta.dk/issues/59440
          phone.visibility == null ||
          phone.visibility.scope == "INTERNAL" ||
          phone.visibility.scope == "PUBLIC"
      )
      // Exact the phone numbers themselves
      return public_phone_numbers.map((phone) => phone.value)
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
  created: function () {},
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
