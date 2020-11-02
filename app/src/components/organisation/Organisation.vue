<template>
    <transition name="oc-fade">
        <article 
            class="oc-org" 
            :class="{'dim': $route.query.person}"
            v-if="org_visible && org_data"
            :tabindex="$route.query.person ? -1 : 0">
            <oc-header>
                <h2 slot="title">
                    <router-link
                        id="orgtitle"
                        :to="{ name: 'orgchart', query: { target: 'tree', root: root_org_uuid, org: org_data.uuid, orgopen: 0, showchildren: 1 } }">
                        <svg class="svg-back" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path class="svg-path" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                        <span class="oc-org-title">{{ org_data.name }}</span>
                        <span class="sr-only">Luk visning af {{ org_data.name }}</span>
                        <svg class="svg-close" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path class="svg-path" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                    </router-link>
                </h2>
            </oc-header>
            <div class="oc-org-body">
                <!-- Managers seem to be redundant as they also appear in personlist -->
                <!-- <managers :uuid="org_data.uuid" /> -->
                <person-list :uuid="org_data.uuid" />
                <template v-if="org_data && org_data.address_data">
                    <hr>
                    <address-list :list="org_data.address_data" />
                </template>
            </div>
        </article>
    </transition>
</template>

<script>
import Vue from 'vue'
import PersonList from '../person/PersonList.vue'
import AddressList from '../address/AddressList.vue'
import Managers from '../person/Managers.vue'
import OcHeader from '../layout/Header.vue'
import store from '../../store.js'

export default {
    components: {
        PersonList,
        AddressList,
        Managers,
        OcHeader
    },
    computed: {
        org_visible: function() {
            if (this.$route.query.orgopen == 1) {
                return true
            } else {
                return false
            }
        },
        org_data: function() {
            return this.$store.getters.getOrgUnit(this.$route.query.org)
        },
        root_org_uuid: function() {
            return this.$route.query.root
        }
    },
    watch: {
        $route: function(to) {
            if (to.query.orgopen == 1) {
                this.update(to.query.org)
            }
        },
        org_data: function(new_data) {
            Vue.nextTick(() => {
                if (new_data && this.$route.query.target === 'orgunit') {
                    document.getElementById('orgtitle').focus()
                }
            })
        }
     },
    methods: {
        update: function(org_uuid) {
            if (org_uuid) {
                this.$store.dispatch('getAddresses', org_uuid)
            }
        }
    },
    created: function() {
        this.update(this.$route.query.org)
    }
}
</script>

<style lang="scss">

.oc-org {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    background-color: $shade-lightest;
    z-index: 10;
    display: flex;
    flex-flow: column nowrap;
    overflow: auto;
}

.oc-org.dim > * {
    opacity: .5;
}

.oc-org .oc-header h2 {
    margin: 0;
    padding: 0;
    width: 100%;
}

.oc-org .oc-header h2 a {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: .75rem 1rem;
}

.oc-org-title {
    flex-grow: 1;
}

.oc-org-body {
    padding: 1rem;
    flex-grow: 1;
    overflow: auto;
}

.oc-org .svg-path {
    fill: $color-1;
}

@media screen and (max-width: 40rem) {

    .oc-org {
        
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
    
    .oc-org {
        max-width: 23rem;
        box-shadow: $shadow-2;

        .svg-back {
            display: none;
        }
        .svg-close {
            display: inline-block;
            margin-left: .5rem;
        }
    }

    .oc-header h2 {
        flex-grow: 1;
    }
}

@media screen and (min-width: 60rem) {
    
    .oc-org {
        max-width: 28rem;
    }
}

@media screen and (min-width: 80rem) {
    
    .oc-org {
        max-width: 35rem;
    }
}

@media print {
    
    .oc-org {
        position: relative;
    }

    .oc-org.dim > * {
        opacity: 1 !important;
    }

    #orgtitle {
        border-bottom: solid 1pt #000;
    }

    .svg-close,
    .svg-back {
        display: none !important;
    }
}

</style>