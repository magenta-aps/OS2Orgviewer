<template>
  <button
    v-if="orgUnit && count > 0"
    class="oc-node-expand-btn inverse"
    :class="orgUnit.showchildren ? 'close' : 'open'"
    :aria-expanded="orgUnit.showchildren ? 'true' : 'false'"
    :title="
      orgUnit.showchildren ? `Skjul ${count} underenheder` : `Vis ${count} underenheder`
    "
    type="button"
    @click="toggleBranch"
  >
    <svg
      class="svg-toggle"
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path class="svg-path" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
    </svg>
    <span class="sr-only">{{ orgUnit.showchildren ? "Skjul" : "Vis" }}</span>
    <template v-if="!hide_children_count">
      {{ count }} <span class="sr-only">underenheder</span>
    </template>
  </button>
</template>

<script>
import { convertToBoolean } from "../../helpers"

export default {
  props: ["orgUnit"],
  computed: {
    root_uuid: function () {
      return this.$store.getters.getRootUuid
    },
    count: function () {
      if (this.orgUnit.children) {
        return this.orgUnit.children.length
      } else {
        return false
      }
    },
  },
  watch: {
    route: function (new_route, old_route) {
      this.updateShowChildren(new_route)
    },
  },
  methods: {
    updateShowChildren: function (route) {
      if (route.params.orgUnitId === this.orgUnit.uuid && route.query.showchildren) {
        if (route.query.showchildren === "false") {
          this.orgUnit.showchildren = false
        } else {
          this.orgUnit.showchildren = true
        }
      }
    },
    toggleBranch: function () {
      if (!this.orgUnit.showchildren) {
        this.orgUnit.showchildren = true
      } else {
        this.orgUnit.showchildren = false
      }
      this.$router.push(
        `/tree/${this.orgUnit.uuid}/${this.root_uuid}?showchildren=${
          this.orgUnit.showchildren ? "true" : "false"
        }`
      )
      this.$store.commit("setOrgUnit", this.orgUnit)
      if (this.orgUnit.showchildren) {
        const children_uuids = this.orgUnit.children.map(function (child) {
          return child.uuid
        })
        this.$store.dispatch("buildTree", { uuids: children_uuids })
      }
    },
  },
  created: function () {
    this.updateShowChildren(this.$route)
  },
  data: function () {
    return {
      hide_children_count: convertToBoolean(
        OC_GLOBAL_CONF.VUE_APP_REMOVE_CHILDREN_COUNT
      ),
    }
  },
}
</script>

<style>
.oc-node-expand-btn {
  width: 100%;
  font-size: smaller;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.125rem 0.5rem !important;
}

.svg-toggle {
  transition: transform 0.3s;
}

.svg-toggle .svg-path {
  fill: var(--shade-lightest);
}

.oc-node-expand-btn.close .svg-toggle {
  transform: rotate(180deg);
}

@media print {
  .oc-node-expand-btn {
    display: none !important;
  }
}
</style>
