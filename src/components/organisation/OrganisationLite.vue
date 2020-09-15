<template>
    <router-link 
        :to="{ name: 'orgchart', query: { root: root_org_uuid, org: data.uuid, orgopen: 'open' } }"
        :id="`orgunit-${ data.uuid }`"
        class="oc-org-link" 
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
            return this.$store.getters.getRootOrgUnitUuid
        }
    }
}
</script>

<style lang="scss">

.oc-org-link,
.oc-org-link:link,
.oc-org-link:visited {
    display: block;
    padding: .5rem .75rem;
    overflow: hidden;
    background-color: $shade-lightest;
    z-index: 3;
    transition: all .3s;
}

.oc-org-link:hover,
.oc-org-link:active,
.oc-org-link:focus {
    color: $shade-darkest;
    box-shadow: $shadow-2;
    z-index: 10;
    transform: translate(-.5rem, -.5rem);
}

@media print {
    
    .oc-org-link {
        color: #000;
        background-color: #fff;
    }

}
    
</style>