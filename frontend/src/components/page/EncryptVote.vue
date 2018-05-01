<template>
  <v-container>

    <v-layout
      row
      justify-center
    >
      <v-flex xs12 md7>
        <v-card>
          <v-card-text>
            <v-subheader>请在此输入选票</v-subheader>
            <v-subheader>您可以在未登录状态下提交选票</v-subheader>
            <v-subheader>无论是否登录，服务器均不会记录您的行为，并成功计票</v-subheader>

            <v-text-field
              label="选票"
              multi-line
              rows="8"
              v-model="ticket"
            >
            </v-text-field>


          </v-card-text>
          <v-card-actions>
            <v-btn flat @click="submit">提交</v-btn>
          </v-card-actions>

        </v-card>
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title class="headline">{{dialogTitle}}</v-card-title>
        <v-card-text>
          {{dialogMessage}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.native="dialog = false">确定</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>


  </v-container>

</template>

<script>
  import vote from '../../api/vote'

  export default {
    name: 'encrypt-vote',
    data () {
      return {
        ticket: '',
        dialogTitle: '',
        dialogMessage: '',
        dialog: false,
      }
    },
    methods: {
      submit () {
        let ticket = JSON.parse(this.ticket)
        vote.postTicket(ticket).then(data => {
          this.$log('post ticket return', data)
          if (data.status === 'success') {
            this.dialogTitle = '投票成功!请保存查询号码'
            this.dialogMessage = data.trackId
          } else {
            this.dialogTitle = '投票失败'
            this.dialogMessage = data.err_message
          }
          this.dialog = true
        })
      },
    },
  }
</script>

<style scoped>

</style>
