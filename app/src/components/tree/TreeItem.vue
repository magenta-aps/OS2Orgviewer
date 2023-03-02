<template>
  <li
    v-if="org_unit"
    :id="`node-${uuid}`"
    class="oc-tt-item"
    :class="{ active: $route.params.orgUnitId === uuid }"
  >
    <span class="oc-tt-line"></span>
    <span class="oc-tt-node">
      <span class="oc-tt-node-head"></span>
      <span class="oc-tt-node-body">
        <org-lite :orgUnit="org_unit" />
        <root-set-toggle :orgUnit="org_unit" />
      </span>
      <expand-toggle :orgUnit="org_unit" />
      <span
        v-if="org_unit.children && org_unit.children.length > 0"
        class="oc-tt-node-tail"
      ></span>
    </span>
    <ul class="oc-tt-ul" :id="`branch-${uuid}`" v-if="org_unit.showchildren">
      <tree-item
        v-for="child in sorted_org_unit_children"
        :uuid="child.uuid"
        :key="child.uuid"
      />
    </ul>
  </li>
</template>

<script>
import OrgLite from "../organisation/OrganisationLite.vue"
import ExpandToggle from "./ExpandToggle.vue"
import RootSetToggle from "./RootSetToggle.vue"

export default {
  name: "tree-item",
  components: {
    OrgLite,
    ExpandToggle,
    RootSetToggle,
  },
  props: ["uuid"],
  computed: {
    org_unit: function () {
      return this.$store.getters.getTreeOrgUnit(this.uuid)
    },
    sorted_org_unit_children: function () {
      // sort org unit children alphabetically
      let org_unit = this.$store.getters.getTreeOrgUnit(this.uuid)
      return org_unit.children.sort((x, y) => {
        let a = x.name.toUpperCase(),
          b = y.name.toUpperCase()
        // Specific sort, which puts 2 units at the bottom
        if (OC_GLOBAL_CONF.VUE_APP_SORT_SPECIFIC_UNITS_SILKEBORG) {
          if (a == "MIDTJYSK BRAND & REDNING" || a == "FORSYNINGSAFDELINGEN") {
            return 1
          }
          if (b == "MIDTJYSK BRAND & REDNING" || b == "FORSYNINGSAFDELINGEN") {
            return -1
          }
        }
        return a == b ? 0 : a > b ? 1 : -1
      })
    },
  },
}
</script>
