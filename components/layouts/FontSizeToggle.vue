<script setup>
// MYDS text-size control — WCAG 1.4.4 (Resize text).
// Scales the root font size, so every rem-based size in the UI follows.
const SIZES = [
  { value: "normal", label: "Biasa" },
  { value: "large", label: "Besar" },
  { value: "xlarge", label: "Lebih Besar" },
];

const size = ref("normal");

function applySize(value) {
  const el = document.documentElement;
  el.classList.remove("font-size-large", "font-size-xlarge");
  if (value !== "normal") el.classList.add(`font-size-${value}`);
  localStorage.setItem("fontSize", value);
}

onMounted(() => {
  size.value = localStorage.getItem("fontSize") || "normal";
});

function setSize(value) {
  size.value = value;
  applySize(value);
}
</script>

<template>
  <VDropdown placement="bottom-end" distance="8">
    <button
      type="button"
      class="inline-flex items-center justify-center rounded-md p-2 text-txt-black-500 transition-colors duration-150 hover:bg-bg-washed hover:text-txt-black-900"
      aria-label="Saiz teks"
      title="Saiz teks"
    >
      <span
        class="flex h-5 w-5 items-center justify-center text-sm font-bold leading-none"
        >Aa</span
      >
    </button>

    <template #popper>
      <ul class="w-48 py-1">
        <li v-for="option in SIZES" :key="option.value">
          <button
            type="button"
            class="flex w-full items-center justify-between px-4 py-2 text-left text-body-sm text-txt-black-700 transition-colors duration-150 hover:bg-bg-washed"
            :aria-current="size === option.value"
            @click="setSize(option.value)"
          >
            <span>{{ option.label }}</span>
            <Icon
              v-if="size === option.value"
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
