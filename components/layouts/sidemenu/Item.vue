<script setup>
import RSChildItem from "~/components/layouts/sidemenu/ItemChild.vue";

const route = useRoute();

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
    required: true,
  },
});

const menuItem = computed(() => props.items ?? []);

// A group is open when it holds the active route, until the user says otherwise.
function hasActiveDescendant(item) {
  if (!item) return false;
  if (item.path && route.path === item.path) return true;
  return (item.child || []).some(hasActiveDescendant);
}

const manual = ref({});

const keyOf = (i, j) => `${i}-${j}`;

function isOpen(item, key) {
  if (key in manual.value) return manual.value[key];
  return hasActiveDescendant(item);
}

function toggle(item, key) {
  manual.value = { ...manual.value, [key]: !isOpen(item, key) };
}

const hasChildren = (item) => !!(item.child && item.child.length);

// MYDS sidebar link states: active is a white pill with primary text,
// inactive is tinted primary-100 that fills to primary-600 on hover.
function activeMenu(routePath) {
  return route.path == routePath
    ? " bg-white text-primary-700 shadow-sm active-menu"
    : " text-primary-100 transition-colors duration-200 hover:bg-primary-600 hover:text-white";
}

const linkClass =
  "flex w-full items-center gap-3 rounded-md px-3 py-2 text-body-sm font-medium leading-tight cursor-pointer";
</script>

<template>
  <div v-for="(item, index) in menuItem" :key="index">
    <div
      v-if="item.header"
      class="px-3 pt-5 pb-2 text-body-xs font-medium uppercase tracking-wide text-primary-200"
    >
      <span>{{ item.header }}</span>
      <p v-if="item.description" class="normal-case text-primary-300">
        {{ item.description }}
      </p>
    </div>

    <ul class="navigation-menu space-y-1">
      <li
        class="navigation-item"
        v-for="(item2, index2) in item.child"
        :key="index2"
      >
        <NuxtLink
          v-if="!hasChildren(item2)"
          :class="[linkClass, activeMenu(item2.path)]"
          :to="item2.path"
        >
          <Icon
            :name="item2.icon || 'material-symbols:file-copy-outline-rounded'"
            size="18"
            class="flex-shrink-0"
          ></Icon>
          <span class="flex-1 truncate" :title="item2.title">{{
            item2.title
          }}</span>
        </NuxtLink>

        <template v-else>
          <a
            :class="[
              linkClass,
              activeMenu(item2.path),
              { 'nav-open': isOpen(item2, keyOf(index, index2)) },
            ]"
            :aria-expanded="isOpen(item2, keyOf(index, index2))"
            @click.stop="toggle(item2, keyOf(index, index2))"
          >
            <Icon
              :name="item2.icon || 'material-symbols:file-copy-outline-rounded'"
              size="18"
              class="flex-shrink-0"
            ></Icon>
            <span class="flex-1 truncate" :title="item2.title">{{
            item2.title
          }}</span>
            <Icon
              class="ml-auto side-menu-arrow flex-shrink-0"
              name="material-symbols:chevron-right-rounded"
              size="18"
            ></Icon>
          </a>

          <RSChildItem
            :items="item2.child"
            :open="isOpen(item2, keyOf(index, index2))"
          ></RSChildItem>
        </template>
      </li>
    </ul>
  </div>
</template>
