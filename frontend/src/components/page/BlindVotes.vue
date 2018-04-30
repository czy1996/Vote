<template>
  <v-container grid-list-md>
    <v-layout
      v-for="(id, i) in votes"
      :key="i"
      row
      justify-center
    >
      <v-flex md7 xs12>
        <blind-vote-card :id="id"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import vote from '../../api/vote'
  import BlindVoteCard from '../common/BlindVoteCard'

  export default {
    components: {BlindVoteCard},
    name: 'blind-votes',

    data () {
      return {
        votes: [],
      }
    },

    mounted () {
      vote.getBlindAll().then(
        data => {
          this.votes = data
        },
      )
    },
  }
</script>

<style scoped>

</style>
