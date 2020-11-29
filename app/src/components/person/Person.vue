<template>
    <transition name="oc-fade">
        <article v-if="person && $route.name === 'person'" class="oc-person">
            <oc-header>
                <h3 slot="title">
                    <router-link 
                        v-if="org_unit"
                        :to="`/orgunit/${ org_unit.uuid }`"
                        id="persontitle">
                        <svg class="svg-back" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path class="svg-path" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                        <span class="oc-person-title">{{ person.name }}</span>
                        <svg class="svg-close" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path class="svg-path" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                        <span class="sr-only">Tilbage til enhedsoverblik</span>
                    </router-link>
                </h3>
            </oc-header>
            <div class="oc-person-body">
                <dl>
                    <dt>Navn</dt>
                    <dd>{{ person.name }}</dd>
                    
                    <template v-if="association && relation_type === 'association'">
                        <dt>Tilknytning</dt>
                        <dd>{{ association.association_type.name }}</dd>
                        <template v-if="association.substitute">
                            <dt>Stedfortræder</dt>
                            <dd>
                                <router-link
                                    :to="{ name: 'orgchart', query: { target: 'person', person: association.substitute.uuid ,orgopen: 1, showchildren: 1 } }">
                                    {{ association.substitute.name }}
                                </router-link>
                            </dd>
                        </template>
                    </template>

                    <template v-if="engagement && relation_type === 'engagement'">
                        <dt>{{ engagement.engagement_type.name }}</dt>
                        <dd>{{ engagement.job_function.name }}</dd>
                    </template>

                    <template v-if="association && association.dynamic_classes">
                        <template v-for="dclass in association.dynamic_classes">
                            <dt :key="dclass.top_level_facet.uuid">{{ dclass.top_level_facet.description }}</dt>
                            <dd :key="dclass.uuid">{{ dclass.full_name }}</dd>
                        </template>
                    </template>

                </dl>
                <address-list v-if="person.address_data" :list="person.address_data" />    
            </div>
        </article>
    </transition>
</template>

<script>
import Vue from 'vue'
import OcHeader from '../layout/Header.vue'
import AddressList from '../address/AddressList.vue'

export default {
    components: {
        OcHeader,
        AddressList
    },
    data: function() {
        return {
            relation_type: GLOBAL_ORG_PERSON_RELATION,
            await_determine_orgunit: false
        }
    },
    computed: {
        person: function() {
            return this.$store.getters.getCurrentPerson
        },
        org_unit: function() {
            return this.$store.getters.getCurrentOrgUnit
        },
        association: function() {
            if (this.person.association_data && this.org_unit) {
                return this.person.association_data.find(e => {
                    return e.org_unit.uuid === this.org_unit.uuid
                })
            } else {
                return false
            }
        },
        engagement: function() {
            if (this.person.engagement_data && this.org_unit) {
                return this.person.engagement_data.find(e => {
                    return e.org_unit.uuid === this.org_unit.uuid
                })
            } else {
                return false
            }
        }
    },
    watch: {
        person: function(new_data) {
            Vue.nextTick(() => {
                if (new_data && this.$route.name === 'person' && this.org_unit) {
                    document.getElementById('persontitle').focus()
                }
            })

            // If no org unit id was supplied, 
            // set one using persons engagement or association info
            if (this.await_determine_orgunit) {
                let org_unit_uuid
                if (this.relation_type === 'association') {
                    org_unit_uuid = this.person.association_data[0].org_unit.uuid
                } else {
                    org_unit_uuid = this.person.engagement_data[0].org_unit.uuid
                }
                this.$store.commit('setCurrentOrgUnitUuid', org_unit_uuid)
                this.await_determine_orgunit = false
            }
        },
        $route: function(to, from) {
            if (to.params.personId) {
                Vue.nextTick(() => {
                    if (to.name === 'person') {
                        document.getElementById('persontitle').focus()
                    }
                })
                if (to.params.personId !== from.params.personId) {
                    this.$store.commit('setCurrentPersonUuid', to.params.personId)
                }
            }
        }
    },
    methods: {
        
    },
    created: function() {

        // Initialise orgviewer from URL params
        if (this.$route.params.personId) {
            this.$store.dispatch('fetchPerson', this.$route.params.personId)
            this.$store.commit('setCurrentPersonUuid', this.$route.params.personId)
        }

        if (!this.$route.params.orgUnitId) {
            this.await_determine_orgunit = true
        }
    }
}
</script>

<style lang="scss">

.oc-person {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    overflow: auto;
    background-color: $shade-lightest;
}

.oc-person .oc-header h3 {
    margin: 0;
    padding: 0;
    width: 100%;
}

.oc-person .oc-header h3 a {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: .75rem 1rem;
}

.oc-person-title {
    flex-grow: 1;
}

.oc-person-body {
    padding: 0 1rem 1rem;
    flex-grow: 1;
    overflow: auto;
}

.oc-person .svg-path {
    fill: $color-1;
}

@media screen and (max-width: 40rem) {

    .oc-person {
        
        .svg-back {
            display: inline-block;
            margin-right: .5rem;
        }
        .svg-close {
            display: none;
        }
    }
}

@media screen and (min-width: 40rem) {

    .oc-person {
        max-width: 18rem;
        box-shadow: $shadow-2;

        .svg-back {
            display: none;
        }
        .svg-close {
            display: inline-block;
            margin-left: .5rem;
        }
    }

    .oc-header h3 {
        flex-grow: 1;
    }
}

@media screen and (min-width: 60rem) {
    
    .oc-person {
        max-width: 23rem;
    }

}

@media print {
    
    .oc-person {
        position: relative;
    }

    #persontitle {
        border-bottom: solid 1pt #000;
    }

    .svg-close,
    .svg-back {
        display: none !important;
    }

}

</style>