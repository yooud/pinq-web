<template>
  <div class="wrapper">
    <Header v-if="!isAdmin"></Header>
    <main class="main" :style = "main">
      <router-view></router-view>
    </main>
    <Footer v-if="!isAdmin"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      isAdmin: false,
      main: '',
    };
  },
  created() {
    if (window.location.href.includes('admin')) {
      this.isAdmin = true;
      this.main = 'height: 100vh;display:block !important;'
    }
  },
};
</script>