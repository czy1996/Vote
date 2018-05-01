<template>
  <v-card v-if="loaded">
    <v-card-title primary-title>
      <div class="headline">{{title}}</div>
    </v-card-title>

    <v-card-text>
      <v-container fluid class="option-container">
        {{records}}

        <v-container v-if="submitted">
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

    <v-card-actions v-if="!submitted">
      <v-btn flat color="primary" @click="submit">
        提交
      </v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>
  import vote from '../../api/vote'

  export default {
    name: 'vote-board-card',

    props: ['id'],

    data () {
      return {
        submitted: false,
        title: '',
        loaded: false,  // displayed after loaded
        options: [],
        records: [],
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
            data: this.options.map(op => op.title),
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
              position: 'right',  // 条上的数字
            },
          }],
        }
      },
    },

    methods: {
      toggleDescription (i) {
        this.options[i].isDes = !this.options[i].isDes
      },

      buildVoteData () {
        let seletedOptions = this.options.filter(o => o.selected)
        let data = {}
        for (let option of seletedOptions) {
          option.value += 1
          data[option.id] = {
            'inc': 1,
          }
        }
        return data
      },

      submit () {
        let data = this.buildVoteData()
        vote.optionInc(this.id, data).then(data => {
          this.$log(data)
          this.submitted = true
        })
      },

      loadVoteData (id) {
        vote.getPrivate(id).then(data => {
          this.$log(data)
          this.title = data.title
          for (let i = 0; i < data.options.length; i++) {
            this.$set(this.options, i, Object.assign(
              {},
              data.options[i],
              {
                isDes: false,
                selected: false,
              }))
          }
          this.loaded = true
        })
        vote.getRecordsAll(id).then(data => {
          this.records = data
        })
      },
    },

    mounted () {
      this.$log('current id', this.id, typeof this.id)
      this.loadVoteData(this.id)
    },
  }
</script>

<style scoped>

</style>
