<template>
    <article v-if="person_data" class="oc-person">
        <oc-header>
            <h3 slot="title">
                {{ person_data.person.name }}
            </h3>
        </oc-header>
        <dl class="oc-person-body">
            <dt>Navn</dt>
            <dd>{{ person_data.person.name }}</dd>
    
            <template v-for="address in person_data.address_data">
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
            person_data: null
        }
    },
    computed: {
        root_org_uuid: function() {
            return this.$store.getters.getRootOrgUnitUuid
        }
    },
    watch: {
        $route: function(to) {
            this.checkPersonUrlInfo(to.query)
        }
    },
    methods: {
        checkPersonUrlInfo: function(query) {
            if (query.person) {
                this.person_data = this.$store.state.person.persons[query.person]
            } else {
                this.person_data = null
            }
        }
    },
    created: function() {
        this.checkPersonUrlInfo(this.$route.query)
    }
}
</script>

<style>

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
    background-color: #fff;
}

.oc-header h3 {
    margin: 0;
    padding: 0;
}

.oc-person-body {
    padding: 1rem;
    flex-grow: 1;
}

@media screen and (min-width: 40rem) {
    .oc-person {
        max-width: 30rem;
    }
}

</style>