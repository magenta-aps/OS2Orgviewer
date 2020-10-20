<template>
    <router-link 
        :to="{ name: 'orgchart', query: { target: 'orgunit', root: root_org_uuid, org: data.uuid, orgopen: 1 } }"
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
            return this.$route.query.root
        }
    },
    watch: {
        $route: function(to) {
            Vue.nextTick(() => {
                if (to.query.org === this.data.uuid && to.query.target === 'tree') {
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
    
    .oc-org-link {
                
    }

}
    
</style>