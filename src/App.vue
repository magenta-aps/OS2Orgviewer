<template>
    <div id="app">
        <oc-header>
            <h1 
                id="oc-header-title" 
                slot="title">
                <router-link to="/">
                    <img :src="logo_src" alt="">
                    {{ title }}
                </router-link>
            </h1>
            <div slot="actions" class="oc-header-actions">
                <router-link :to="'/search'" title="Søg" class="oc-header-search-link btn">
                    <svg class="oc-search-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path class="oc-search-svg-path" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                </router-link>
            </div>
        </oc-header>
        <main id="oc-main">
            <router-view id="tree" name="tree"></router-view>
            <router-view id="organisation" name="organisation"></router-view>
            <router-view id="person" name="person"></router-view>
            <router-view id="search" name="search"></router-view>
            <router-view id="error" name="error"></router-view>
        </main>
    </div>
</template>

<script>
import OcHeader from './components/layout/Header.vue'

export default {
    name: 'App',
    components: {
        OcHeader
    },
    data: function() {
        return {
            title: process.env.VUE_APP_TITLE,
            logo_src: process.env.VUE_APP_LOGO_PATH
        }
    },
    computed: {
        organisations: function() {
            return this.$store.getters.getOrganisations
        }
    },
    created: function() {
        this.$store.dispatch('fetchGlobalOrgs')        
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

h1,
h2,
h3 {
    font-weight: normal;
}

a,
a:link,
a:visited {
    @include link;
}

a:hover {
    @include link-hover;
}

a:active{
    @include link-active;
}

a:focus {
    @include link-focus;
}

button,
a.btn,
a.btn:link,
a.btn:visited {
    @include button;
}

button:hover,
a.btn:hover {
    @include button-hover;
}

button:active,
a.btn:active {
    @include button-active;
}

button:focus,
a.btn:focus {
    @include button-focus;
}

button.inverse {
    background-color: $color-1;
    color: $shade-lightest;
}

button.inverse:hover,
button.inverse:active,
button.inverse:focus {
    background-color: darken($color-1, 10%);
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
    & a {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        padding: .75rem 1rem;
    }
    & img {
        flex: 0 0 auto;
        height: 1.25rem;
        width: auto;
        margin-right: .75rem;
    }
    @include branding;
}

.oc-header-actions {
    flex: 0 0 2rem;
}

.oc-header-search-link {
    display: block;
    min-width: 2.5rem;
    font-size: 1.5rem;
    text-align: center;
    line-height: 1;
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

a.btn:hover,
a.btn:active,
a.btn:focus {
    .oc-search-svg-path {
        fill: $shade-darkest;
    }
}

@media print {
    
    body,
    #app {
        background-color: #fff;
        color: #000;
    }

    a,
    a:link,
    a:visited,
    a.btn,
    button {
        color: #000 !important;
        background-color: #fff !important;
    }

}

</style>