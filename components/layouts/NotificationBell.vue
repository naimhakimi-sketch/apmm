<script setup>
// MYDS notification bell.
// UI-only: there is no notifications API yet, so this seeds a local demo list.
// Read state is local and resets on reload.
const notifications = ref([
  {
    id: 1,
    message: "Kad Kerja APMM/TBN/06/004 menunggu kelulusan anda.",
    time: "2 jam lalu",
    read: false,
  },
  {
    id: 2,
    message: "ROVA bulan Ogos bagi KM TAMBISAN telah dikemaskini.",
    time: "1 hari lalu",
    read: false,
  },
  {
    id: 3,
    message: "Kontrak FCW/BB2/05/20 akan tamat dalam 30 hari.",
    time: "3 hari lalu",
    read: true,
  },
]);

const unreadCount = computed(
  () => notifications.value.filter((n) => !n.read).length
);

function markAsRead(id) {
  const item = notifications.value.find((n) => n.id === id);
  if (item) item.read = true;
}

function markAllAsRead() {
  notifications.value.forEach((n) => (n.read = true));
}
</script>

<template>
  <VDropdown placement="bottom-end" distance="8">
    <button
      type="button"
      class="relative inline-flex items-center justify-center rounded-md p-2 text-txt-black-500 transition-colors duration-150 hover:bg-bg-washed hover:text-txt-black-900"
      :aria-label="`Pemberitahuan${unreadCount ? ` (${unreadCount} belum dibaca)` : ''}`"
      title="Pemberitahuan"
    >
      <Icon name="ic:outline-notifications" size="20" />

      <span
        v-if="unreadCount > 0"
        class="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-danger-600 px-1 text-[10px] font-semibold leading-none text-white"
      >
        {{ unreadCount > 9 ? "9+" : unreadCount }}
      </span>
    </button>

    <template #popper>
      <div class="w-80">
        <div
          class="flex items-center justify-between border-b border-otl-divider px-4 py-2"
        >
          <span class="text-body-sm font-semibold text-txt-black-900">
            Pemberitahuan
          </span>
          <button
            v-if="unreadCount > 0"
            type="button"
            class="text-body-xs text-txt-primary hover:underline"
            @click="markAllAsRead"
          >
            Tanda semua dibaca
          </button>
        </div>

        <div class="max-h-80 overflow-y-auto">
          <p
            v-if="notifications.length === 0"
            class="px-4 py-6 text-center text-body-sm text-txt-black-500"
          >
            Tiada pemberitahuan.
          </p>

          <button
            v-for="notification in notifications"
            v-else
            :key="notification.id"
            type="button"
            class="block w-full border-b border-otl-divider px-4 py-3 text-left text-body-sm last:border-0 hover:bg-bg-washed"
            :class="
              notification.read
                ? 'text-txt-black-500'
                : 'bg-bg-primary-50 text-txt-black-900'
            "
            @click="markAsRead(notification.id)"
          >
            <p>{{ notification.message }}</p>
            <p class="mt-0.5 text-body-xs text-txt-black-500">
              {{ notification.time }}
            </p>
          </button>
        </div>
      </div>
    </template>
  </VDropdown>
</template>
