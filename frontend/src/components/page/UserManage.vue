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
          <v-dialog v-model="dialog" max-width="500px">
            <v-btn slot="activator" color="primary" dark class="mb-2">新增用户</v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">用户管理</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.username" label="用户名"></v-text-field>
                      <v-text-field v-model="editedItem.password" label="密码"></v-text-field>

                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="close">取消</v-btn>
                <v-btn color="blue darken-1" flat @click.native="save">保存</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
        dialog: false,
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
        editedItem: {
          username: '',
          id: -1,
        },
        // Todo：真实增删改查
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
      save () {
        this.close()
      },
      close () {
        this.dialog = false
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
