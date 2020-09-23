<template>
    <article v-if="person_data" class="oc-person">
        <oc-header>
            <h3 slot="title">
                <router-link 
                    :to="{ name: 'orgchart', query: { root: root_org_uuid, org: person_data.org_unit.uuid, orgopen: 1 } }"
                    :title="`Tilbage til ${ person_data.org_unit.name }`">
                    <svg class="svg-back" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path class="svg-path" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                    <span class="oc-person-title">{{ person_data.person.name }}</span>
                    <svg class="svg-close" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path class="svg-path" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                </router-link>
            </h3>
        </oc-header>
        <dl class="oc-person-body">
            
            <dt>Navn</dt>
            <dd>{{ person_data.person.name }}</dd>
            
            <dt>Tilknytning</dt>
            <dd>{{ person_data.association_type.name }}</dd>
    
            <template v-if="address_data">
                <template v-for="address in address_data">
                    <dt :key="address.address_type.uuid">{{ address.address_type.name }}</dt>
                    <dd :key="address.uuid">
                        <a 
                            v-if="address.address_type.name === 'Email'"
                            :href="`mailto:${ address.name }`">
                            {{ address.name }}
                        </a>
                        <span v-else>
                            {{ address.name }}
                        </span>
                    </dd>
                </template>
            </template>
        </dl>
        <router-link
            class="btn"
            :to="{ name: 'orgchart', query: { root: root_org_uuid, org: person_data.org_unit.uuid, orgopen: 1 } }">
            Luk
        </router-link>
    </article>
</template>

<script>
import OcHeader from '../layout/Header.vue'

let active_person_uuid = null

export default {
    components: {
        OcHeader
    },
    data: function() {
        return {
            address_data: null
        }
    },
    computed: {
        person_uuid: function() {

            return this.$store.getters.getActivePersonUuid
        },
        person_data: function() {
            return this.$store.getters.getPerson(this.person_uuid)
        },
        root_org_uuid: function() {
            return this.$store.getters.getRootOrgUnitUuid
        }
    },
    watch: {
        person_uuid: function(new_uuid) {
            if (new_uuid) {
                this.$store.dispatch('fetchPersonAddresses', new_uuid)
                .then(addresses => {
                    this.address_data = addresses
                })
            }
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
}

.oc-person .oc-header h3 a {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
}

.oc-person-title {
    flex-grow: 1;
}

.oc-person-body {
    padding: 1rem;
    flex-grow: 1;
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
        box-shadow: $shadow-1;

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

}

</style>