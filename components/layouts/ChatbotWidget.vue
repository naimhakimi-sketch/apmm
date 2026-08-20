<script setup>
/**
 * e-JUTRA floating assistant.
 *
 * Prototype only: replies come from a small keyword-matched script rather than
 * a backend, with a typing delay so the exchange feels real during demos.
 *
 * Three states:
 *   docked  -> a slim tab parked against the right edge
 *   closed  -> the round launcher sits above the bottom-right corner
 *   open    -> the conversation panel rises out of the launcher
 */
const open = ref(false);
const docked = ref(false);
const draft = ref("");
const typing = ref(false);
const scroller = ref(null);
const inputEl = ref(null);

let seq = 0;
const nextId = () => ++seq;

const messages = ref([
  {
    id: nextId(),
    from: "bot",
    text: "Selamat datang ke e-JUTRA. Saya Aida, pembantu maya APMM.",
    time: "09:14",
  },
  {
    id: nextId(),
    from: "bot",
    text: "Saya boleh bantu semak status kad kerja, kesiapsiagaan aset, dan maklumat vesel. Apa yang anda perlukan?",
    time: "09:14",
  },
  {
    id: nextId(),
    from: "user",
    text: "Status kad kerja APMM/TBN/06/004",
    time: "09:15",
  },
  {
    id: nextId(),
    from: "bot",
    text: "Kad Kerja APMM/TBN/06/004 (Sistem Sonar, KM Tambisan) berstatus Menunggu Kelulusan sejak 12 Ogos 2026. Pegawai bertanggungjawab: BK(M) Abd Halim.",
    time: "09:15",
  },
]);

const suggestions = [
  "Kesiapsiagaan aset",
  "Senarai kad kerja",
  "Status ROVA",
  "Cara daftar vesel",
];

// Keyword-matched demo replies.
const SCRIPT = [
  {
    match: ["kesiapsiagaan", "aset", "ops"],
    reply:
      "Sehingga hari ini: 167 aset OPS dan 46 Non OPS (78% kesiapsiagaan). Papan pemuka penuh ada di menu Dashboard.",
  },
  {
    match: ["kad kerja", "kad", "maintenance"],
    reply:
      "Terdapat 5 kad kerja aktif bagi KM Tambisan. 3 Dalam Proses, 1 Menunggu Kelulusan, 1 Selesai. Buka Pembaikan Vesel > Corrective Maintenance untuk butiran.",
  },
  {
    match: ["rova", "availability"],
    reply:
      "ROVA bulan Ogos bagi KM Tambisan ialah 82% (Operational). Rekod penuh ada di Pembaikan Vesel > Return of Vessel Availability.",
  },
  {
    match: ["daftar", "vesel", "kapal", "bot"],
    reply:
      "Untuk mendaftar vesel baharu, pergi ke Pendaftaran Vesel, isi maklumat asas dan spesifikasi, kemudian hantar untuk kelulusan HQ.",
  },
  {
    match: ["vendor", "kontrak"],
    reply:
      "Terdapat 3 vendor berdaftar dan 1 kontrak akan tamat dalam 30 hari. Lihat Pengurusan Vendor > Pengurusan Kontrak.",
  },
  {
    match: ["terima kasih", "thanks", "ok"],
    reply: "Sama-sama. Ada lagi yang boleh saya bantu?",
  },
];

const FALLBACK =
  "Maaf, saya belum dilatih untuk soalan itu. Cuba tanya tentang kad kerja, kesiapsiagaan aset, ROVA atau pendaftaran vesel.";

function replyFor(text) {
  const q = text.toLowerCase();
  const hit = SCRIPT.find((entry) => entry.match.some((m) => q.includes(m)));
  return hit ? hit.reply : FALLBACK;
}

function now() {
  return new Date().toLocaleTimeString("ms-MY", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

async function scrollToEnd() {
  await nextTick();
  const el = scroller.value;
  if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
}

let replyTimer = null;

function send(text) {
  const body = (text ?? draft.value).trim();
  if (!body || typing.value) return;

  messages.value.push({ id: nextId(), from: "user", text: body, time: now() });
  draft.value = "";
  typing.value = true;
  scrollToEnd();

  replyTimer = setTimeout(() => {
    messages.value.push({
      id: nextId(),
      from: "bot",
      text: replyFor(body),
      time: now(),
    });
    typing.value = false;
    scrollToEnd();
  }, 1100);
}

async function openPanel() {
  open.value = true;
  await scrollToEnd();
  inputEl.value?.focus();
}

function toggle() {
  if (open.value) open.value = false;
  else openPanel();
}

function onKeydown(e) {
  if (e.key === "Escape" && open.value) open.value = false;
}

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
  if (replyTimer) clearTimeout(replyTimer);
});

// Parking the launcher also dismisses the panel.
function dock() {
  open.value = false;
  docked.value = true;
}

function undock() {
  docked.value = false;
}
</script>

<template>
  <div class="chatbot-root">
    <!-- Conversation panel -->
    <Transition name="chat-panel">
      <section
        v-if="open"
        class="fixed bottom-24 right-4 z-[70] flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-xl border border-otl-gray-200 bg-bg-white shadow-context-menu sm:right-6"
        style="height: min(32rem, calc(100vh - 12rem))"
        role="dialog"
        aria-label="Pembantu maya e-JUTRA"
      >
        <!-- Header -->
        <header
          class="flex flex-shrink-0 items-center gap-3 border-b border-otl-divider bg-primary px-4 py-3 text-white"
        >
          <span
            class="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/15"
          >
            <LayoutsBotAvatar class="h-6 w-6 text-white" />
            <span
              class="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-primary bg-success-500"
            ></span>
          </span>

          <span class="min-w-0 flex-1 leading-tight">
            <span class="block truncate font-heading text-body-sm font-semibold">
              Aida
            </span>
            <span class="block truncate text-body-xs text-white/70">
              Pembantu maya e-JUTRA
            </span>
          </span>

          <button
            type="button"
            class="flex h-8 w-8 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            aria-label="Tutup sembang"
            @click="open = false"
          >
            <Icon name="ic:round-close" size="18" />
          </button>
        </header>

        <!-- Messages -->
        <div
          ref="scroller"
          class="flex-1 overflow-y-auto overscroll-contain bg-bg-washed px-4 py-4"
        >
          <TransitionGroup name="chat-msg" tag="div" class="space-y-3">
            <div
              v-for="m in messages"
              :key="m.id"
              class="flex items-end gap-2"
              :class="m.from === 'user' ? 'justify-end' : 'justify-start'"
            >
              <span
                v-if="m.from === 'bot'"
                class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white"
              >
                <LayoutsBotAvatar class="h-5 w-5" />
              </span>

              <span
                class="max-w-[78%] rounded-xl px-3 py-2 text-body-sm shadow-button"
                :class="
                  m.from === 'user'
                    ? 'rounded-br-sm bg-primary text-white'
                    : 'rounded-bl-sm border border-otl-gray-200 bg-bg-white text-txt-black-900'
                "
              >
                {{ m.text }}
                <span
                  class="mt-1 block text-[10px] leading-none"
                  :class="
                    m.from === 'user' ? 'text-white/60' : 'text-txt-black-500'
                  "
                >
                  {{ m.time }}
                </span>
              </span>
            </div>
          </TransitionGroup>

          <!-- Typing indicator -->
          <Transition name="chat-msg">
            <div v-if="typing" class="mt-3 flex items-end gap-2">
              <span
                class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white"
              >
                <LayoutsBotAvatar class="h-5 w-5" />
              </span>
              <span
                class="flex items-center gap-1 rounded-xl rounded-bl-sm border border-otl-gray-200 bg-bg-white px-3 py-3 shadow-button"
              >
                <i class="chat-dot"></i>
                <i class="chat-dot" style="animation-delay: 0.15s"></i>
                <i class="chat-dot" style="animation-delay: 0.3s"></i>
              </span>
            </div>
          </Transition>
        </div>

        <!-- Suggestions -->
        <div
          class="flex flex-shrink-0 gap-2 overflow-x-auto border-t border-otl-divider bg-bg-white px-3 py-2"
        >
          <button
            v-for="s in suggestions"
            :key="s"
            type="button"
            class="whitespace-nowrap rounded-full border border-otl-gray-300 px-3 py-1 text-body-xs text-txt-black-700 transition-colors hover:border-primary hover:bg-bg-primary-50 hover:text-txt-primary"
            @click="send(s)"
          >
            {{ s }}
          </button>
        </div>

        <!-- Composer -->
        <form
          class="flex flex-shrink-0 items-center gap-2 border-t border-otl-divider bg-bg-white px-3 py-3"
          @submit.prevent="send()"
        >
          <input
            ref="inputEl"
            v-model="draft"
            type="text"
            placeholder="Taip mesej anda…"
            aria-label="Mesej"
            class="min-w-0 flex-1 rounded-md border border-otl-gray-300 bg-bg-white px-3 py-2 text-body-sm text-txt-black-900 placeholder:text-txt-black-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-fr-primary"
          />
          <button
            type="submit"
            class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-primary text-white transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
            :disabled="!draft.trim() || typing"
            aria-label="Hantar mesej"
          >
            <Icon name="ic:round-send" size="18" />
          </button>
        </form>
      </section>
    </Transition>

    <!-- Launcher -->
    <Transition name="chat-fab">
      <div v-if="!docked" class="fixed bottom-6 right-4 z-[70] sm:right-6">
        <button
          type="button"
          class="chat-fab flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-context-menu transition-transform duration-200 hover:scale-105"
          :aria-label="open ? 'Tutup sembang' : 'Buka sembang'"
          :aria-expanded="open"
          @click="toggle"
        >
          <Transition name="chat-icon" mode="out-in">
            <Icon
              v-if="open"
              key="close"
              name="ic:round-keyboard-arrow-down"
              size="30"
            />
            <LayoutsBotAvatar v-else key="bot" blink class="h-9 w-9" />
          </Transition>
        </button>

        <!-- Park the launcher against the edge -->
        <button
          type="button"
          class="absolute -left-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border border-otl-gray-200 bg-bg-white text-txt-black-500 shadow-button transition-colors hover:text-txt-black-900"
          aria-label="Sembunyikan butang sembang"
          @click="dock"
        >
          <Icon name="ic:round-chevron-right" size="18" />
        </button>
      </div>
    </Transition>

    <!-- Docked tab -->
    <Transition name="chat-tab">
      <button
        v-if="docked"
        type="button"
        class="fixed bottom-24 right-0 z-[70] flex h-16 w-7 items-center justify-center rounded-l-lg bg-primary text-white shadow-context-menu transition-[width] hover:w-8"
        aria-label="Tunjukkan butang sembang"
        @click="undock"
      >
        <Icon name="ic:round-chevron-left" size="18" />
      </button>
    </Transition>
  </div>
</template>

<style scoped>
/* Panel rises out of the launcher corner */
.chat-panel-enter-active {
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: bottom right;
}
.chat-panel-leave-active {
  transition: opacity 0.16s ease-in, transform 0.16s ease-in;
  transform-origin: bottom right;
}
.chat-panel-enter-from {
  opacity: 0;
  transform: translateY(18px) scale(0.94);
}
.chat-panel-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.97);
}

/* Messages drift up as they arrive */
.chat-msg-enter-active {
  transition: opacity 0.28s ease, transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}
.chat-msg-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.chat-msg-move {
  transition: transform 0.28s ease;
}

/* Launcher <-> docked tab hand-off */
.chat-fab-enter-active,
.chat-tab-enter-active {
  transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}
.chat-fab-leave-active,
.chat-tab-leave-active {
  transition: opacity 0.18s ease-in, transform 0.18s ease-in;
}
.chat-fab-enter-from,
.chat-fab-leave-to {
  opacity: 0;
  transform: translateX(90px) scale(0.8);
}
.chat-tab-enter-from,
.chat-tab-leave-to {
  opacity: 0;
  transform: translateX(24px);
}

/* Launcher icon swap */
.chat-icon-enter-active,
.chat-icon-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.chat-icon-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.6);
}
.chat-icon-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.6);
}

/* Attention pulse on the idle launcher */
.chat-fab::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background-color: rgb(var(--color-primary));
  opacity: 0.35;
  animation: chat-ping 2.4s cubic-bezier(0, 0, 0.2, 1) infinite;
  z-index: -1;
}

@keyframes chat-ping {
  0% {
    transform: scale(1);
    opacity: 0.35;
  }
  70%,
  100% {
    transform: scale(1.7);
    opacity: 0;
  }
}

.chat-dot {
  display: block;
  height: 6px;
  width: 6px;
  border-radius: 9999px;
  background-color: rgb(var(--color-primary));
  animation: chat-bounce 1s ease-in-out infinite;
}

@keyframes chat-bounce {
  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.45;
  }
  30% {
    transform: translateY(-5px);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .chat-fab::after,
  .chat-dot {
    animation: none;
  }
}
</style>
