<script setup>
definePageMeta({
  title: "login-v2",
  layout: "empty",
});

const form = ref({
  username: "",
  password: "",
  remember: false,
});
</script>

<template>
  <div
    class="flex min-h-[calc(100vh-var(--masthead-height))] items-center justify-center bg-bg-washed px-4 py-10"
  >
    <div class="w-full max-w-md">
      <!-- Agency marks sit above the card, not inside it. The e-JUTRA emblem
           carries its own dark ground, so it is masked into a circle rather
           than laid flat on the page. -->
      <div class="mb-8 flex flex-col items-center gap-3">
        <div class="flex items-center justify-center gap-5">
          <img
            class="h-20 w-auto object-contain"
            src="@/assets/img/logo/apmm_logo_baru.png"
            alt="Agensi Penguatkuasaan Maritim Malaysia"
          />
          <!-- #1b233a is the ground the emblem was drawn against (sampled from
               jutra.png), so the artwork keeps its intended contrast. -->
          <span
            class="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-[#1b233a] shadow-card"
          >
            <img
              class="h-14 w-14 object-contain"
              src="@/assets/img/logo/LOGO_apmm.png"
              alt="e-JUTRA"
            />
          </span>
        </div>

        <span
          class="font-heading text-heading-2xs font-semibold tracking-tight text-txt-black-900"
        >
          e-JUTRA
        </span>
      </div>

      <div
        class="rounded-xl border border-otl-gray-200 bg-bg-white p-8 shadow-card"
      >
        <h1
          class="font-heading text-heading-2xs font-semibold text-txt-black-900"
        >
          Log Masuk
        </h1>
        <p class="mt-1 text-body-sm text-txt-black-500">
          Selamat kembali. Sila log masuk untuk meneruskan.
        </p>

        <form class="mt-6 space-y-4" @submit.prevent>
          <div>
            <label
              for="login-username"
              class="mb-1.5 block text-body-sm font-medium text-txt-black-900"
            >
              Nama Pengguna <span class="text-txt-danger">*</span>
            </label>
            <input
              id="login-username"
              v-model="form.username"
              type="text"
              autocomplete="username"
              placeholder="Masukkan nama pengguna"
              class="block w-full rounded-md border border-otl-gray-300 bg-bg-white px-3 py-2.5 text-body-sm text-txt-black-900 shadow-button transition-colors placeholder:text-txt-black-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-fr-primary"
            />
          </div>

          <div>
            <label
              for="login-password"
              class="mb-1.5 block text-body-sm font-medium text-txt-black-900"
            >
              Kata Laluan <span class="text-txt-danger">*</span>
            </label>
            <input
              id="login-password"
              v-model="form.password"
              type="password"
              autocomplete="current-password"
              placeholder="Masukkan kata laluan"
              class="block w-full rounded-md border border-otl-gray-300 bg-bg-white px-3 py-2.5 text-body-sm text-txt-black-900 shadow-button transition-colors placeholder:text-txt-black-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-fr-primary"
            />
          </div>

          <div class="flex items-center justify-between gap-3">
            <label
              class="flex cursor-pointer items-center gap-2 text-body-sm text-txt-black-700"
            >
              <input
                v-model="form.remember"
                type="checkbox"
                class="h-4 w-4 rounded border-otl-gray-300 text-primary focus:ring-2 focus:ring-fr-primary"
              />
              Ingat Saya
            </label>

            <NuxtLink
              to="/auth/forgot-password-v2"
              class="text-body-sm text-txt-primary hover:underline"
            >
              Lupa Kata Laluan?
            </NuxtLink>
          </div>

          <NuxtLink to="/dashboard" class="block">
            <button
              type="button"
              class="w-full rounded-md bg-primary px-4 py-2.5 text-body-sm font-medium text-white shadow-button transition-colors hover:bg-primary-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-fr-primary focus-visible:ring-offset-2"
            >
              Log Masuk as Admin
            </button>
          </NuxtLink>
        </form>

        <p class="mt-6 text-center text-body-sm text-txt-black-500">
          Tiada akaun?
          <NuxtLink
            to="/auth/register-v2"
            class="font-medium text-txt-primary hover:underline"
          >
            Daftar
          </NuxtLink>
        </p>
      </div>

      <p class="mt-6 text-center text-body-xs text-txt-black-500">
        Sistem Pengurusan dan Pemantauan Aset Kejuruteraan Marin APMM (e-JUTRA)
      </p>
    </div>
  </div>
</template>
