<template>
  <header class="oc-header">
    <slot name="preaction"></slot>
    <slot name="title"></slot>
    <slot name="postaction"></slot>
  </header>
</template>

<style>
.oc-header {
  background-color: var(--shade-lightest);
  color: var(--shade-darkest);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 100%;
  justify-content: space-between;
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
