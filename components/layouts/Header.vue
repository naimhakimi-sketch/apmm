<script setup>
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

// Below lg the sidebar is an off-canvas drawer; on desktop it is collapsed
// with the rail button on the sidebar edge instead (see sidemenu/index.vue).
const { toggleMobile } = useSidebar();

// Clear the session and return to the login screen.
function logout() {
  userStore.setUser(null);
  userStore.setAuth(false);
  return navigateTo("/auth/login-v2");
}

onMounted(() => {
  // If mobile toggleMenu
  if (window.innerWidth < 768) {
    emit("toggleMenu", true);
  }
});
</script>

<template>
  <div class="w-header">
    <div
      class="w-header-main flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8"
    >
      <button
        class="icon-btn h-10 w-10 rounded-md flex-shrink-0 lg:hidden"
        aria-label="Togol menu"
        @click="toggleMobile"
      >
        <Icon name="ic:round-menu" size="22" />
      </button>

      <span
        class="min-w-0 flex-1 truncate font-heading font-semibold text-body-sm lg:text-body-md text-txt-black-900"
      >
        SISTEM PENGURUSAN DAN PEMANTAUAN ASET KEJURUTERAAN MARIN APMM (e-JUTRA)
      </span>

      <!-- MYDS header utilities -->
      <div class="flex flex-shrink-0 items-center gap-1">
        <LayoutsFontSizeToggle />
        <LayoutsThemeToggle />
        <LayoutsLanguageSwitcher class="hidden sm:inline-flex" />
        <LayoutsNotificationBell />
      </div>

      <VDropdown placement="bottom-end" distance="8" name="profile">
        <button
          class="flex items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-bg-washed"
        >
          <img
            class="h-8 w-8 flex-shrink-0 rounded-full object-cover"
            src="@/assets/img/user/default.svg"
            alt=""
          />
          <span class="hidden min-w-0 sm:grid">
            <span
              class="truncate text-body-sm font-medium text-txt-black-900 max-w-[12rem]"
            >
              BK(M) ABD HALIM BIN HAMID
            </span>
            <span
              class="truncate text-body-xs text-txt-black-500 max-w-[12rem]"
            >
              BENTARA KANAN MARITIM
            </span>
          </span>
          <Icon
            name="ic:outline-keyboard-arrow-down"
            size="18"
            class="flex-shrink-0 text-txt-black-500"
          />
        </button>

        <template #popper>
          <ul class="header-dropdown w-full md:w-52 py-1">
            <li>
              <button
                v-close-popper
                type="button"
                class="flex w-full cursor-pointer items-center px-4 py-2 text-left text-body-sm text-txt-black-700 hover:bg-bg-washed"
                @click="logout"
              >
                <Icon name="ic:outline-logout" size="18" class="mr-2" />
                Log Keluar
              </button>
            </li>
          </ul>
        </template>
      </VDropdown>
    </div>
  </div>
</template>
