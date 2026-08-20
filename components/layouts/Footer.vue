<script setup>
const year = new Date().getFullYear();
</script>

<template>
  <footer class="border-t border-otl-divider bg-bg-white mt-auto">
    <div class="px-4 sm:px-6 lg:px-8 py-6">
      <div
        class="flex flex-col items-center justify-between gap-2 text-body-xs text-txt-black-500 sm:flex-row"
      >
        <p>
          &copy; {{ year }} Agensi Penguatkuasaan Maritim Malaysia (APMM).
          Dibina atas Sistem Reka Bentuk Kerajaan Malaysia (MYDS).
        </p>
        <a
          href="https://design.digital.gov.my"
          target="_blank"
          rel="noopener noreferrer"
          class="text-txt-primary hover:underline"
        >
          design.digital.gov.my
        </a>
      </div>
    </div>
  </footer>
</template>
