<template>
  <v-card v-if="loaded">
    <v-card-title primary-title>
      <div class="headline">{{title}}</div>
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
                :label="option.title"
                hide-details
                v-model="option.selected"
                :disabled="submitted "
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

        <!--<v-container v-if="submitted">-->
        <!--<v-layout>-->
        <!--<v-flex md12 xs12 class="chart-container">-->
        <!--<chart-->
        <!--theme="macarons"-->
        <!--:options="echartsOptions"-->
        <!--auto-resize-->
        <!--class="flex"-->
        <!--&gt;</chart>-->
        <!--</v-flex>-->
        <!--</v-layout>-->

        <!--</v-container>-->
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
    name: 'blind-vote-card',

    props: ['id'],

    data () {
      return {
        submitted: false,
        title: '',
        loaded: false,  // displayed after loaded
        options: [],
      }
    },

    methods: {
      toggleDescription (i) {
        this.options[i].isDes = !this.options[i].isDes
      },

      loadVoteData (id) {
        vote.getBlind(id).then(data => {
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
      },

      submit () {

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
