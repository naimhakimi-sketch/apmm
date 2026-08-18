const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

// MYDS (Malaysia Government Design System) Tailwind preset.
// NOTE: must be required via relative path — the package "exports" map
// does not expose ./tailwind.config.js as a subpath.
const mydsPreset = require("./node_modules/@govtechmy/myds-style/tailwind.config.js");

module.exports = {
  presets: [mydsPreset],
  content: [
    "./app.vue",
    "./error.vue",
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.{vue,js}",
    "./plugins/**/*.{js,ts}",
    "./navigation/**/*.js",
    "./formkit.config.js",
    "./assets/js/**/*.js",
  ],
  plugins: [require("@formkit/themes/tailwindcss")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // The MYDS preset replaces the default Tailwind palette entirely.
        // Existing pages still use the stock palette heavily, so restore it
        // (except `gray`, which deliberately stays on the MYDS ramp).
        black: colors.black,
        slate: colors.slate,
        zinc: colors.zinc,
        neutral: colors.neutral,
        stone: colors.stone,
        red: colors.red,
        orange: colors.orange,
        amber: colors.amber,
        yellow: colors.yellow,
        lime: colors.lime,
        green: colors.green,
        emerald: colors.emerald,
        teal: colors.teal,
        cyan: colors.cyan,
        sky: colors.sky,
        blue: colors.blue,
        indigo: colors.indigo,
        violet: colors.violet,
        purple: colors.purple,
        fuchsia: colors.fuchsia,
        pink: colors.pink,
        rose: colors.rose,
        // Legacy semantic tokens (values now point at MYDS colors in
        // assets/style/css/base/theme.css). DEFAULT entries merge on top of
        // the MYDS 50–950 ramps so both `bg-primary` and `bg-primary-600` work.
        primary: { DEFAULT: "rgb(var(--color-primary), <alpha-value>)" },
        secondary: { DEFAULT: "rgb(var(--color-secondary), <alpha-value>)" },
        accent: { DEFAULT: "rgb(var(--color-accent), <alpha-value>)" },
        success: { DEFAULT: "rgb(var(--color-success), <alpha-value>)" },
        info: { DEFAULT: "rgb(var(--color-info), <alpha-value>)" },
        warning: { DEFAULT: "rgb(var(--color-warning), <alpha-value>)" },
        danger: { DEFAULT: "rgb(var(--color-danger), <alpha-value>)" },
      },
      // The MYDS preset also replaces the default boxShadow scale
      // (shadow-button / shadow-card / shadow-context-menu only), so restore
      // the stock scale for existing shadow-sm/md/lg/... usage.
      boxShadow: {
        ...defaultTheme.boxShadow,
      },
    },
  },
};
