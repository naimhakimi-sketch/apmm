<script setup>
/**
 * Aida, the e-JUTRA assistant mascot.
 *
 * Two-tone by design: the body paints with `currentColor` so it inherits from
 * whatever it sits on, while the face punches through in `--bot-face`
 * (defaults to the app primary, which is what the bot is normally placed on).
 * Pass `blink` for the idle launcher so it feels alive.
 */
defineProps({
  blink: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    class="bot-avatar"
    :class="{ 'bot-blink': blink }"
  >
    <!-- antenna -->
    <path
      d="M16 3.5v3.2"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />
    <circle cx="16" cy="2.6" r="1.9" fill="currentColor" />

    <!-- side pods -->
    <rect x="2.6" y="12.4" width="2.8" height="6.4" rx="1.4" fill="currentColor" />
    <rect x="26.6" y="12.4" width="2.8" height="6.4" rx="1.4" fill="currentColor" />

    <!-- head -->
    <rect x="6" y="6.8" width="20" height="16" rx="5.6" fill="currentColor" />

    <!-- face -->
    <circle class="bot-eye" cx="12" cy="14" r="2.1" fill="var(--bot-face)" />
    <circle class="bot-eye" cx="20" cy="14" r="2.1" fill="var(--bot-face)" />
    <path
      d="M12.6 18.4c.9.9 2.1 1.4 3.4 1.4s2.5-.5 3.4-1.4"
      stroke="var(--bot-face)"
      stroke-width="1.7"
      stroke-linecap="round"
    />
  </svg>
</template>

<style scoped>
.bot-avatar {
  --bot-face: rgb(var(--color-primary));
}

.bot-eye {
  transform-origin: center;
}

.bot-blink .bot-eye {
  animation: bot-blink 5s ease-in-out infinite;
}

@keyframes bot-blink {
  0%,
  92%,
  100% {
    transform: scaleY(1);
  }
  95% {
    transform: scaleY(0.12);
  }
}

@media (prefers-reduced-motion: reduce) {
  .bot-blink .bot-eye {
    animation: none;
  }
}
</style>
