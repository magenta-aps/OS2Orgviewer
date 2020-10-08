<template>
    <router-link 
        :to="{ name: 'orgchart', query: { root: root_org_uuid, org: data.uuid, orgopen: 1, showchildren: 1 } }"
        :id="`orgunit-${ data.uuid }`"
        class="oc-org-link btn" 
        title="Vis udvidet information">
        {{ data.name }}
    </router-link>
</template>

<script>
export default {
    props: [
        'data'
    ],
    computed: {
        root_org_uuid: function() {
            return this.$route.query.root
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