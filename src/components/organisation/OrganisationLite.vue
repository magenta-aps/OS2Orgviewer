<template>
    <div>
        <a
            :id="`node_${ data.uuid }`"
            :href="`#details_${ data.uuid }`"
            @click="toggleDossier"
            class="dossier-link"
            title="Vis udvidet information">
            {{ data.name }}
        </a>
        <organisation v-if="dossier_open" :uuid="data.uuid" @closedossier="dossier_open = false" />
    </div>
</template>

<script>
import Organisation from './Organisation.vue'

export default {
    components: {
        Organisation
    },
    props: [
        'data'
    ],
    data: function() {
        return {
            dossier_open: false
        }
    },
    methods: {
        toggleDossier: function() {
            this.dossier_open = !this.dossier_open
        }
    }
}
</script>

<style>
    .dossier-link {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        padding: .5rem .75rem;
        overflow: hidden;
        background-color: #fff;
        z-index: 3;
    }
    .dossier-link,
    .dossier-link:link,
    .dossier-link:visited {
        transition: all .3s;
    }
    .dossier-link:hover,
    .dossier-link:active,
    .dossier-link:focus {
        color: #000;
        box-shadow: .5rem .5rem 0 hsla(0,0%,0%,.2);
        z-index: 10;
        transform: translate(-.5rem, -.5rem);
    }
</style>