<script setup>
// MYDS page header band: breadcrumb + page title, sitting directly under the
// app header and above the padded page container.
const { title } = useAppBreadcrumb();
</script>

<template>
  <div
    class="bg-bg-white border-b border-otl-divider px-4 sm:px-6 lg:px-8 py-4 space-y-3"
  >
    <LayoutsBreadcrumb />
    <h1
      v-if="title"
      class="font-heading font-semibold text-heading-2xs text-txt-black-900 leading-tight"
    >
      {{ title }}
    </h1>
  </div>
</template>
