<template>
    <header class="oc-header">
        <slot name="title"></slot>
        <slot name="actions"></slot>
    </header>
</template>

<style lang="scss">

.oc-header {
    background-color: $shade-lightest;
    padding: 1rem;
    color: $shade-darkest;
    box-shadow: $shadow-2;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
}

.oc-header * {
    font-size: 1.25rem;
    font-weight: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

@media print {
    
    .oc-header {
        background-color: #fff;
        box-shadow: none;
        border-bottom: solid 1pt #000;
    }

}

</style>