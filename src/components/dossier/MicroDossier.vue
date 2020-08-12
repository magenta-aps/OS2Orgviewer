<template>
    <a 
        :href="`#node_${ nodeData.uuid }`"
        class="dossier-link" 
        :class="{'dossier-link-current': is_current_node}"
        title="Vis udvidet information">
        <div class="dossier-link-avatar">{{ makeAvatar(nodeData.name) }}</div>
        <p class="dossier-link-name">
            {{ nodeData.name }}
        </p>
    </a>
</template>

<script>
export default {
    props: [
        'nodeData'
    ],
    computed: {
        is_current_node: function() {
            return false
        }
    },
    methods: {
        makeAvatar: function(string) {
            return string.substring(0,1)
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
        box-shadow: .5rem .75rem 0 hsla(0,0%,0%,.25);
        z-index: 10;
        transform: translate(-.5rem, -.75rem);
    }
    .dossier-link-current {
        border: solid 1px orange;   
    }
    .dossier-link-avatar {
        flex: 0 0 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background-color: #faa;
        margin-right: .5rem;
        color: #fff;
    }
    .dossier-link-name {
        margin: 0;
    }
</style>