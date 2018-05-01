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

        <v-dialog v-model="dialog" persistent max-width="500">
          <v-card>
            <v-card-title class="headline">{{verifyStatus}}</v-card-title>
            <v-card-text>
              {{verifyMessage}}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click.native="dialog = false">确定</v-btn>
            </v-card-actions>
          </v-card>

        </v-dialog>
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
  import RSAUtils from '../../utils/rsa'
  import rsaApi from '../../api/rsa'

  const rsa = new RSAUtils()

  export default {
    name: 'blind-vote-card',

    props: ['id'],

    data () {
      return {
        submitted: false,
        title: '',
        loaded: false,  // displayed after loaded
        options: [],
        dialog: false,
        verifyStatus: '',
        verifyMessage: '',
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

      buildVoteData () {
        let seletedOptions = this.options.filter(o => o.selected)
        let data = {}
        data.voteId = this.id
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
        let dataMessage = JSON.stringify(data)
        let blindedMessage = rsa.blind(dataMessage)
        rsaApi.sign(blindedMessage).then(data => {
          this.$log(data)
          this.b64sig = data.signature
          this.isSigValid = rsa.verify(dataMessage, data.signature)
          if (this.isSigValid) {
            this.verifyStatus = '签名成功!请妥善保存以下选票信息'

            let result = {}
            result.message = dataMessage
            result.signature = rsa.unblind(this.b64sig)
            this.verifyMessage = `${JSON.stringify(result)}
            `
          } else {
            this.verifyStatus = '签名失败'
            this.verifyMessage = '选举委员会可能存在欺诈！'
          }
          this.dialog = true
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
