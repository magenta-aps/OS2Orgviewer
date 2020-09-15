<template>
    <router-link 
        class="btn oc-back-btn"
        :to="route">
        Luk
    </router-link>
</template>

<script>
export default {
    props: [
        'route'
    ]
}
</script>

<style lang="scss">


@media screen and (max-width: 40rem) {
    
    .oc-back-btn {
        position: absolute;
        top: 0;
        left: 0;
        text-indent: -10000rem;
        width: 3rem;
        height: 3.8rem;
        overflow: hidden;
    }

    .oc-back-btn::after {
        content: '';
        display: block;
        width: 1rem;
        height: 1rem;
        border: solid 0 $shade-lightest;
        border-width: 3px 0 0 3px;
        transform: rotate(315deg);
        transform-origin: 0% 0%;
    }
}

@media screen and (min-width: 40rem) {

}

@media print {
    
    .oc-back-btn {
        display: none !important;
    }

}

</style>