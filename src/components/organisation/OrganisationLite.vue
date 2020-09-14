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

<style>

    .oc-org-link,
    .oc-org-link:link,
    .oc-org-link:visited {
        display: block;
        padding: .5rem .75rem;
        overflow: hidden;
        background-color: #fff;
        z-index: 3;
        transition: all .3s;
    }

    .oc-org-link:hover,
    .oc-org-link:active,
    .oc-org-link:focus {
        color: #000;
        box-shadow: .5rem .5rem 0 hsla(0,0%,0%,.2);
        z-index: 10;
        transform: translate(-.5rem, -.5rem);
    }
    
</style>