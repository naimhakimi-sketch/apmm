<script setup>
useHead({
  title: "e-JUTRA | APMM",
  description:
    "Sistem Pengurusan dan Pemantauan Aset Kejuruteraan Marin APMM (e-JUTRA)",
  htmlAttrs: {
    lang: "en",
  },
});

const loading = ref(true);

onMounted(() => {
  // Hide loading indicator if not hydrating
  setTimeout(() => {
    loading.value = false;
  }, 1000);

  // Get theme from localStorage (retired themes fall back to default)
  let theme = localStorage.getItem("theme");
  if (!["default", "dark"].includes(theme)) theme = "default";
  document.documentElement.setAttribute("data-theme", theme);
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
