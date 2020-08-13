<template>
    <div id="app">

        <section id="chart">
            <chart />
        </section>

    </div>
</template>

<script>
import Chart from './components/chart/Chart.vue'


export default {
    name: 'App',
    components: {
        Chart
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

    #chart {
        height: 100%;
    }

    @media screen and (min-width: 40rem) {
        
        #app {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: stretch;
            max-width: 100%;
            overflow: hidden;
        }

        #chart {
            
        }   
    }

</style>
