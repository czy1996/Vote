<template>
  <v-card>
    <v-card-title primary-title>
      <div class="headline">漫威的电影看腻了吗神马LSKJFLSDFLSDFJdasdf</div>
    </v-card-title>
    <v-card-text>
      <v-container fluid class="option-container">
        <div
          v-for="(option, i) in options"
          :key="i"
        >
          <v-layout
            row
            justify-space-between
          >
            <v-flex>
              <v-checkbox
                :label="option.name"
                hide-details
                v-model="option.selected"
              ></v-checkbox>
            </v-flex>
            <template>
              <v-spacer @click="toggleDescription(i)"></v-spacer>
              <v-icon @click="toggleDescription(i)">keyboard_arrow_down</v-icon>
            </template>

          </v-layout>
          <transition name="slide-y-transition">
            <v-layout v-if="option.isDes">
              <v-card-text>
                {{option.description}}
              </v-card-text>
            </v-layout>
          </transition>
        </div>
        <v-container>
          <v-layout>
            <v-flex md12 xs12 class="chart-container">
              <chart
                theme="macarons"
                :options="echartsOptions"
                auto-resize
                class="flex"
              ></chart>
            </v-flex>
          </v-layout>

        </v-container>
      </v-container>
    </v-card-text>
  </v-card>

</template>

<script>
  export default {
    name: 'vote-card',

    data () {
      return {
        options: [
          {
            id: 1,
            name: '看腻了',
            selected: false,
            description: '真不想看',
            value: 90,
            isDes: false,
          },
          {
            id: 2,
            name: '没看腻',
            selected: false,
            value: 70,
            isDes: false,
          },
          {
            id: 2,
            name: '没看腻',
            selected: false,
            value: 70,
            isDes: false,
          },
          {
            id: 2,
            name: '没看腻',
            selected: false,
            value: 70,
            isDes: false,
          },
          {
            id: 2,
            name: '没看腻',
            selected: false,
            value: 70,
            isDes: false,
          },
          {
            id: 2,
            name: '没看腻',
            selected: false,
            value: 70,
            isDes: false,
          },
        ],

      }
    },

    computed: {
      echartsOptions () {
        return {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          grid: {
            // x: 80,
            y: 0,
            height: 200,
            // x2: 0,
            y2: 0,
          },
          yAxis: {
            type: 'category',
            axisTick: {show: false}, // 刻度
            axisLine: {show: false}, // 轴线
            splitLine: {show: false}, // 网格线
            data: this.options.map(op => op.name),
            // max: 3,
          },
          xAxis: {
            type: 'value',
            splitLine: {show: false}, // 网格线
            axisTick: {show: false}, // 刻度
            axisLine: {show: false}, // 轴线

          },
          series: [{
            data: this.options.map(op => op.value),
            type: 'bar',
            barMaxWidth: 40,
            barCategoryGap: '50%',
            label: {
              show: true,
              position: 'insideRight',
            },
          }],
        }
      },
    },

    methods: {
      toggleDescription (i) {
        this.options[i].isDes = !this.options[i].isDes
      },
    },
  }
</script>

<style scoped>
  .option-container {
    padding-right: 12px;
    padding-left: 12px;
  }

  .echarts {
    width: 100%;
  }

  .chart-container {
    height: 230px;
  }
</style>
