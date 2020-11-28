<template>
    <router-link 
        :to="`/orgunit/${ data.uuid }/${ root_org_uuid ? root_org_uuid : null}`"
        :id="`ou-${ data.uuid }`"
        class="oc-org-link btn">
        <span class="sr-only">Vis detaljer for </span>
        {{ data.name }}
    </router-link>
</template>

<script>
import Vue from 'vue'

export default {
    props: [
        'data'
    ],
    computed: {
        root_org_uuid: function() {
            return this.$store.getters.getRootOrgUnitUuid
        }
    },
    watch: {
        $route: function(to, from) {
            if (to.params.orgUnitId === this.data.uuid) {
                Vue.nextTick(() => {
                    if (to.name === 'orgunit') {
                        document.getElementById(`ou-${ this.data.uuid }`).focus()
                    }
                })
                if (to.params.orgUnitId !== from.params.orgUnitId) {
                    this.$store.commit('setCurrentOrgUnitUuid', to.params.orgUnitId)
                }
            }
        }
    }
}
</script>

<style lang="scss">

.oc-org-link,
.oc-org-link:link,
.oc-org-link:visited {
    text-align: left !important;
    white-space: normal !important;
    padding: .5rem .75rem !important;
}

@media print {
    

}
    
</style>