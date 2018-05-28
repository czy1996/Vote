<template>
  <v-container fluid>
    <v-layout row justify-center>
      <v-flex xs12 md7>
        <v-card>
          <v-card-text>
            <v-layout row>

              <v-flex xs4>
                <v-subheader>投票标题</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field
                  name="title"
                  label="投票标题"
                  id="id-input-title"
                  v-model="title"
                />
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs4>
                <v-subheader>描述</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field
                  name="description"
                  label="投票描述"
                  multi-line
                  rows="3"
                  v-model="description"
                />
              </v-flex>
            </v-layout>
            <v-layout id="layout-time-start" row>
              <v-flex xs4>
                <v-subheader>开始时间</v-subheader>
              </v-flex>
              <v-flex xs3>
                <v-menu id="date-picker-start"
                        ref="menuDateStart"
                        :close-on-content-click="false"
                        v-model="menuDateStart"
                        :nudge-right="40"
                        :return-value.sync="dateStart"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="dateStart"
                    label="开始日期"
                    prepend-icon="event"
                    readonly
                  />
                  <v-date-picker
                    v-model="dateStart"
                    no-title
                    scrollable
                    v-bind:min="today"
                  >
                    <v-spacer/>
                    <v-btn flat color="primary" @click="menuDateStart = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.menuDateStart.save(dateStart)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
            <v-layout id="layout-time-end" row>
              <v-flex xs4>
                <v-subheader>结束时间</v-subheader>
              </v-flex>
              <v-flex xs3>
                <v-menu id="date-picker-end"
                        ref="menuDateEnd"
                        :close-on-content-click="false"
                        v-model="menuDateEnd"
                        :nudge-right="40"
                        :return-value.sync="dateEnd"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="dateEnd"
                    label="结束日期"
                    prepend-icon="event"
                    readonly
                  />
                  <v-date-picker
                    v-model="dateEnd"
                    no-title
                    scrollable
                    v-bind:min="today"
                  >
                    <v-spacer/>
                    <v-btn flat color="primary" @click="menuDateEnd = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.menuDateEnd.save(dateEnd)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
            <v-layout id="layout-number-of-options" row>
              <v-flex xs4>
                <v-subheader>选项数量</v-subheader>
              </v-flex>
              <v-flex xs1 md1>
                <v-text-field
                  name="numberOfOptions"
                  label="选项数量"
                  v-model.number="numberOfOptions"
                  type="number"
                  min="0"
                />
              </v-flex>
            </v-layout>
            <v-layout id="layout-options" row>
              <v-flex xs4>
                <v-subheader>选项</v-subheader>
              </v-flex>
              <v-layout column>
                <v-layout v-for="(option, i) in options"
                          :key="i"
                >
                  <v-flex>
                    <v-text-field
                      :label="'选项'+ (i + 1)"
                      v-model="option.title"
                    />
                  </v-flex>

                </v-layout>

              </v-layout>

            </v-layout>

          </v-card-text>
          <v-btn flat color="primary" @click="submit">
            提交
          </v-btn>

        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  import vote from '../../api/vote'

  export default {
    name: 'create-vote',
    data () {
      return {
        numberOfOptions: 2,
        title: '',
        description: '',
        options_helper: [],
        dateStart: null,
        dateEnd: null,
        menuDateStart: false,
        menuDateEnd: false,
      }
    },
    methods: {
      submit () {
        this.$log('vote submit')
        let data = {
          title: this.title,
          // description: this.description,
          options: this.options,
        }
        vote.postPrivate(data).then(res => {
          this.$log('vote submit response', res)
        })
      },
    },
    computed: {
      options () {
        let result = []
        for (let i = 0; i < this.numberOfOptions; i++) {
          if (i < this.options_helper.length) {
            result.push(this.options_helper[i])
          } else {
            result.push({
              title: '',
            })
          }
        }
        this.options_helper = result
        return result
      },
      today () {
        let date = new Date()
        let Y = date.getFullYear()
        let M = date.getMonth() + 1
        M = M < 10 ? '0' + M : M // 不够两位补充0
        let D = date.getDate()
        D = D < 10 ? '0' + D : D
        this.$log('today', Y + '-' + M + '-' + D)
        return Y + '-' + M + '-' + D
      },
    },
  }
</script>

<style scoped>

</style>
