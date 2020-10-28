<template>

    <dl class="oc-address-list">
        <template v-for="address in list">
            <template v-if="!address.visibility || address.visibility.name !== 'Hemmelig'">
                <dt :key="address.address_type.uuid">{{ address.address_type.name }}</dt>
                <dd :key="address.uuid">
                    <a 
                        v-if="address.address_type.name === 'Email'"
                        :href="`mailto:${ address.name }`">
                        {{ address.name }}
                    </a>
                    <a 
                        v-else-if="address.address_type.name === 'Webadresse' || address.address_type.name === 'Dokumentadresse'"
                        :href="address.name">
                        {{ address.name }}
                    </a>
                    <a 
                        v-else-if="address.address_type.name === 'Telefon'"
                        :href="`tel:${ address.name}`">
                        {{ address.name }}
                    </a>                
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
    ]
}
</script>

<style lang="scss">

.oc-address-list {
    margin: 0;
    padding: 0;
}
</style>