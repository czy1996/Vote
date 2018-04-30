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
              textarea
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


  </v-container>

</template>

<script>
  export default {
    name: 'encrypt-vote',
  }
</script>

<style scoped>

</style>
