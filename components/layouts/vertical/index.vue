<script setup>
import RSHeader from "~/components/layouts/Header.vue";
import RSSideMenu from "~~/components/layouts/sidemenu/index.vue";

const route = useRoute();
const { mobileOpen, closeMobile, restore } = useSidebar();

onMounted(restore);

// The mobile drawer overlays the content, so a navigation must dismiss it.
watch(() => route.fullPath, closeMobile);
</script>

<template>
  <!-- MYDS shell: government masthead spans the full width above the app -->
  <div class="w-masthead">
    <LayoutsMasthead />
  </div>

  <RSHeader />
  <RSSideMenu />

  <div class="content-page duration-300">
    <LayoutsPageHeader />

    <div class="page-container flex-1 px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </div>

    <LayoutsFooter />
  </div>

  <div
    class="menu-overlay"
    :class="{ hide: !mobileOpen }"
    @click="closeMobile"
  ></div>
</template>
