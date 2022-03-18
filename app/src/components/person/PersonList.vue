<template>
    <div class="people-list-wrapper" v-if="people">
        <ul class="people-list" v-if="people.length > 0">
            <li v-for="person in people" :key="person.uuid">
                <person-lite :person="person" />
            </li>
        </ul>
        <p class="people-list-empty" v-if="!is_loading && people.length === 0">
            Ingen <span v-if="relation_type === 'association'">tilknyttede</span><span v-else>ansatte</span> fundet
        </p>
    </div>
</template>

<script>
import PersonLite from './PersonLite.vue'

export default {
    components: {
        PersonLite
    },
    data: function() {
        return {
            relation_type: this.$store.state.relation_type
        }
    },
    props: [
        'people'
    ],
    computed: {
        is_loading: function() {
            return this.$store.getters.isLoading
        }
    }
}
</script>

<style lang="scss">

    .people-list-wrapper {
        margin: 1.5rem 0 0;
        padding: 1.5rem 0 0;
        border-top: solid 1px var(--shade-lighter);
    }

    .people-list {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .people-list-empty {
        padding: 0;
        margin: 0;
    }

</style>