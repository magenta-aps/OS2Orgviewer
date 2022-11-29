<template>
  <dawa-address v-if="work_address.value" :uuid="work_address.value" />
</template>

<script>
import DawaAddress from "./Address.vue"

export default {
  components: {
    DawaAddress,
  },
  props: ["uuid"],
  data: function () {
    return {
      work_address: "",
    }
  },
  methods: {
    fetchWorkAddress: function (uuid) {
      this.$store.dispatch("fetchPersonWorkAddress", uuid).then((res) => {
        this.work_address = res.find((address) => {
          return address.address_type.name === "Postadresse"
        })
      })
    },
  },
  watch: {
    uuid: function (new_val) {
      this.fetchWorkAddress(new_val)
    },
  },
  mounted: function () {
    this.fetchWorkAddress(this.uuid)
  },
}
</script>
