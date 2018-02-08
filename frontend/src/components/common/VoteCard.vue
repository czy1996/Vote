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
                v-model="option.value"
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
            <v-flex md12 xs12>
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
            value: false,
            description: '真不想看',
            isDes: false,
          },
          {
            id: 2,
            name: '没看腻',
            value: false,
            isDes: false,
          },
        ],
        echartsOptions: {
          yAxis: {
            type: 'category',
            axisTick: {show: false}, // 刻度
            axisLine: {show: false}, // 轴线
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          xAxis: {
            type: 'value',
            axisTick: {show: false}, // 刻度
            axisLine: {show: false}, // 轴线

          },
          series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
          }],
        },
      }
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
</style>
