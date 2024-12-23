<template>
  <div class="head-block-table">
    <h1 class="contant-name">{{Title}}</h1>
    <div class="table-settings">
      <div class="sort-block">
        <label for="sort">Sort by:</label>
        <select v-model="sortKey" @change="sortItems">
          <option value="created_at">Date created</option>
          <option value="created_at.reversed">Date created reversed</option>
        </select>
      </div>
      <input type="text" class = "search" v-model="searchQuery" placeholder="Search by username" @input="searchItems" />
      <div class = "showrole">
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
          <th v-for="key in objectKeys" :key="key" class = "tablehead">{{ key }}</th>
          <th class = "tablehead">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginatedItems" :key="item.id">
          <td v-for="key in Object.keys(item)" :key="key" v-html="innerFunc(item,key)"></td>
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
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
  </div>
  <PreLoader :loading="load"></PreLoader>
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
      currentPage: 1,
      itemsPerPage: 3,
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
      return [...a];
    },
    filteredItems() {
      let filtered = this.items;
      if (this.searchQuery) {
        filtered = filtered.filter(item => item?.username.toLowerCase().includes(this.searchQuery.toLowerCase()));
      }
      filtered = filtered.filter(item => {
        if (item.role === 'admin' && !this.showAdmin) return false;
        if (item.role === 'user' && !this.showUser) return false;
        if (item.role === 'moderator' && !this.showModerator) return false;
        return true;
      });
      return filtered;
    },
    totalPages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredItems.slice(start, end);
    },
  },
  created() {
    this.$store.dispatch('getAdminInfo',this.$store.getters.getAdminPagination);
  },
  methods: {
    innerFunc(item,key){
      if(key == 'profile_image'){
        if(item[key]){
          return `<img src="${item[key]}" class="admin-img" style="height: 100px; width: 100px; object-fit: cover; object-position: center;">`;
        }else{
          return `<img src="data:image/png;base64,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" class="admin-img" style="height: 100px; width: 100px; object-fit: cover; object-position: center;">`;
        }
      }
      return item[key];
    },
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
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  }
};
</script>

<style scoped>
/* Стиль таблицы и формы */
.table-wrapper {
  height: 55vh;
  overflow-y: scroll;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 15px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f1f1f1;
  font-weight: bold;
  color: #333;
}

td {
  background-color: #fff;
  color: #555;
}

tr:hover td {
  background-color: #f9f9f9;
}

button {
  margin: 5px;
  padding: 8px 12px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
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

.edit-name {
  margin-right: 15px;
  text-align: center;
}

td {
  text-align: center;
  word-wrap: break-word;
  max-width: 100px;
}

.contant-name {
  font-size: 35px;
  margin-bottom: 20px;
}

.modal-block {
  display: flex;
  justify-content: center;
}

input[type="checkbox"] {
  display: block;
}

.table-settings {
  display: flex;
  gap: 30px;
  align-items: center;
}

.head-block-table {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.sort-block {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sort-block label {
  font-weight: bold;
  color: #333;
}

.sort-block select {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  transition: border-color 0.3s;
}

.sort-block select:hover {
  border-color: #aaa;
}

.sort-block {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
  padding: 10px 15px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.sort-block label {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-right: 8px;
}

.sort-block select {
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.sort-block select:hover {
  border-color: #888;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}

.sort-block select:focus {
  outline: none;
  border-color: #0056b3;
  box-shadow: 0 0 6px rgba(0, 86, 179, 0.4);
}

.sort-block select option {
  cursor: pointer !important;
}

.sort-block select option:hover {
  background-color: #e0e0e0 !important;
  color: #333;
  --swiper-theme-color:#e0e0e0 !important;
}

.search {
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.search:hover {
  border-color: #888;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}

.search:focus {
  outline: none;
  border-color: #0056b3;
  box-shadow: 0 0 6px rgba(0, 86, 179, 0.4);
}

.showrole {
  display: flex;
  gap: 15px;
}

.showrole label {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: color 0.3s;
}

.showrole label:hover {
  color: #cfa01e;
}

.showrole input[type="checkbox"] {
  margin-right: 5px;
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #cfa01e;
  transition: transform 0.3s;
}

.showrole input[type="checkbox"]:hover {
  transform: scale(1.1);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s, border-color 0.3s;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.pagination span {
  font-size: 16px;
  font-weight: 500;
}
.admin-img{
  height: 100px;
  width: 100px;
  object-fit: cover;
  object-position: center;
}
.tablehead{
  text-align: center;
}
</style>