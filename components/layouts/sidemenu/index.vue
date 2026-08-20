<script setup>
import Menu from "~/navigation/index.js";
import RSItem from "~/components/layouts/sidemenu/Item.vue";

const props = defineProps({
  menuItem: {
    type: Array,
    default: () => Menu,
    required: false,
  },
});

// Group expansion is Vue state (see Item.vue) — the group holding the active
// route opens itself, so no DOM class-walking is needed here.
</script>

<template>
  <div class="vertical-menu flex flex-col">
    <!-- MYDS sidebar brand row: same height as the app header -->
    <div
      class="flex h-16 flex-shrink-0 items-center border-b border-primary-600 px-4"
    >
      <nuxt-link to="/dashboard" class="flex min-w-0 items-center gap-3">
        <img
          class="h-9 w-auto flex-shrink-0"
          src="@/assets/img/logo/apmm_logo_baru.png"
          alt="APMM"
        />
        <span class="min-w-0 leading-tight">
          <span class="block truncate font-heading text-body-sm font-semibold">
            e-JUTRA
          </span>
          <span class="block truncate text-body-xs text-primary-200">
            APMM
          </span>
        </span>
      </nuxt-link>
    </div>

    <NuxtScrollbar class="flex-1 px-3 py-4">
      <RSItem :items="menuItem"></RSItem>
    </NuxtScrollbar>
  </div>
</template>

<style scoped>
/* MYDS sidebar surface: primary-700 (raw MYDS palette variable) */
.vertical-menu {
  background-color: rgb(var(--_primary-700)) !important;
  color: white !important;
}
</style>
