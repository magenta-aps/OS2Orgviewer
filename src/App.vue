<template>
    <div id="app">
        <oc-header>
            <h1 slot="title">Organisationsdiagram</h1>
        </oc-header>
        <section id="tree">
            <tree />
        </section>
    </div>
</template>

<script>
import Tree from './components/tree/Tree.vue'
import OcHeader from './components/layout/Header.vue'

export default {
    name: 'App',
    components: {
        OcHeader,
        Tree
    }
}
</script>

<style>
    * {
        box-sizing: border-box;
    }

    html,
    body {
        width: 100%;
        height: 100%;
    }

    body {
        background-color: #cef;
        padding: 0;
        margin: 0;
    }

    a,
    a:link,
    a:visited {
        text-decoration: none;
        color: #6ad;
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
    }

    #tree {
        height: 100%;
    }

    .oc-header h1 {
        margin: 0;
        padding: 0;
    }

</style>
