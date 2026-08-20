<script setup>
useHead({
  title: "e-JUTRA | APMM",
  description:
    "Sistem Pengurusan dan Pemantauan Aset Kejuruteraan Marin APMM (e-JUTRA)",
  htmlAttrs: {
    lang: "ms",
  },
});

const loading = ref(true);

onMounted(() => {
  // Hide loading indicator if not hydrating
  setTimeout(() => {
    loading.value = false;
  }, 1000);

  // Restore display preferences.
  // Dark mode needs both flags: the legacy tokens hang off [data-theme], the
  // MYDS semantic tokens off the `.dark` class (see LayoutsThemeToggle).
  let theme = localStorage.getItem("theme");
  if (!["default", "dark"].includes(theme)) theme = "default";
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.classList.toggle("dark", theme === "dark");
  useMydsDark().value = theme === "dark";

  const fontSize = localStorage.getItem("fontSize");
  if (fontSize && fontSize !== "normal") {
    document.documentElement.classList.add(`font-size-${fontSize}`);
  }

  const locale = localStorage.getItem("locale");
  if (locale) document.documentElement.setAttribute("lang", locale);
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <Loading v-if="loading" />
      <NuxtPage :key="$route.fullPath" v-else />
    </NuxtLayout>
  </div>
</template>
