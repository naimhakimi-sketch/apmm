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

// Group expansion is Vue state (see Item.vue) so no DOM class-walking is needed.
const { collapsed, toggleCollapsed, closeMobile } = useSidebar();
</script>

<template>
  <div class="vertical-menu flex flex-col">
    <!-- MYDS rail toggle: round button straddling the sidebar edge (desktop) -->
    <button
      type="button"
      class="absolute -right-3 top-12 z-10 hidden h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-primary-600 text-white shadow-card transition-colors hover:bg-bg-white hover:text-primary-600 lg:flex"
      :aria-label="collapsed ? 'Kembangkan menu' : 'Kecilkan menu'"
      :aria-expanded="!collapsed"
      @click="toggleCollapsed"
    >
      <Icon
        name="material-symbols:chevron-left-rounded"
        size="16"
        class="transition-transform duration-200"
        :class="{ 'rotate-180': collapsed }"
      />
    </button>

    <!-- MYDS sidebar brand row: same height as the app header -->
    <div
      class="flex h-16 flex-shrink-0 items-center border-b border-primary-600 px-4"
      :class="collapsed ? 'lg:justify-center lg:px-2' : ''"
    >
      <nuxt-link to="/dashboard" class="flex min-w-0 items-center gap-3">
        <img
          class="h-9 w-auto flex-shrink-0"
          src="@/assets/img/logo/apmm_logo_baru.png"
          alt="APMM"
        />
        <span class="min-w-0 leading-tight" :class="collapsed ? 'lg:hidden' : ''">
          <span class="block truncate font-heading text-body-sm font-semibold">
            e-JUTRA
          </span>
          <span class="block truncate text-body-xs text-primary-200">
            APMM
          </span>
        </span>
      </nuxt-link>

      <!-- Mobile drawer close button -->
      <button
        type="button"
        class="ml-auto text-primary-100 hover:text-white lg:hidden"
        aria-label="Tutup menu"
        @click="closeMobile"
      >
        <Icon name="ic:round-close" size="20" />
      </button>
    </div>

    <NuxtScrollbar class="flex-1 py-4" :class="collapsed ? 'lg:px-2' : 'px-3'">
      <RSItem :items="menuItem"></RSItem>
    </NuxtScrollbar>
  </div>
</template>

<style scoped>
/* MYDS sidebar surface: primary-800 (raw MYDS palette variable) */
.vertical-menu {
  background-color: rgb(var(--_primary-800)) !important;
  color: white !important;
}
</style>
