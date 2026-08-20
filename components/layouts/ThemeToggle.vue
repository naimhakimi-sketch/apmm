<script setup>
// MYDS dark-mode toggle.
//
// Two things must flip together: the legacy corradUI tokens live on
// `html[data-theme]`, while the MYDS semantic tokens (--bg-white, --txt-*,
// --otl-*) ship on a `.dark` class. Setting only one leaves half the UI light.
// Shared with the charts, which restyle their neutrals for dark surfaces.
const isDark = useMydsDark();

function applyTheme(dark) {
  const el = document.documentElement;
  el.setAttribute("data-theme", dark ? "dark" : "default");
  el.classList.toggle("dark", dark);
  localStorage.setItem("theme", dark ? "dark" : "default");
}

onMounted(() => {
  isDark.value = (localStorage.getItem("theme") || "default") === "dark";
});

function toggle() {
  isDark.value = !isDark.value;
  applyTheme(isDark.value);
}
</script>

<template>
  <button
    type="button"
    class="inline-flex items-center justify-center rounded-md p-2 text-txt-black-500 transition-colors duration-150 hover:bg-bg-washed hover:text-txt-black-900"
    :aria-pressed="isDark"
    :aria-label="isDark ? 'Tukar ke mod cerah' : 'Tukar ke mod gelap'"
    :title="isDark ? 'Mod cerah' : 'Mod gelap'"
    @click="toggle"
  >
    <Icon
      :name="isDark ? 'ic:outline-light-mode' : 'ic:outline-dark-mode'"
      size="20"
    />
  </button>
</template>
