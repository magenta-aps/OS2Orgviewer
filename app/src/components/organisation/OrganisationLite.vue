<template>

    <router-link v-if="orgUnit"
        :to="`/orgunit/${ orgUnit.uuid }/${ root_uuid }`"
        :id="`ou-${ orgUnit.uuid }`"
        class="oc-org-link btn"
        :title="orgUnit.name">
        <p class="oc-org-link-title">
            <span class="sr-only">Vis detaljer for </span>
            {{ orgUnit.name }}
        </p>
        <p class="oc-org-link-count">
            {{ displayPersonCount(orgUnit) }}
        </p>
    </router-link>

</template>

<script>
import Vue from 'vue'

export default {
    props: [
        'orgUnit'
    ],
    computed: {
        root_uuid: function() {
            return this.$store.getters.getRootUuid
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
        displayPersonCount: function(org_unit) {
            let str = ''
            if (org_unit.associations) {
                str += org_unit.associations.length   
                if (Number(str) === 1 ) {
                    str += ' tilknyttet'
                } else {
                    str += ' tilknyttede'
                }
            } else if (org_unit.engagements) {
                str += org_unit.engagements.length   
                if (Number(str) === 1 ) {
                    str += ' ansat'
                } else {
                    str += ' ansatte'
                }
            } else {
                return ''
            }
            return str
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
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: wrap;
}

.oc-org-link-count {
    font-size: .8em;
    opacity: .66;
    margin: 0;
    padding: 0;
}

.oc-tt-item.active > .oc-tt-node > .oc-tt-node-body > .oc-org-link {
    color: var(--shade-darkest);
    border-left: solid .25rem var(--color-1);
}
</style>