<template>
    <div class="oc-flyout">
        <div class="oc-flyout-body">
            <slot></slot>
        </div>
        <a
            @click.prevent="closeFlyout"
            class="oc-flyout-close-btn"
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

    .oc-flyout {
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

    .oc-flyout-body {
        padding: 2rem;
        overflow-y: auto;
        overflow-x: hidden;
        flex-grow: 1;
    }

    .oc-flyout-fade-enter-active,
    .oc-flyout-fade-leave-active {
        /*transition: all .3s ease;*/
    }
    .oc-flyout-fade-enter,
    .oc-flyout-fade-leave-to {
        /*
        transform: translateX(100%);
        width: 0;
        */
    }

    a.oc-flyout-close-btn,
    a.oc-flyout-close-btn:link,
    a.oc-flyout-close-btn:visited {
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
    a.oc-flyout-close-btn:hover,
    a.oc-flyout-close-btn:active,
    a.oc-flyout-close-btn:focus {
        background-color: #cef;
    }

    @media screen and (max-width: 40rem) {

        .oc-flyout {
            width: 100%;
            max-width: 25rem;
        }
    }

    @media screen and (min-width: 40rem) {
        .oc-flyout {
            width: 25rem;
        }
    }

    @media screen and (min-width: 90rem) {
        .oc-flyout {
            width: 30rem;
        }
    }

</style>