<template>
  <v-container grid-list-md>
    <v-layout
      row
      justify-center>
      <v-flex md7 xs12>
        <v-card>
          <v-card-title>
            用户管理
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="search"
            ></v-text-field>
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="users"
            :search="search"
            class="elevation-1 disable-overflow"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.id }}</td>
              <td>{{ props.item.username }}</td>

              <td class="justify-center layout px-0">
                <v-btn icon class="mx-0" @click="editItem(props.item)">
                  <v-icon color="teal">edit</v-icon>
                </v-btn>
                <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                  <v-icon color="pink">delete</v-icon>
                </v-btn>
              </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import user from '../../api/user.js'

  export default {
    name: 'user-manage',
    data () {
      return {
        search: '',
        headers: [
          {
            text: '用户 Id',
            align: 'left',
            sortable: false,
            value: 'id',
          },
          {
            text: '用户名',
            sortable: false,
            align: 'left',
            value: 'username',
          },
          {
            text: '操作',
            align: 'center',
            sortable: false,
          },
        ],
        users: [
          {
            username: 'fake data',
          },
        ],
      }
    },
    methods: {
      editItem (item) {

      },
      deleteItem (item) {

      },
      loadUsers () {
        user.getAll().then(users => {
          this.users = users
        })
      },
    },
    mounted () {
      this.loadUsers()
    },
  }
</script>

<style scoped>
  .disable-overflow {
    overflow-x: hidden;
  }
</style>
