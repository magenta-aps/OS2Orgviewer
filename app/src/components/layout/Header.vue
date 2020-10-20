<template>
    <header class="oc-header">
        <slot name="preaction"></slot>
        <slot name="title"></slot>
        <slot name="postaction"></slot>
    </header>
</template>

<style lang="scss">

.oc-header {
    background-color: $shade-lightest;
    color: $shade-darkest;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: 100%;
}

.oc-header h1,
.oc-header h2,
.oc-header h3 {
    font-size: 1.125rem;
}

@media print {
    
    .oc-header {
        background-color: #fff;
    }

}

</style>