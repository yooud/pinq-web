<template>
  <div class="table-wrapper">
    <h1 class="contant-name">{{Title}}</h1>
    <!-- Таблица для отображения записей -->
    <table>
      <thead>
        <tr>
          <th v-for="key in objectKeys" :key="key">{{ key }}</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.password }}</td>
          <td>
            <button @click="editItem(item.id)">Редактировать</button>
            <button @click="deleteItem(item.id)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Форма для редактирования записи -->
    <div v-if="isEditing" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h3>Редактировать запись</h3>
        <form @submit.prevent="saveItem">
          <div>
            <label class = "edit-name" for="name">Название</label>
            <input type="text" v-model="currentItem.name" id="name" />
          </div>
          <div>
            <label class = "edit-name" for="password">Password</label>
            <input type="text" v-model="currentItem.password" id="password" />
          </div>
          <div class="modal-buttons">
            <button type="submit">Сохранить</button>
            <button type="button" @click="closeModal">Canel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TableC',
  props: {
    Title: {
      type: String,
      default: 'TableName'
    }
  },
  data() {
    return {
      items: [], // Список записей
      isEditing: false, // Флаг для редактирования
      currentItem: {} // Текущая редактируемая запись
    };
  },
  computed: {
    objectKeys() {
      return Object.keys(this.items[0]);
    }
  },
  created() {
    this.fetchItems(); // Загружаем записи при создании компонента
  },
  methods: {
    async fetchItems() {
      this.items = [
        { id: 1, name: "Item 1", password: "password 1" },
        { id: 2, name: "Item 2", password: "password 2" },
        { id: 3, name: "Item 3", password: "password 3" },
        { id: 4, name: "Item 1", password: "password 1" },
        { id: 5, name: "Item 2", password: "password 2" },
        { id: 6, name: "Item 3", password: "password 3" },
        { id: 7, name: "Item 1", password: "password 1" },
        { id: 8, name: "Item 2", password: "password 2" },
        { id: 9, name: "Item 3", password: "password 3" },
      ]
    },

    editItem(id) {
      this.isEditing = true;
      this.currentItem = this.items.find(item => item.id === id);
    },

    // Сохранить изменения и закрыть модальное окно
    saveItem() {
      const index = this.items.findIndex((item) => item.id === this.currentItem.id);
      if (index !== -1) {
        this.items[index] = { ...this.currentItem };
        this.items = [...this.items]
        this.closeModal(); // Закрываем окно
      }
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
    }
  }
};
</script>

<style scoped>
/* Стиль таблицы и формы */
.table-wrapper{
  height: 80vh;
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
}
.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.edit-name{
    margin-right: 15px;
}
td{
    text-align: center;
}
.contant-name{
  font-size: 35px;
  margin-bottom: 20px;
}
</style>