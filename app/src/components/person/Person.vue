<template>
    <transition name="oc-fade">
        <article v-if="person_data" class="oc-person">
            <oc-header>
                <h3 slot="title">
                    <router-link 
                        :to="{ name: 'orgchart', query: { target: 'orgunit', root: root_org_uuid, org: org_unit_uuid, orgopen: 1, showchildren: 1 } }"
                        id="persontitle">
                        <svg class="svg-back" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path class="svg-path" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                        <span class="oc-person-title">{{ person_data.name }}</span>
                        <svg class="svg-close" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path class="svg-path" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                        <span class="sr-only">Tilbage til {{ person_data.association_data[0].org_unit.name }}</span>
                    </router-link>
                </h3>
            </oc-header>
            <div class="oc-person-body">
                <dl>
                    <dt>Navn</dt>
                    <dd>{{ person_data.name }}</dd>
                    
                    <dt>Tilknytning</dt>
                    <dd>{{ person_data.association_data[0].association_type.name }}</dd>

                    <template v-if="person_data.association_data[0].substitute">
                        <dt>Stedfortræder</dt>
                        <dd>
                            <router-link
                                :to="{ name: 'orgchart', query: { target: 'person', root: root_org_uuid, org: org_unit_uuid, person: person_data.association_data[0].substitute.uuid ,orgopen: 1, showchildren: 1 } }">
                                {{ person_data.association_data[0].substitute.name }}
                            </router-link>
                        </dd>
                    </template>
                </dl>
                <address-list v-if="person_data.address_data" :list="person_data.address_data" />    
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
    computed: {
        person_data: function() {
            return this.$store.getters.getPerson(this.$route.query.person)
        },
        org_unit_uuid: function() {
            return this.$route.query.org
        },
        root_org_uuid: function() {
            return this.$route.query.root
        }
    },
    watch: {
        $route: function(to) {
            this.update(to.query.person)
        },
        person_data: function(new_data) {
            Vue.nextTick(() => {
                if (new_data && this.$route.query.target === 'person') {
                    document.getElementById('persontitle').focus()
                }
            })
        }
    },
    methods: {
        update: function(person_uuid) {
            if (person_uuid) {
                this.$store.dispatch('fetchPerson', person_uuid)
            }
        }
    },
    created: function() {
        this.update(this.$route.query.person)
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