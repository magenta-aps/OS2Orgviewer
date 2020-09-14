<template>
    <div id="app">
        <oc-header>
            <h1 slot="title" v-if="organisations">{{ organisations[0].name }}s organisation</h1>
        </oc-header>
        <main id="oc-main">
            <tree id="tree" />
            <organisation id="organisation" />
            <person id="person" />
        </main>
    </div>
</template>

<script>
import OcHeader from './components/layout/Header.vue'
import Tree from './components/tree/Tree.vue'
import Organisation from './components/organisation/Organisation.vue'
import Person from './components/person/Person.vue'

export default {
    name: 'App',
    components: {
        OcHeader,
        Tree, 
        Organisation,
        Person
    },
    computed: {
        organisations: function() {
            return this.$store.getters.getOrganisations
        }
    }
}
</script>

<style lang="scss">
    * {
        box-sizing: border-box;
    }

    html,
    body {
        width: 100%;
        height: 100%;
    }

    body {
        background-color: $color-bg-2;
        padding: 0;
        margin: 0;
    }

    a,
    a:link,
    a:visited {
        text-decoration: none;
        color: #6ad;
    }

    a:hover,
    a:active,
    a:focus {
        color: #000;
    }

    a.btn,
    a.btn:link,
    a.btn:visited {
        display: block;
        background-color: #6ad;
        color: #fff;
        padding: .25rem .5rem;
        text-align: center;
    }

    a.btn:hover,
    a.btn:active,
    a.btn:focus {
        background-color: #000;
    }

    dt {
        opacity: .75;
        font-size: smaller;
    }

    dd {
        margin: 0 0 1rem;
        padding: 0;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        color: #2c3e50;
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
    }

    #oc-main {
        flex-grow: 1;
    }

    .oc-header h1 {
        margin: 0;
        padding: 0;
    }

</style>
