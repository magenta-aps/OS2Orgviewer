<template>
  <dl class="oc-managers" v-if="managers && managers.length > 0">
    <template v-for="m in managers">
      <dt :key="m.manager_type.uuid">{{ m.manager_type.name }}</dt>
      <dd :key="m.employee[0].uuid">
        <router-link
          class="oc-person-open"
          :to="`/person/${m.employee[0].uuid}/${m.org_unit_uuid}/${root_uuid}`"
        >
          <span class="sr-only">Vis detaljer for </span>
          {{ m.employee[0].name }}
        </router-link>
      </dd>
    </template>
  </dl>
</template>

<script>
export default {
  props: ["managers"],
  computed: {
    root_uuid: function () {
      return this.$store.getters.getRootUuid
    },
  },
}
</script>

<style>
.oc-managers {
  margin: 1.5rem 0 0;
  padding-top: 1.5rem;
  border-top: solid 1px var(--shade-lighter);
}
</style>
