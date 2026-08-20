<script setup>
import RSChildItem from "~/components/layouts/sidemenu/ItemChild.vue";

const route = useRoute();
const { collapsed, expand } = useSidebar();

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
  if (collapsed.value) return false;
  if (key in manual.value) return manual.value[key];
  return hasActiveDescendant(item);
}

function toggle(item, key) {
  // MYDS expands the rail first rather than opening a submenu inside it.
  if (collapsed.value) {
    expand();
    manual.value = { ...manual.value, [key]: true };
    return;
  }
  manual.value = { ...manual.value, [key]: !isOpen(item, key) };
}

const hasChildren = (item) => !!(item.child && item.child.length);

// Tooltips stand in for labels on the collapsed rail. floating-vue portals them
// to the body, so the sidebar's scroll container cannot clip them.
const tip = (title) => ({
  content: title,
  placement: "right",
  disabled: !collapsed.value,
});

// MYDS sidebar link states: active is a white pill with primary text,
// inactive is tinted primary-100 that fills to primary-700 on hover.
function activeMenu(routePath) {
  return route.path == routePath
    ? " bg-white text-primary-800 shadow-sm active-menu"
    : " text-primary-100 transition-colors duration-200 hover:bg-primary-700 hover:text-white";
}

// On the rail the active child is hidden, so the group itself carries the
// active state; expanded, the child shows it instead.
function groupMenu(item) {
  return collapsed.value && hasActiveDescendant(item)
    ? " bg-white text-primary-800 shadow-sm"
    : " text-primary-100 transition-colors duration-200 hover:bg-primary-700 hover:text-white";
}

const linkClass =
  "flex w-full items-center gap-3 rounded-md px-3 py-2 text-body-sm font-medium leading-tight cursor-pointer";
</script>

<template>
  <div v-for="(item, index) in menuItem" :key="index">
    <div
      v-if="item.header"
      class="px-3 pt-5 pb-2 text-body-xs font-medium uppercase tracking-wide text-primary-200"
      :class="collapsed ? 'lg:hidden' : ''"
    >
      <span>{{ item.header }}</span>
      <p v-if="item.description" class="normal-case text-primary-300">
        {{ item.description }}
      </p>
    </div>
    <!-- On the rail a rule replaces the section label -->
    <div
      v-if="item.header && collapsed"
      class="mx-2 mb-2 mt-4 hidden border-t border-primary-700 lg:block"
    ></div>

    <ul class="navigation-menu space-y-1">
      <li
        class="navigation-item"
        v-for="(item2, index2) in item.child"
        :key="index2"
      >
        <NuxtLink
          v-if="!hasChildren(item2)"
          v-tooltip="tip(item2.title)"
          :class="[
            linkClass,
            activeMenu(item2.path),
            collapsed ? 'lg:justify-center lg:px-2' : '',
          ]"
          :to="item2.path"
        >
          <Icon
            :name="item2.icon || 'material-symbols:file-copy-outline-rounded'"
            size="18"
            class="flex-shrink-0"
          ></Icon>
          <span
            class="flex-1 truncate"
            :class="collapsed ? 'lg:hidden' : ''"
            :title="item2.title"
            >{{ item2.title }}</span
          >
        </NuxtLink>

        <template v-else>
          <a
            v-tooltip="tip(item2.title)"
            :class="[
              linkClass,
              groupMenu(item2),
              collapsed ? 'lg:justify-center lg:px-2' : '',
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
            <span
              class="flex-1 truncate"
              :class="collapsed ? 'lg:hidden' : ''"
              :title="item2.title"
              >{{ item2.title }}</span
            >
            <!-- Wrapper span, because nuxt-icon's scoped `display` rule
                 outranks a `hidden` utility placed on the Icon itself. -->
            <span
              class="ml-auto flex flex-shrink-0"
              :class="collapsed ? 'lg:hidden' : ''"
            >
              <Icon
                class="side-menu-arrow"
                name="material-symbols:chevron-right-rounded"
                size="18"
              ></Icon>
            </span>
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
