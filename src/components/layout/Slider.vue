<template>
    <div class="oc-slider">
        <div class="oc-slider-body">
            <slot></slot>
        </div>
        <a
            @click.prevent="closeFlyout"
            class="oc-slider-close-btn"
            title="Skjul udvidet information">
            Luk
        </a>
    </div>
</template>

<script>
export default {
    methods: {
        closeFlyout: function() {
            this.$emit('closeflyout')
        }
    }
}
</script>

<style>

    .oc-slider {
        margin: 0;
        background-color: #fff;
        display: flex;
        flex-flow: column nowrap;
        position: fixed;
        z-index: 100;
        top: 0;
        right: 0;
        bottom: 0;
        height: 100%;
    }

    .oc-slider-body {
        overflow-y: auto;
        overflow-x: hidden;
        flex-grow: 1;
    }

    .oc-slider-fade-enter-active,
    .oc-slider-fade-leave-active {
        /*transition: all .3s ease;*/
    }
    .oc-slider-fade-enter,
    .oc-slider-fade-leave-to {
        /*
        transform: translateX(100%);
        width: 0;
        */
    }

    a.oc-slider-close-btn,
    a.oc-slider-close-btn:link,
    a.oc-slider-close-btn:visited {
        display: block;
        background-color: #6ad;
        color: #fff;
        border: none;
        text-transform: uppercase;
        text-align: center;
        width: 100%;
        height: 2rem;
        padding: .5rem;
        font-size: smaller;
    }
    a.oc-slider-close-btn:hover,
    a.oc-slider-close-btn:active,
    a.oc-slider-close-btn:focus {
        background-color: #cef;
    }

    @media screen and (max-width: 40rem) {

        .oc-slider {
            width: 100%;
            max-width: 25rem;
        }
    }

    @media screen and (min-width: 40rem) {
        .oc-slider {
            width: 25rem;
        }
    }

    @media screen and (min-width: 90rem) {
        .oc-slider {
            width: 30rem;
        }
    }

</style>