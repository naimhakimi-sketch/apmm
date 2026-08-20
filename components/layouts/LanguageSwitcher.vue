<script setup>
// MYDS language switcher.
//
// UI-only for now: the app has no i18n layer, so switching records the
// preference and updates <html lang>, but page content stays as authored.
// Wiring @nuxtjs/i18n later only needs this component to set the locale.
const LOCALES = [
  { code: "ms", short: "BM", label: "Bahasa Malaysia" },
  { code: "en", short: "EN", label: "English" },
];

const locale = ref("ms");

const current = computed(
  () => LOCALES.find((l) => l.code === locale.value) ?? LOCALES[0]
);

onMounted(() => {
  const saved = localStorage.getItem("locale");
  if (saved && LOCALES.some((l) => l.code === saved)) locale.value = saved;
  document.documentElement.setAttribute("lang", locale.value);
});

function setLocale(code) {
  locale.value = code;
  localStorage.setItem("locale", code);
  document.documentElement.setAttribute("lang", code);
}
</script>

<template>
  <VDropdown placement="bottom-end" distance="8">
    <button
      type="button"
      class="inline-flex items-center gap-1.5 rounded-md border border-otl-gray-300 py-1.5 pl-3 pr-2.5 text-txt-black-700 transition-colors duration-150 hover:bg-bg-washed"
      aria-label="Bahasa"
      title="Bahasa"
    >
      <Icon name="ic:outline-language" size="18" />
      <span class="text-body-xs font-semibold">{{ current.short }}</span>
      <Icon name="ic:outline-keyboard-arrow-down" size="16" />
    </button>

    <template #popper>
      <ul class="w-48 py-1">
        <li v-for="option in LOCALES" :key="option.code">
          <button
            type="button"
            class="flex w-full items-center justify-between px-4 py-2 text-left text-body-sm text-txt-black-700 transition-colors duration-150 hover:bg-bg-washed"
            :aria-current="locale === option.code"
            @click="setLocale(option.code)"
          >
            <span>{{ option.label }}</span>
            <Icon
              v-if="locale === option.code"
              name="material-symbols:check-rounded"
              size="18"
              class="text-primary-600"
            />
          </button>
        </li>
      </ul>
    </template>
  </VDropdown>
</template>
