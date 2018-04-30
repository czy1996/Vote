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
                ></v-text-field>
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
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
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
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
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
                    ></v-text-field>
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
  export default {
    name: 'create-vote',
    data () {
      return {
        numberOfOptions: 2,
        title: '',
        description: '',
        options_helper: [
          {
            title: '',
          },
        ],
      }
    },
    methods: {
      submit () {
        this.$log('vote submit')
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
    },
  }
</script>

<style scoped>

</style>
