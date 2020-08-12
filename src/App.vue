<template>
    <div id="app">
        
        <section id="chart">
            <chart />
        </section>

        <dossier />

    </div>
</template>

<script>
import Chart from './components/chart/Chart.vue'
import Dossier from './components/dossier/Dossier.vue'

export default {
    name: 'App',
    components: {
        Chart,
        Dossier
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

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        color: #2c3e50;
        width: 100%;
        height: 100%;
    }

    #chart,
    .dossier {
        overflow: scroll;
        height: 100%;
    }

    @media screen and (min-width: 40rem) {
        
        #app {
            display: grid;
            grid-template-columns: auto 20rem;
        }
    }

</style>
