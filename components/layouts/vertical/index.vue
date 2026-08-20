<script setup>
import { useLayoutStore } from "~/stores/layout";

import RSHeader from "~/components/layouts/Header.vue";
import RSSideMenu from "~~/components/layouts/sidemenu/index.vue";
import { useWindowSize } from "vue-window-size";

const { width } = useWindowSize();
const layoutStore = useLayoutStore();
const mobileWidth = layoutStore.mobileWidth;

// watch for window size changes
watch(
  () => [width.value],
  ([width]) => {
    if (width <= mobileWidth) {
      document.querySelector(".v-layout").classList.add("menu-hide");
      document.getElementsByClassName("menu-overlay")[0].classList.add("hide");
    } else document.querySelector(".v-layout").classList.remove("menu-hide");
  }
);

function toggleMenu(event) {
  document.querySelector(".v-layout").classList.toggle("menu-hide");
  document.getElementsByClassName("menu-overlay")[0].classList.toggle("hide");
}
</script>

<template>
  <!-- MYDS shell: government masthead spans the full width above the app -->
  <div class="w-masthead">
    <LayoutsMasthead />
  </div>

  <RSHeader @toggleMenu="toggleMenu" />
  <RSSideMenu />

  <div class="content-page duration-300">
    <LayoutsPageHeader />

    <div class="page-container flex-1 px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </div>

    <LayoutsFooter />
  </div>

  <div @click="toggleMenu" class="menu-overlay"></div>
</template>
