<template>
  <div class="head-block-table">
    <h1 class="contant-name">{{Title}}</h1>
    <div class="table-settings">
      <div class="sort-block">
        <label for="sort">Sort by:</label>
        <select v-model="sortKey" @change="sortItems">
          <option value="created_at">Date created</option>
          <option value="created_at.reversed">Date created reversed</option>
          <option value="last_activity">Last activity</option>
          <option value="last_activity.reversed">Last activity reversed</option>
        </select>
      </div>
      <input type="text" v-model="searchQuery" placeholder="Search by username" @input="searchItems" />
      <div>
        <label><input type="checkbox" v-model="showAdmin" @change="filterItems"> Admin</label>
        <label><input type="checkbox" v-model="showUser" @change="filterItems"> User</label>
        <label><input type="checkbox" v-model="showModerator" @change="filterItems"> Moderator</label>
      </div>
    </div>
  </div>
  <div class="table-wrapper">
    <!-- Таблица для отображения записей -->
    <table>
      <thead>
        <tr>
          <th v-for="key in objectKeys" :key="key">{{ key }}</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredItems" :key="item.id">
          <td v-for="key in Object.keys(item)" :key="key" v-html="item[key]"></td>
          <td>
            <button @click="editItem(item.id,item.role)">Edit</button>
            <button @click="deleteItem(item.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Форма для редактирования записи -->
    <div v-if="isEditing" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h3>Edit record</h3>
        <form>
          <div class="modal-block">
            <label class = "edit-name" for="name">Role</label>
            <select v-model="role" id="name">
              <option value="admin">admin</option>
              <option value="user">user</option>
              <option value="moderator">moderator</option>
            </select>
          </div>
          <div class="modal-buttons">
            <button type="submit" @click = "saveItem">Save</button>
            <button type="button" @click="closeModal">Canel</button>
          </div>
        </form>
      </div>
    </div>
    <PreLoader :loading = "load"></PreLoader>
  </div>
</template>

<script>


import PreLoader from "./PreLoader.vue";
export default {
  name: 'TableC',
  components: {
    PreLoader
  },
  props: {
    Title: {
      type: String,
      default: 'TableName'
    }
  },
  data() {
    return {
      isEditing: false, // Флаг для редактирования
      currentId: 0,
      currentItem: {}, // Текущая редактируемая запись
      first:true, // Текущая редактируемая запись
      role:"",
      sortKey: 'created_at',
      searchQuery: '',
      showAdmin: true,
      showUser: true,
      showModerator: true,
    };
  },
  computed: {
    load(){
      return this.$store.getters.getLoad;
    },
    objectKeys() {
      if(this.items[0]){
        return Object.keys(this.items[0]);
      }
      return Object.keys(this.items);
    },
    items(){
      let a = this.$store.getters.getAdminInfo.data;
      if(a === undefined){
        return [];
      }
      if(this.first){
        a.forEach((el) => {
          const date = new Date(el.created_at * 1000);
          el.created_at = date.toDateString();
          el.username = el.profile.username;
          el.last_activity  = el.profile.last_activity;
          delete el.profile
        });
        this.changeFirst();
      }
      return [...a];
    },
    filteredItems() {
      let filtered = this.items;
      if (this.searchQuery) {
        filtered = filtered.filter(item => item.username.toLowerCase().includes(this.searchQuery.toLowerCase()));
      }
      filtered = filtered.filter(item => {
        if (item.role === 'admin' && !this.showAdmin) return false;
        if (item.role === 'user' && !this.showUser) return false;
        if (item.role === 'moderator' && !this.showModerator) return false;
        return true;
      });
      return filtered;
    }
  },
  created() {
    this.$store.dispatch('getAdminInfo')
  },
  methods: {
    changeFirst(){
      this.first = false;
    },
    fetchItems() {
      this.$store.dispatch('getAdminInfo')
    },

    editItem(id,role) {
      this.isEditing = true;
      this.currentId = id;
      this.role = role;
      this.currentItem = {...this.items.find(item => item.id === id)};
    },

    // Сохранить изменения и закрыть модальное окно
    saveItem() {
      const index = this.currentItem.uid;
      let a = this.$store.getters.getAdminInfo.data;
      a.forEach((el) => {
        if(el.uid === index){
          el.role = this.role;
        }
      });
      this.$store.dispatch('modifyRole',{
        id:index,
        role:this.role
      })
      this.closeModal(); // Закрываем окно
      this.isEditing = false;
    },

    // Закрыть модальное окно
    closeModal() {
      this.isEditing = false;
      this.currentItem = {};
    },

    // Удалить запись
    async deleteItem(id) {
      try {
        this.items = [...this.items.filter((el) => el.id !== id)];
      } catch (error) {
        console.error('Ошибка при удалении записи:', error);
      }
    },
    sortItems() {
      let a = this.$store.getters.getAdminInfo.data;
      let [sortKey, order] = this.sortKey.split('.');
      if(sortKey == "created_at"){
        if(order === 'reversed') {
          a.sort((a, b) => {
            const datea = new Date(a[sortKey]);
            const dateb = new Date(b[sortKey]);

            const secondsa = Math.floor(datea.getTime() / 1000);
            const secondsb = Math.floor(dateb.getTime() / 1000);
            if (secondsa < secondsb) return 1;
            if (secondsa > secondsb) return -1;
            return 0;
          });
        } else {
          a.sort((a, b) => {
            const datea = new Date(a[sortKey]);
            const dateb = new Date(b[sortKey]);

            const secondsa = Math.floor(datea.getTime() / 1000);
            const secondsb = Math.floor(dateb.getTime() / 1000);
            if (secondsa < secondsb) return -1;
            if (secondsa > secondsb) return 1;
            return 0;
          });
        }
      }else{
        if(order === 'reversed') {
          a.sort((a, b) => {
            if (a[sortKey] < b[sortKey]) return 1;
            if (a[sortKey] > b[sortKey]) return -1;
            return 0;
          });
        } else {
          a.sort((a, b) => {
            if (a[sortKey] < b[sortKey]) return -1;
            if (a[sortKey] > b[sortKey]) return 1;
            return 0;
          });
        }
      }

    },
    searchItems() {
      this.filteredItems;
    },
    filterItems() {
      this.filteredItems;
    },
  }
};
</script>

<style scoped>
/* Стиль таблицы и формы */
.table-wrapper{
  height: 55vh;
  overflow-y: scroll;

}
table {
  width: 100%;
  height: 500px;
  border-collapse: collapse;
}
th, td {
  padding: 10px;
  border: 1px solid #ddd;
}
button {
  margin: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
form div {
  margin: 10px 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.modal h3 {
  margin-top: 0;
  text-align: center;
}
.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.edit-name{
    margin-right: 15px;
    text-align: center;
}
td{
    text-align: center;
    word-wrap: break-word;
    max-width: 100px;
}
.contant-name{
  font-size: 35px;
  margin-bottom: 20px;
}
.modal-block{
  display: flex;
  justify-content: center
}
input[type="checkbox"] {
    display: block;
}
.table-settings{
  display: flex;
  gap: 30px;
  align-items: center;
}
.head-block-table{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.sort-block{
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>