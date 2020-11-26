<template>
    <router-link 
        :to="`/orgunit/${ data.uuid }`"
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
    watch: {
        $route: function(to) {
            Vue.nextTick(() => {
                if (to.params.orgUnitId === this.data.uuid && to.name === 'tree') {
                    document.getElementById(`ou-${ this.data.uuid }`).focus()
                }
            })
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