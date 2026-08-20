<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6">
    <RsCard>
      <template #header> Kesiapsiagaan Aset Keseluruhan </template>
      <template #body>
        <ClientOnly>
          <VueApexCharts
            :key="changeKey"
            width="100%"
            height="400"
            type="bar"
            :options="chartOptions"
            :series="series"
          ></VueApexCharts>
        </ClientOnly>
      </template>
    </RsCard>

    <RsCard>
      <template #header> Kesiapsiagaan Kapal dan Bot </template>
      <template #body>
        <ClientOnly>
          <VueApexCharts
            :key="changeKey + 1"
            width="100%"
            height="400"
            type="bar"
            :options="chartOptionsKapalBot"
            :series="seriesKapalBot"
          ></VueApexCharts>
        </ClientOnly>
      </template>
    </RsCard>

    <RsCard>
      <template #header> Kesiapsiagaan Bot Mengikut Maritim Negeri </template>
      <template #body>
        <ClientOnly>
          <VueApexCharts
            :key="changeKey + 2"
            width="100%"
            height="400"
            type="bar"
            :options="chartOptionsBotNegeri"
            :series="seriesBotNegeri"
          ></VueApexCharts>
        </ClientOnly>
      </template>
    </RsCard>

    <RsCard>
      <template #header> Kesiapsiagaan Kapal Mengikut Maritim Negeri </template>
      <template #body>
        <ClientOnly>
          <VueApexCharts
            :key="changeKey + 3"
            width="100%"
            height="400"
            type="bar"
            :options="chartOptionsKapalNegeri"
            :series="seriesKapalNegeri"
          ></VueApexCharts>
        </ClientOnly>
      </template>
    </RsCard>
  </div>
</template>

<script setup>
import RsCard from "@/components/RsCard.vue";

const changeKey = ref(0);

// Theme-aware MYDS chart styling (neutrals flip with dark mode).
const { colors, base: mydsBase } = useMydsChart();
const base = computed(() => mydsBase.value);
const c = colors;

const negeriCategories = [
  "MN KEDAH & PERLIS",
  "MN PULAU PINANG",
  "MN PERAK",
  "MN SELANGOR",
  "MN MELAKA & N. SEMBILAN",
  "MN JOHOR",
  "MN PAHANG",
  "MN TERENGGANU",
  "MN KELANTAN",
  "MN SABAH",
  "MN SABAH & WP LABUAN",
];

const responsiveLegend = [
  {
    breakpoint: 768,
    options: {
      legend: { position: "bottom" },
    },
  },
];

const series = ref([
  {
    name: "OPS",
    type: "bar",
    data: [126, 124, 167],
  },
  {
    name: "Non OPS",
    type: "bar",
    data: [109, 123, 46],
  },
  {
    name: "%",
    type: "line",
    data: [54, 50, 78],
  },
]);

const chartOptions = computed(() => ({
  ...base.value,
  chart: { ...base.value.chart, id: "apexChart", stacked: false },
  xaxis: {
    categories: [2020, 2021, 2022],
    title: { text: "Tahun" },
  },
  yaxis: [
    {
      seriesName: "OPS",
      title: { text: "Bilangan Aset" },
      min: 0,
      max: 200,
    },
    {
      seriesName: "OPS",
      show: false,
    },
    {
      seriesName: "%",
      opposite: true,
      title: { text: "%" },
      min: 0,
      max: 100,
    },
  ],
  dataLabels: {
    enabled: true,
    enabledOnSeries: [0, 1],
    formatter: function (val, opts) {
      if (opts.seriesIndex === 2) {
        return val + " %";
      }
      return val;
    },
  },
  stroke: {
    width: [0, 0, 2],
    curve: "smooth",
  },
  colors: [c.value.primary, c.value.danger, c.value.warning],
  responsive: responsiveLegend,
}));

const seriesKapalBot = ref([
  {
    name: "Kapal OPS",
    type: "bar",
    data: [35, 20, 45],
  },
  {
    name: "Bot OPS",
    type: "bar",
    data: [100, 100, 120],
  },
  {
    name: "% Kapal OPS",
    type: "line",
    data: [50, 40, 70],
  },
  {
    name: "% Bot OPS",
    type: "line",
    data: [55, 60, 75],
  },
]);

const chartOptionsKapalBot = computed(() => ({
  ...base.value,
  chart: { ...base.value.chart, id: "apexChartKapalBot", stacked: false },
  xaxis: {
    categories: [2020, 2021, 2022],
    title: { text: "Tahun" },
  },
  yaxis: [
    {
      seriesName: "Kapal OPS",
      title: { text: "Bilangan Bot" },
      min: 0,
      max: 150,
    },
    {
      seriesName: "Kapal OPS",
      show: false,
    },
    {
      seriesName: "% Kapal OPS",
      opposite: true,
      title: { text: "Peratusan Bot" },
      min: 0,
      max: 100,
    },
    {
      seriesName: "% Kapal OPS",
      show: false,
    },
  ],
  dataLabels: {
    enabled: true,
    enabledOnSeries: [0, 1],
    formatter: function (val, opts) {
      if (opts.seriesIndex === 2 || opts.seriesIndex === 3) {
        return val + " %";
      }
      return val;
    },
  },
  stroke: {
    width: [0, 0, 2, 2],
    curve: "smooth",
    dashArray: [0, 0, 0, 6],
  },
  colors: [c.value.primary, c.value.warning, c.value.success, c.value.ink],
  responsive: responsiveLegend,
}));

const seriesBotNegeri = ref([
  {
    name: "Total Bot",
    type: "bar",
    data: [30, 10, 15, 20, 10, 5, 10, 5, 8, 15, 50],
  },
  {
    name: "% Bot OPS",
    type: "line",
    data: [50, 52, 60, 55, 58, 62, 59, 65, 53, 57, 70],
  },
]);

const chartOptionsBotNegeri = computed(() => ({
  ...base.value,
  chart: { ...base.value.chart, id: "apexChartBotNegeri", stacked: false },
  xaxis: {
    categories: negeriCategories,
    title: { text: "" },
    labels: {
      rotate: -45,
      style: { fontSize: "12px" },
    },
  },
  yaxis: [
    {
      title: { text: "Bilangan Aset" },
      min: 0,
      max: 150,
    },
    {
      opposite: true,
      title: { text: "Peratusan Bot" },
      min: 0,
      max: 100,
    },
  ],
  dataLabels: {
    enabled: true,
    enabledOnSeries: [0],
    formatter: function (val, opts) {
      if (opts.seriesIndex === 1) {
        return val + " %";
      }
      return val;
    },
  },
  stroke: {
    width: [0, 2],
    curve: "smooth",
  },
  colors: [c.value.warning, c.value.warningDark],
  responsive: responsiveLegend,
}));

const seriesKapalNegeri = ref([
  {
    name: "Total Kapal",
    type: "bar",
    data: [5, 3, 10, 4, 2, 12, 6, 3, 4, 10, 11],
  },
  {
    name: "% Kapal OPS",
    type: "line",
    data: [50, 45, 75, 55, 60, 65, 40, 55, 48, 50, 49],
  },
]);

const chartOptionsKapalNegeri = computed(() => ({
  ...base.value,
  chart: { ...base.value.chart, id: "apexChartKapalNegeri", stacked: false },
  xaxis: {
    categories: negeriCategories,
    title: { text: "" },
    labels: {
      rotate: -45,
      style: { fontSize: "12px" },
    },
  },
  yaxis: [
    {
      title: { text: "Bilangan Aset" },
      min: 0,
      max: 100,
    },
    {
      opposite: true,
      title: { text: "Peratusan Kapal" },
      min: 0,
      max: 100,
    },
  ],
  dataLabels: {
    enabled: true,
    enabledOnSeries: [0],
    formatter: function (val, opts) {
      if (opts.seriesIndex === 1) {
        return val + " %";
      }
      return val;
    },
  },
  stroke: {
    width: [0, 2],
    curve: "smooth",
  },
  colors: [c.value.primary, c.value.success],
  responsive: responsiveLegend,
}));

onMounted(() => {
  setTimeout(() => {
    changeKey.value++;
  }, 500);
});
</script>
