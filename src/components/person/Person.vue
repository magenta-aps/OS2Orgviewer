<template>
    <article v-if="person_data" class="oc-person">
        <oc-header>
            <h3 slot="title">
                <router-link 
                    id="persontitle" 
                    :to="{ name: 'orgchart', query: { root: root_org_uuid, org: person_data.org_unit.uuid, orgopen: 'open' } }">
                    {{ person_data.person.name }}
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
            :to="{ name: 'orgchart', query: { root: root_org_uuid, org: person_data.org_unit.uuid, orgopen: 'open' } }">
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

.oc-header h3 {
    margin: 0;
    padding: 0;
}

.oc-person-body {
    padding: 1rem;
    flex-grow: 1;
}

@media screen and (max-width: 40rem) {

    .oc-header h3 {
        padding-left: 2.5rem;
    }
    
}

@media screen and (min-width: 40rem) {
    
    .oc-person {
        max-width: 20rem;
    }

}

@media screen and (min-width: 60rem) {
    
    .oc-person {
        max-width: 25rem;
    }

}

@media print {
    
    .oc-person {
        position: relative;
    }

}

</style>