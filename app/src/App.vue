<template>
    <div id="app">
        <oc-header id="oc-global-header">
            <router-link slot="preaction" to="/" class="oc-header-preaction btn" :title="`Vis øverste niveau i ${ title }`">
                <img :src="logo_src" alt="">
                <span class="sr-only">Vis øverste niveau i {{ title }}</span>
            </router-link>
            <h1 slot="title" class="oc-header-title">
                {{ title }}
            </h1>
            <router-link 
                v-if="$route.name !== 'search'"
                slot="postaction" 
                :to="'/search'" 
                class="oc-header-postaction btn">
                <svg class="oc-search-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path class="oc-search-svg-path" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                <span class="sr-only">Åben søgefunktion</span>
            </router-link>
            <button 
                v-else
                slot="postaction" 
                @click="$router.go(-1)"
                class="oc-header-postaction btn">
                <svg class="svg-close" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path class="svg-path" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                <span class="sr-only">Luk søgefunktion</span>
            </button>
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
            title: GLOBAL_APP_TITLE,
            logo_src: GLOBAL_APP_LOGO_PATH
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
a.btn:visited,
input[type="submit"] {
    @include button;
}

button:hover,
a.btn:hover,
input[type="submit"]:hover {
    @include button-hover;
}

button:active,
a.btn:active,
input[type="submit"]:active {
    @include button-active;
}

button:focus,
a.btn:focus,
input[type="submit"]:focus {
    @include button-focus;
}

button.inverse,
a.btn.inverse,
a.btn.inverse:link,
a.btn.inverse:visited,
input[type="submit"].inverse {
    background-color: $color-1;
    color: $shade-lightest;
}

button.inverse:hover,
button.inverse:active,
button.inverse:focus,
a.btn.inverse:hover,
a.btn.inverse:active,
a.btn.inverse:focus,
input[type="submit"].inverse:hover,
input[type="submit"].inverse:active,
input[type="submit"].inverse:focus {
    background-color: darken($color-1, 10%);
}

dt,
.label {
    color: $shade-darker;
    font-size: smaller;
}

dd {
    margin: 0 0 1rem;
    padding: 0;
}

hr {
    border: solid 1px $shade-lighter;
    border-width: 1px 0 0 0;
    margin: 1.5rem 1rem;
}

.sr-only {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
}

#app {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
}

#oc-global-header {
    box-shadow: $shadow-3;
    flex: 0 0 3rem;
}

a.oc-header-preaction {
    flex: 0 0 auto;
    display: flex !important;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    @include branding;
}

.oc-header-title {
    flex: 1 1 auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0;
}

a.oc-header-postaction {
    flex: 0 0 auto;
    align-self: flex-end;
    font-size: 1.5rem !important;
    padding: 0.75rem 1rem !important;
    line-height: 1;

    .oc-search-svg-path {
        fill: $color-1;
    }
}

a.oc-header-postaction:hover,
a.oc-header-postaction:active,
a.oc-header-postaction:focus {
    .oc-search-svg-path {
        fill: $shade-darkest;
    }
}

#oc-main {
    height: calc(100% - 3rem);
    flex: 1 0 auto;
}

.oc-fade-enter-active, 
.oc-fade-leave-active {    
    transition: transform .3s;
}

.oc-fade-enter, 
.oc-fade-leave-to {
    transform: translateX(100%);
}

@media print {

    html,
    body {
        width: auto;
        height: auto;
    }

    body {
        font-size: 10pt;
    }
    
    body,
    #app,
    dt {
        background-color: #fff;
        color: #000;
    }

    #app,
    #oc-main {
        display: block;
        width: auto;
        height: auto;
    }

    a,
    a:link,
    a:visited,
    a.btn,
    button {
        color: #000 !important;
        background-color: #fff !important;
    }

    #oc-global-header {
        box-shadow: none;
        border-bottom: solid 1pt #000;
    }

    a.oc-header-preaction {
        border: solid 1pt #000;
        padding-left: 0 !important;
    }

    hr {
        border-color: black;
    }

    .oc-header-postaction,
    .sr-only {
        display: none !important;
    }
}

</style>