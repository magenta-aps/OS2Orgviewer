<template>
    <div>
        <a
            :id="`node_${ nodeData.uuid }`"
            :href="`#details_${ nodeData.uuid }`"
            @click="toggleDossier"
            class="dossier-link"
            title="Vis udvidet information">
            <div class="dossier-link-avatar">{{ makeAvatar(nodeData.name) }}</div>
            <p class="dossier-link-name">
                {{ nodeData.name }}
            </p>
        </a>
        <dossier v-if="dossier_open" :node-uuid="nodeData.uuid" @closedossier="dossier_open = false" />
    </div>
</template>

<script>
import Dossier from './Dossier.vue'

export default {
    components: {
        Dossier
    },
    props: [
        'nodeData'
    ],
    data: function() {
        return {
            dossier_open: false
        }
    },
    methods: {
        makeAvatar: function(string) {
            return string.substring(0,1)
        },
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
    .dossier-link-avatar {
        flex: 0 0 2rem;
        margin-right: .5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background-color: #faa;
        color: #fff;
    }
    .dossier-link-name {
        margin: 0;
    }
</style>