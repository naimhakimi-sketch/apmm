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

const menuItem = props.items ? props.items : [];

// Toggle show and hide menu content
function openMenu(event) {
  const target = event.currentTarget;
  try {
    target.querySelector("a").classList.toggle("nav-open");
    target.querySelector("ul").classList.toggle("hide");
  } catch (e) {
    // console.log(e);
    return;
  }
}

// Active menu — MYDS style: quiet translucent highlight, no motion
function activeMenu(routePath) {
  return route.path == routePath
    ? ` text-white
            font-medium
            bg-[rgba(255,255,255,0.15)]
            active-menu`
    : ` text-[rgba(255,255,255,0.85)]
            transition-colors
            duration-200
            hover:bg-[rgba(255,255,255,0.1)]
            hover:text-white`;
}
</script>

<template>
  <div v-for="(item, index) in menuItem" :key="index">
    <div
      v-if="item.header"
      class="text-left font-normal text-xs mx-6 mt-5 mb-2"
    >
      <span class="uppercase tracking-wide text-[rgba(255,255,255,0.6)]">
        {{ item.header ? item.header : "" }}
      </span>
      <p class="text-[rgba(255,255,255,0.45)]">
        {{ item.description ? item.description : "" }}
      </p>
    </div>
    <ul class="navigation-menu">
      <li
        class="navigation-item"
        v-for="(item2, index2) in item.child"
        :key="index2"
        @click.stop="
          item2.child !== undefined || (item2.child && item2.child.length !== 0)
            ? openMenu($event)
            : ''
        "
      >
        <NuxtLink
          v-if="
            item2.child === undefined ||
            (item2.child && item2.child.length === 0)
          "
          class="flex items-center px-4 py-3 mx-3 rounded-lg cursor-pointer"
          :to="item2.path"
          :class="activeMenu(item2.path)"
        >
          <Icon v-if="item2.icon" :name="item2.icon" size="18"></Icon>
          <Icon
            v-else
            name="material-symbols:file-copy-outline-rounded"
            size="18"
          ></Icon>
          <span class="mx-3 font-normal">{{ item2.title }}</span>
          <Icon
            v-if="item2.child && item2.child.length > 0"
            class="ml-auto side-menu-arrow"
            name="material-symbols:chevron-right-rounded"
            size="18"
          ></Icon>
        </NuxtLink>
        <a
          v-else
          class="flex items-center px-4 py-3 mx-3 rounded-lg cursor-pointer"
          :class="activeMenu(item2.path)"
        >
          <Icon v-if="item2.icon" :name="item2.icon" size="18"></Icon>
          <Icon
            v-else
            name="material-symbols:file-copy-outline-rounded"
            size="18"
          ></Icon>
          <span class="mx-3 font-normal">{{ item2.title }}</span>
          <Icon
            v-if="item2.child && item2.child.length > 0"
            class="ml-auto side-menu-arrow"
            name="material-symbols:chevron-right-rounded"
            size="18"
          ></Icon>
        </a>
        <RSChildItem
          v-if="item2.child"
          :items="item2.child"
          @openMenu="openMenu"
          @activeMenu="activeMenu"
        ></RSChildItem>
      </li>
    </ul>
  </div>
</template>
