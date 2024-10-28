<template>
  <header class="header">
    <div class="container">
      <div class="header-wrapper">
        <div class="header-logo">
          <router-link :to="{ name: 'main' }">
            <img type="image" src="" alt="logo">
          </router-link> 
        </div>
        <div class="header-nav">
          <ul class="header-nav-list">
            <li class="header-nav-el">
              <router-link v-if="username" class="header-nav-link" :to="{ name: 'login' }">
                Profile
              </router-link>  
            </li>
            <li class="header-nav-el">
              <router-link class="header-nav-link" :to="{ name: 'login' }">
                Login/Register
              </router-link>  
            </li>
            <li class="header-nav-el">
              <button v-if="username" @click = "logout" class="header-nav-btn">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<style>
header {
  padding: 10px 0;
  flex-grow: 0;
  background-color: #3A2547 ;
  color: #fff;
}
.header-wrapper{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-nav-list{
  display: flex;
  align-items: center;
  list-style: none;
  gap: 25px;
}
.header-nav-el{
  cursor: pointer;
}
.header-nav-link{
  color: #fff;
  padding: 5px 10px;
}
.header-nav-link:hover{
  color: #7A688F;
}
.header-nav-btn{
  padding: 5px 15px;
  border-radius: 15px;
  border: none;
  cursor: pointer;
}
.header-nav-btn:hover {
  box-shadow: 0px 5px 10px rgba(58, 6, 63, 0.2);
  color: #fff;
  background-color: #7A688F;
  animation: shadow-pulse 1s infinite;
}

@keyframes shadow-pulse {
  0% {
    box-shadow: 0px 4px 8px rgba(58, 6, 63, 0.4);
  }
  50% {
    box-shadow: 0px 12px 16px rgba(58, 6, 63, 0.8);
  }
  100% {
    box-shadow: 0px 4px 8px rgba(58, 6, 63, 0.4);
  }
}
</style>

<script>
export default {
  name: "HeaderC",
  data() {
    return {
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.$store.dispatch('logout')
      this.$router.push({name:'login'})
    }
  },
  computed: {
    username() {
      let a = this.$store.getters.getUser.username;
      if(localStorage.getItem('username')){
        return localStorage.getItem('username')
      }
      return a;
    }
  }
};
</script>

