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

    #chart,
    .dossier {
        overflow: scroll;
        height: 100%;
    }

    @media screen and (max-width: 40rem) {

        .dossier {
            position: fixed;
            z-index: 100;
            top: 0;
            right: 0;
            bottom: 0;
            height: 100%;
            width: 100%;
            max-width: 30rem;
        }
    }

    @media screen and (min-width: 40rem) {
        
        #app {
            display: flex;
            flex-flow: row nowrap;
            align-items: stretch;
        }

        #chart {
            flex: 1 0 auto;
        }

        .dossier {
            flex: 0 0 20rem;
        }
    }

</style>
