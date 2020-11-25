<template>

    <dl class="oc-address-list">
        <template v-for="address in list">
            <template v-if="!address.visibility || address.visibility.name !== 'Hemmelig'">
                <dt :key="address.address_type.uuid">
                    <span v-if="address.address_type.name === 'Dokumentadresse'">
                        Dokumenter
                    </span>
                    <span v-if="address.address_type.name === 'Postadresse' && address.person">
                        Arbejdsadresse
                    </span>
                    <span v-else>
                        {{ address.address_type.name }}
                    </span>
                </dt>
                <dd :key="address.uuid">
                    <a 
                        v-if="address.address_type.name === 'Email'"
                        :href="`mailto:${ address.name }`">
                        {{ address.name }}
                    </a>
                    <a 
                        v-else-if="address.address_type.name === 'Webadresse'"
                        :href="address.name"
                        target="_blank">
                        {{ address.name }}
                    </a>
                    <a 
                        v-else-if="address.address_type.name === 'Dokumentadresse'"
                        :href="address.name"
                        target="_blank">
                        Vis enhedens dokumenter
                    </a>
                    <a 
                        v-else-if="address.address_type.name === 'Telefon'"
                        :href="`tel:${ address.name}`">
                        {{ address.name }}
                    </a>
                    <span v-else-if="address.address_type.name === 'Postadresse' && address.person">
                        <template v-if="work_address">{{ work_address.name }}</template>
                    </span>
                    <span v-else>
                        {{ address.name }}
                    </span>
                </dd>
            </template>
        </template>
    </dl>
    
</template>

<script>
export default {
    props: [
        'list'
    ],
    data: function() {
        return {
            work_address: null
        }
    },
    methods: {
        getWorkAddress: function() {
            const post_address = this.list.find(a => {
                return a.address_type.name === 'Postadresse'
            })
            if (post_address && post_address.person) {
                this.$store.dispatch('fetchOrgUnitAddresses', this.$store.state.person.persons[post_address.person.uuid].engagement_data[0].org_unit.uuid)
                .then(addresses => {
                    const address = addresses.find(a => {
                        return a.address_type.name === 'Postadresse'
                    })
                    this.work_address = address
                })
            }
        }
    },
    created: function() {
        this.getWorkAddress()
    }
}
</script>

<style lang="scss">

.oc-address-list {
    margin: 0;
    padding: 0;
}
</style>