<script setup lang="ts">
// @types/chart.jsの型付けを使用するためにimportしてます。
import type { ChartData, ChartOptions } from 'chart.js';

// それぞれの部品をインポートしていきます。
// まだ種類があると思いますが、とりあえず手当たり次第importしておきます。
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Filler,
  LineElement
} from 'chart.js'

// 今回はRadar-chartを作成するので、import。
// 他にも{ Bar }など、種類があります。
import { Radar } from 'vue-chartjs'

// ここでChartJSでこれらを使います〜と登録してあげます。
ChartJS.register(CategoryScale, LinearScale, BarElement,PointElement ,RadialLinearScale, LineElement, Filler, Title, Tooltip, Legend)

type Props = {
  health_point : number | undefined
  price_point : number | undefined
  mania_point : number | undefined
}

const props = defineProps<Props>()

// ここではchartに使うdataを登録していきます。
// ChartData<'radar'>でRadar-Chartの型付けを使ってます。
// 他にも<"bar">などがあります。
const data:ChartData<'radar'> = {
  labels: [
    '管理状態',
    '価格帯',
    'マニア度',
  ],
  datasets: [
    {
      label: '植物評価',
      backgroundColor: 'rgba(39, 63, 243,0.1)',
      borderColor: 'rgba(39, 63, 243,1)',
      pointBackgroundColor: 'rgba(39, 63, 243,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(39, 63, 243,1)',
      // data: [props.health_point, props.price_point,props.mania_point]
      data: [props.health_point,props.price_point,props.mania_point]
    },
    // {
    //   label: '植物平均評価',
    //   backgroundColor: 'rgba(255,99,132,0.2)',
    //   borderColor: 'rgba(255,99,132,1)',
    //   pointBackgroundColor: 'rgba(255,99,132,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(255,99,132,1)',
    //   data: [3.1, 2.0, 3.5]
    // }
  ]
};

// ここではchartに使うoptionsを登録
const options:ChartOptions<'radar'> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
            r:{
              min:0,
              max:5.0,
              pointLabels: {
                font: {
                  size: 18
                }
              }
            }
        } 
};
</script>

<template>
  <!-- 定義したdataとoptionsを渡してあげます。 -->
  <div>
    <Radar :data="data" :options="options"/>
  </div>

 

</template>