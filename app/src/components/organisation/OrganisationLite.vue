<template>
  <router-link
    v-if="orgUnit"
    :to="`/orgunit/${orgUnit.uuid}/${root_uuid}`"
    :id="`ou-${orgUnit.uuid}`"
    class="oc-org-link btn"
    :title="orgUnit.name"
  >
    <p class="oc-org-link-title">
      <span class="sr-only">Vis detaljer for </span>
      {{ orgUnit.name }}
    </p>
    <p class="oc-org-link-count" v-if="!hide_person_count">
      {{ displayPersonCount(orgUnit) }}
    </p>
  </router-link>
</template>

<script>
import Vue from "vue"
import { convertToArray, convertToBoolean } from "../../helpers"

export default {
  props: ["orgUnit"],
  computed: {
    root_uuid: function () {
      return this.$store.getters.getRootUuid
    },
  },
  data: function () {
    return {
      hide_person_count: convertToBoolean(OC_GLOBAL_CONF.VUE_APP_REMOVE_PERSON_COUNT),
      remove_engagement_type_uuid: convertToArray(
        OC_GLOBAL_CONF.VUE_APP_REMOVE_ENGAGEMENT_TYPE_UUID
      ),
    }
  },
  watch: {
    $route: function (to, from) {
      if (to.params.orgUnitId === this.uuid) {
        Vue.nextTick(() => {
          if (to.name === "orgunit") {
            document.getElementById(`ou-${this.uuid}`).focus()
          }
        })
      }
    },
  },
  methods: {
    displayPersonCount: function (org_unit) {
      let str = ""
      if (org_unit.associations) {
        str += org_unit.associations.length
        if (Number(str) === 1) {
          str += " tilknyttet"
        } else {
          str += " tilknyttede"
        }
      } else if (org_unit.engagements) {
        let eng = org_unit.engagements
        if (this.remove_engagement_type_uuid) {
          eng = eng.filter(
            (engagement) =>
              !this.remove_engagement_type_uuid.includes(
                engagement.engagement_type_uuid
              )
          )
        }
        str += eng.length
        if (Number(str) === 1) {
          str += " ansat"
        } else {
          str += " ansatte"
        }
      } else {
        return ""
      }
      return str
    },
  },
}
</script>

<style lang="scss">
.oc-org-link,
.oc-org-link:link,
.oc-org-link:visited {
  text-align: left !important;
  white-space: normal !important;
  display: block;
  padding: 0.5rem 0.75rem !important;
}

.oc-org-link-title {
  padding: 0;
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
}

.oc-org-link-count {
  font-size: 0.8em;
  opacity: 0.66;
  margin: 0;
  padding: 0;
}

.oc-tt-item.active > .oc-tt-node > .oc-tt-node-body > .oc-org-link {
  color: var(--shade-darkest);
  border-left: solid 0.25rem var(--primary-color);
}
</style>
