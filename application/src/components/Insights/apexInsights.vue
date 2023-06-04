<template>
  <div class="bg-white">
    <div class="text-weight-bold q-pa-md text-h6">Total Incidents</div>
    <q-separator />
    <apexchart class="q-pa-md" type="area" height="350" :options="chartOptions" :series="series"/>
  </div>
</template>

<script>
import { projectDb } from "src/boot/firebase"

export default {
  name: "apexInsights",
  data() {
    return {
      series: [
        {
          data: [0,0,0,3,2,1,0,3,0,1,0,1,0],
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 5,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [
            "Basement 1",
            "Basement 2",
            "Basement 3",
            "1st Floor",
            "2nd Floor",
            "3rd Floor",
            "5th Floor",
            "7th Floor",
            "8th Floor",
            "9th Floor",
            "10th Floor",
            "11th Floor",
            "12th Floor",
          ],
        },
      },
    }
  },
  created() {

  },
}
</script>
