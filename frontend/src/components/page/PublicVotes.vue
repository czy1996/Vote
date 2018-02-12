<template>
  <v-container grid-list-md>
    <v-layout
      v-for="(id, i) in votes"
      :key="i"
      row
      justify-center
    >
    <v-flex md7 xs12>
      <vote-card :id="id"/>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import vote from '../../api/vote'
  import VoteCard from '../common/VoteCard'
  export default {
    components: {VoteCard},
    name: 'public-votes',
    data () {
      return {
        votes: [],
      }
    },

    mounted () {
      vote.getPublicAll().then(
        data => {
          this.votes = data
        },
      )
    },
  }
</script>

<style scoped>

</style>
