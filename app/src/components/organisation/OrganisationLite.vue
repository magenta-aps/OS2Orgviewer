<template>

    <router-link v-if="uuid && org_data"
        :to="`/orgunit/${ org_data.uuid }/${ root_org_uuid ? root_org_uuid : null}`"
        :id="`ou-${ org_data.uuid }`"
        class="oc-org-link btn">
        <p class="oc-org-link-title">
            <span class="sr-only">Vis detaljer for </span>
            {{ org_data.name }}
        </p>
        <p class="oc-org-link-count" v-if="org_data[`${relation_type}_count`]">
            {{ displayPersonCount(org_data[`${relation_type}_count`], relation_type) }}
        </p>
    </router-link>

</template>

<script>
import Vue from 'vue'

export default {
    props: [
        'uuid'
    ],
    data: function() {
        return {
            relation_type: this.$store.state.relation_type
        }
    },
    computed: {
        root_org_uuid: function() {
            return this.$store.getters.getRootOrgUnitUuid
        },
        org_data: function() {
            return this.$store.getters.getOrgUnit(this.uuid)
        }
    },
    watch: {
        $route: function(to, from) {
            if (to.params.orgUnitId === this.uuid) {
                Vue.nextTick(() => {
                    if (to.name === 'orgunit') {
                        document.getElementById(`ou-${ this.uuid }`).focus()
                    }
                })
            }
        }
    },
    methods: {
        displayPersonCount: function(count, relation) {
            let str = ''
            if (relation === 'association' && count === 1) {
                str = 'tilknyttet'
            } else if (relation === 'association' && count > 1) {
                str = 'tilknyttede'
            } else if (relation === 'engagement' && count === 1) {
                str = 'ansat'
            } else if (relation === 'engagement' && count > 1) {
                str = 'ansatte'
            } else {
                return ''
            }
            return `${ count } ${ str }`
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
    display: block;
    padding: .5rem .75rem !important;
}

.oc-org-link-title {
    padding: 0;
    margin: 0;
}

.oc-org-link-count {
    font-size: .8em;
    opacity: .66;
    margin: 0;
    padding: 0;
}

.oc-tt-item.active > .oc-tt-node > .oc-tt-node-body > .oc-org-link {
    color: $shade-darkest;
    border-left: solid .25rem $color-1;
}
</style>