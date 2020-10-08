<template>
    <header class="oc-header">
        <slot name="title"></slot>
        <slot name="actions"></slot>
    </header>
</template>

<style lang="scss">

.oc-header {
    background-color: $shade-lightest;
    color: $shade-darkest;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
}

.oc-header * {
    font-size: 1.25rem;
}

@media print {
    
    .oc-header {
        background-color: #fff;
        box-shadow: none;
        border-bottom: solid 1pt #000;
    }

}

</style>