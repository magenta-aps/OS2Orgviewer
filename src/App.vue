<template>
    <div id="app">
        <oc-header>
            <h1 
                id="oc-header-title" 
                slot="title" 
                v-if="organisations" 
                :title="`${ organisations[0].name }s organisation`">
                {{ title }}
            </h1>
            <div slot="actions">
                <router-link :to="'/search'" title="Søg">
                    <svg class="oc-search-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path class="oc-search-svg-path" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                </router-link>
            </div>
        </oc-header>
        <main id="oc-main">
            <tree id="tree" />
            <organisation id="organisation" />
            <person id="person" />
            <search id="search" />
        </main>
    </div>
</template>

<script>
import OcHeader from './components/layout/Header.vue'
import Tree from './components/tree/Tree.vue'
import Organisation from './components/organisation/Organisation.vue'
import Person from './components/person/Person.vue'
import Search from './components/search/Search.vue'

export default {
    name: 'App',
    components: {
        OcHeader,
        Tree, 
        Organisation,
        Person,
        Search
    },
    data: function() {
        return {
            title: process.env.VUE_APP_TITLE
        }
    },
    computed: {
        organisations: function() {
            return this.$store.getters.getOrganisations
        }
    },
    created: function() {
        this.$store.dispatch('fetchGlobalOrgs')
        .then(org_children => {
            if (!this.$route.query.root) {
                // We only want to deal with one root. 
                // Taking the first org unit child and passing it on
                this.$router.push({
                    name: 'orgchart',
                    query: {
                        root: org_children[0].uuid,
                        org: org_children[0].uuid,
                        orgopen: 0,
                        showchildren: 1
                    }
                })
            }
        })
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

.oc-search-svg-path {
    fill: $color-1;
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