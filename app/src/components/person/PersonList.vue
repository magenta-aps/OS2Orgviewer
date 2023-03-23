<template>
  <div class="people-list-wrapper" v-if="people">
    <ul
      class="people-list"
      v-if="remove_engagement_type_uuid && updated_people.length > 0"
    >
      <li v-for="updated_person in updated_people" :key="updated_person.uuid">
        <person-lite :person="updated_person" />
      </li>
    </ul>
    <ul
      class="people-list"
      v-else-if="!remove_engagement_type_uuid && people.length > 0"
    >
      <li v-for="person in people" :key="person.uuid">
        <person-lite :person="person" />
      </li>
    </ul>
    <p class="people-list-empty" v-if="!is_loading && people.length === 0">
      Ingen <span v-if="relation_type === 'association'">tilknyttede</span
      ><span v-else>ansatte</span> fundet
    </p>
  </div>
</template>

<script>
import PersonLite from "./PersonLite.vue"

export default {
  components: {
    PersonLite,
  },
  data: function () {
    return {
      relation_type: this.$store.state.relation_type,
      remove_engagement_type_uuid: OC_GLOBAL_CONF.VUE_APP_REMOVE_ENGAGEMENT_TYPE_UUID,
    }
  },
  props: ["people"],
  computed: {
    is_loading: function () {
      return this.$store.getters.isLoading
    },
    updated_people: function () {
      let self = this
      let updated_people_list = self.people.filter((person) => {
        if (person.engagement_type_uuid == self.remove_engagement_type_uuid) {
          return false
        }
        return true
      })
      return updated_people_list
    },
  },
}
</script>

<style lang="scss">
.people-list-wrapper {
  margin: 1.5rem 0 0;
  padding: 1.5rem 0 0;
  border-top: solid 1px var(--shade-lighter);
}

.people-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.people-list-empty {
  padding: 0;
  margin: 0;
}
</style>
