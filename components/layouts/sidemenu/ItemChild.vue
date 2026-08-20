<script setup>
import RSChildItem from "~/components/layouts/sidemenu/ItemChild.vue";

const route = useRoute();
const { collapsed } = useSidebar();

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  // Driven by the parent group's expand state.
  open: {
    type: Boolean,
    default: false,
  },
});

const menuItem = computed(() => props.items ?? []);

function hasActiveDescendant(item) {
  if (!item) return false;
  if (item.path && route.path === item.path) return true;
  return (item.child || []).some(hasActiveDescendant);
}

const manual = ref({});

function isOpen(item, key) {
  if (key in manual.value) return manual.value[key];
  return hasActiveDescendant(item);
}

function toggle(item, key) {
  manual.value = { ...manual.value, [key]: !isOpen(item, key) };
}

const hasChildren = (item) => !!(item.child && item.child.length);

// MYDS sidebar link states (see Item.vue).
function activeMenu(routePath) {
  return route.path == routePath
    ? " bg-white text-primary-800 shadow-sm active-menu"
    : " text-primary-100 transition-colors duration-200 hover:bg-primary-600 hover:text-white";
}

const linkClass =
  "flex w-full items-center gap-3 rounded-md px-3 py-2 text-body-sm leading-tight cursor-pointer";
</script>

<template>
  <!-- MYDS nested group: indented and hung off a primary-600 rule -->
  <ul
    class="menu-content ml-5 mt-1 space-y-1 border-l border-primary-600 pl-3 transition-all duration-300"
    :class="[{ hide: !open }, collapsed ? 'lg:hidden' : '']"
  >
    <li v-for="(item, index) in menuItem" :key="index">
      <NuxtLink
        v-if="!hasChildren(item)"
        :class="[linkClass, activeMenu(item.path)]"
        :to="item.path"
      >
        <span class="flex-1 truncate" :title="item.title">{{
          item.title
        }}</span>
      </NuxtLink>

      <template v-else>
        <a
          :class="[
            linkClass,
            activeMenu(item.path),
            { 'nav-open': isOpen(item, index) },
          ]"
          :aria-expanded="isOpen(item, index)"
          @click.stop="toggle(item, index)"
        >
          <span class="flex-1 truncate" :title="item.title">{{
          item.title
        }}</span>
          <Icon
            class="ml-auto side-menu-arrow flex-shrink-0"
            name="material-symbols:chevron-right-rounded"
            size="18"
          ></Icon>
        </a>

        <RSChildItem :items="item.child" :open="isOpen(item, index)"></RSChildItem>
      </template>
    </li>
  </ul>
</template>
