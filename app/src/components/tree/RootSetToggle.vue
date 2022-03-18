<template>
    <router-link
        class="oc-node-focus-btn btn"
        v-if="orgUnit && orgUnit.uuid !== root_uuid"
        :to="`/tree/${ orgUnit.uuid }/${ orgUnit.uuid }/`"
        :title="`Vis kun ${ orgUnit.name }`">
        <svg class="svg-focus" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path class="svg-path" d="M5 15H3v4c0 1.1.9 2 2 2h4v-2H5v-4zM5 5h4V3H5c-1.1 0-2 .9-2 2v4h2V5zm14-2h-4v2h4v4h2V5c0-1.1-.9-2-2-2zm0 16h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zM12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg>
        <span class="sr-only">Vis kun {{ orgUnit.name }}</span>
    </router-link>
</template>

<script>
export default {
    props: [
        'orgUnit'
    ],
    computed: {
        root_uuid: function() {
            return this.$store.getters.getRootUuid
        }
    }
}
</script>

<style lang="scss">

a.oc-node-focus-btn.btn,
a.oc-node-focus-btn.btn:link,
a.oc-node-focus-btn.btn:visited  {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    .svg-focus {
        width: .75rem;
        height: .75rem;
    }

    .svg-path {
        fill: var(--color-1);
    }
}

a.oc-node-focus-btn.btn:hover,
a.oc-node-focus-btn.btn:active,
a.oc-node-focus-btn.btn:focus {
    .svg-path {
        fill: var(--shade-darkest);
    }
}

@media print {

    .oc-node-focus-btn {
        display: none !important;
    }
}
</style>