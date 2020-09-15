<template>
    <div id="app">
        <oc-header>
            <h1 
                id="oc-header-title" 
                slot="title" 
                v-if="organisations" 
                :title="`${ organisations[0].name }s organisation`">
                {{ organisations[0].name }}s organisation
            </h1>
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
    background-color: $color-3;
    color: $shade-darker;
    padding: 0;
    margin: 0;
    font: $font;
}

a,
a:link,
a:visited {
    @include link
}

a:hover,
a:active,
a:focus {
    @include link-hover
}

button,
a.btn,
a.btn:link,
a.btn:visited {
    @include button
}

button:hover,
button:active,
button:focus,
a.btn:hover,
a.btn:active,
a.btn:focus {
    @include button-hover
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
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
}

#oc-header-title {
    @include branding;
}

#oc-main {
    flex-grow: 1;
}

.oc-header h1 {
    margin: 0;
    padding: 0;
}

@media print {
    
    body,
    #app {
        background-color: #fff;
        color: #000;
    }

    a,
    a:link,
    a.btn,
    button {
        color: #000 !important;
        background-color: #fff !important;
    }

}

</style>
