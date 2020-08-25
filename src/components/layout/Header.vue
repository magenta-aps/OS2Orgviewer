<template>
    <header class="oc-header">
        <slot name="title"></slot>
        <slot name="actions"></slot>
    </header>
</template>

<style>

.oc-header {
    background-color: white;
    padding: .75em 1rem;
    color: black;
    box-shadow: -.25rem .25rem 0 hsla(0,0%,0%,.1);
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
}

.oc-header * {
    font-size: 1.25rem;
    font-weight: normal;
}

</style>