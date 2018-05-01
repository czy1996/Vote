<template>
  <v-container grid-list-md>
    <v-layout
      v-for="(id, i) in votes"
      :key="i"
      row
      justify-center
    >
      <v-flex md7 xs12>
        <vote-board-card :id="id"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import VoteBoardCard from '../common/VoteBoardCard'
  import vote from '../../api/vote'

  export default {
    components: {VoteBoardCard},
    name: 'vote-board',

    data () {
      return {
        votes: [],
      }
    },

    mounted () {
      vote.getBlindAll().then(data => {
        this.votes = data
      })
    },

  }
</script>


<style scoped>

</style>
