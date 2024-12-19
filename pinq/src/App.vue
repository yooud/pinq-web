<template>
  <div class="wrapper">
    <Header></Header>
    <main class="main" :style = "main">
      <router-view></router-view>
    </main>
    <Footer></Footer>
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
};
</script>