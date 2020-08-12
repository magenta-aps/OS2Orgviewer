<template>
    <div class="address-info">
        <button 
            v-if="!address_open" 
            class="address-expand-btn" 
            aria-expanded="false"
            type="button" 
            @click="expandAddresses"
            title="Vis kontaktoplysninger">
                ⊕
        </button>
        <button 
            v-if="address_open" 
            class="address-expand-btn" 
            aria-expanded="true"
            type="button" 
            @click="collapseAddresses"
            title="Skjul kontaktoplysninger">
                ⊖
        </button>
        <dl v-if="addresses && address_open" class="address-item">
            <template v-for="address in addresses">
                <dt :key="address.address_type.uuid">{{ address.address_type.name }}</dt>
                <dd :key="address.uuid">{{ address.name }}</dd>
            </template>
        </dl>
    </div>
</template>

<script>
export default {
    props: [
        'personUuid'
    ],
    data: function() {
        return {
            addresses: null,
            address_open: false
        }
    },
    methods: {
        fetchAdresses: function(person_uuid) {
            fetch(`http://localhost:5001/service/e/${ person_uuid }/details/address`)
            .then((response) => {
                return response.json()
            })
            .then((addresses) => {
                this.addresses = addresses
                this.address_open = true
            })
            .catch(err => {
                console.log(err)
            })
        },
        collapseAddresses: function() {
            this.address_open = false
        },
        expandAddresses: function() {
            if (!this.addresses) {
                this.fetchAdresses(this.personUuid)
            } else {
                this.address_open = true
            }
        }
    }
}
</script>

<style>

    .address-info {
        position: relative;
    }

    .address-expand-btn {
        border: none;
        font-size: 1rem;
        color: black;
        background-color: transparent;
        padding: .5rem;
        position: absolute;
        top: -1.75rem;
        right: 0;
        cursor: pointer;
    }

    .address-expand-btn[aria-expanded="true"] {
        background-color: #eee;
    }

    .address-item {
        background-color: #eee;
        padding: 1rem 1rem .5rem;
    }

</style>