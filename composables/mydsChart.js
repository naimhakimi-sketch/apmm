// MYDS (Malaysia Government Design System) chart styling for ApexCharts.
//
// Palette notes — validated with a CVD/contrast checker (light surface):
// - Entities keep their hue everywhere: Kapal/Aset = primary blue,
//   Bot = warning ochre. Percentage lines use a darker step of the same
//   hue, or a distinct hue where same-hue steps are too close to read.
// - warning-600 is below 3:1 contrast on white, so bar series always keep
//   their data labels on (relief per accessibility guidance).
export const mydsChartColors = {
  primary: "#2563EB", // MYDS primary-600 — Kapal / Aset bars
  primaryDark: "#1E40AF", // MYDS primary-800
  warning: "#CA8A04", // MYDS warning-600 — Bot bars
  warningDark: "#854D0E", // MYDS warning-800 — % Bot line (paired w/ Bot bar)
  danger: "#DC2626", // MYDS danger-600 — Non-OPS
  success: "#15803D", // MYDS success-700 — % lines needing a distinct hue
  ink: "#18181B", // MYDS gray-900 — dashed reference line
  grid: "#F4F4F5", // MYDS gray-100
  axisLabel: "#6B6B74", // MYDS gray-500
};

// Base ApexCharts options shared by every MYDS-styled chart.
// Spread it first, then override per chart; nested keys you override
// (e.g. `chart`) should re-spread the base value: { ...base.chart, id: "x" }.
export function mydsApexBase() {
  return {
    chart: {
      fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
      foreColor: mydsChartColors.axisLabel,
      toolbar: { show: false },
    },
    grid: {
      borderColor: mydsChartColors.grid,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontSize: "13px",
      itemMargin: { horizontal: 12 },
    },
    tooltip: {
      theme: "light",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 4,
      },
    },
  };
}
