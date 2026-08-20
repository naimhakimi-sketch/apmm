<script setup>
// MYDS breadcrumb: compact chevron trail, muted ancestors, bold current page.
const props = defineProps({
  // Optional override. Defaults to the trail derived from the sidebar
  // navigation tree for the current route.
  items: {
    type: Array,
    default: null,
  },
});

const { home, items: derived } = useAppBreadcrumb();

const trail = computed(() => props.items ?? derived.value);
</script>

<template>
  <nav aria-label="Breadcrumb" class="flex">
    <ol class="flex flex-wrap items-center gap-1.5 text-body-xs">
      <li>
        <NuxtLink
          :to="home.path"
          class="text-txt-black-500 hover:text-txt-black-900"
        >
          {{ home.label }}
        </NuxtLink>
      </li>

      <li
        v-for="(item, index) in trail"
        :key="`${item.label}-${index}`"
        class="flex items-center gap-1.5"
      >
        <Icon
          name="material-symbols:chevron-right-rounded"
          size="14"
          class="text-txt-black-500 flex-shrink-0"
        />

        <NuxtLink
          v-if="item.path && index !== trail.length - 1"
          :to="item.path"
          class="text-txt-black-500 hover:text-txt-black-900"
        >
          {{ item.label }}
        </NuxtLink>
        <span
          v-else
          class="font-medium text-txt-black-900"
          :aria-current="index === trail.length - 1 ? 'page' : undefined"
        >
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>
