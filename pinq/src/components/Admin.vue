<template>
  <div class="container1">
     <!-- Кнопка для відкриття/закриття меню -->
     <div class="menu-toggle" @click="toggleSidebar">
      <div v-if="!isSidebarOpen" class="burger-icon" >
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>

    <!-- Бічне меню -->
    <div :class="['sidebar', { 'sidebar-open': isSidebarOpen }]">
      <div v-if="isSidebarOpen" class="close-icon" @click="toggleSidebar">×</div>
      <h1 class="sidebar-head">Pinq</h1>
      <ul>
        <li 
          v-for="item in menuItems" 
          :key="item" 
          :class="{ active: selected === item }" 
          @click="selectItem(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>

    <div class="content">
      <Table :Title = "selected"></Table>
    </div>
  </div>
</template>

<script>
import Table from "./Table.vue";
export default {
  name: "AdminC",
  components: {
    Table
  },
  data() {
    return {
      selected: 'Users',
      isSidebarOpen: false,
      categories: [
        { name: 'Beverages', description: 'Soft drinks, coffees, teas, beers, and ales', count: 12 },
        { name: 'Condiments', description: 'Sweet and savory sauces, relishes, spreads, and seasonings', count: 12 },
        { name: 'Confections', description: 'Desserts, candies, and sweet breads', count: 13 },
        { name: 'Dairy Products', description: 'Cheeses', count: 10 },
        { name: 'Grains/Cereals', description: 'Breads, crackers, pasta, and cereal', count: 7 },
        { name: 'Meat/Poultry', description: 'Prepared meats', count: 6 },
        { name: 'Produce', description: 'Dried fruit and bean curd', count: 5 },
        { name: 'Seafood', description: 'Seaweed and fish', count: 12 },
      ],
      menuItems: ['Users']
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    selectItem(item) {
      this.selected = item;
    }
  },
  computed:{
    
  }
};
</script>

<style scoped>
.container1 {
  display: block;
  width: 100%;
}

.menu-toggle {
  position: absolute;
  top: 110px;
  left: 20px;
  cursor: pointer;
}

.burger-icon div {
  width: 30px;
  height: 4px;
  margin: 5px 0;
  background-color: #333;
  transition: 0.3s;
}

.close-icon {
  font-size: 35px;
  font-weight: bold;
  color: #ffffff;
  z-index: 100;
  position: absolute;
  top: 95px;
  right: 20px;  
  cursor: pointer;
}

.sidebar {
  width: 250px;
  background-color: #000000;
  color: white;
  padding: 15px;
  padding-right: 50px;
  padding-top: 75px;
  position: fixed;
  left: -250px; /* Початкове положення (за межами екрану) */
  top: 0;
  height: 100%;
  transition: left 0.3s; /* Анімація для плавного виїзду */
}

.sidebar-open {
  left: 0; /* Меню відкривається (їде вправо) */
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid white;
  border-radius: 15px;
  cursor: pointer;
}
.sidebar ul li:hover {
  background-color: white;
  color: black;
  border: 1px solid black;
}
.active{
  background-color: white;
  color: black;
  border: 1px solid black;
  font-weight: bold;
}

.content {
  margin-left: 0;
  padding: 20px 45px 20px 75px;
  transition: margin-left 0.3s;
}

.sidebar-open + .content {
  margin-left: 250px; /* Зміщення контенту, коли меню відкрите */
}
.sidebar-head{
  margin-top: 15px;
  margin-bottom: 25px;
  cursor: pointer;
}
.contant-name{
  font-size: 35px;
  margin-bottom: 20px;
}
</style>
