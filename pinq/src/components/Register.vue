<template>
    <div class="login">
      <PreLoader :loading = "load"></PreLoader>
      <div class="container">
        <div class="login-wrapper">
          <h2 class="login-head">Register</h2>
          <input
            type="text"
            class="login-input"
            v-model="username"
            placeholder="Username"
          />
          <input
            :type="showPassword ? 'text' : 'password'" 
            class="login-input"
            v-model="password"
            placeholder="Password"
          />
          <div class="password-block">
            <input
              :type="showPassword ? 'text' : 'password'" 
              class="login-input"
              v-model="password1"
              placeholder="Password"
            />
            <label class="password-check">
              <input type="checkbox" v-model="showPassword" />
              Показати пароль
            </label>
          </div>
          <div class="login-btn">
            <button class="login-btn-button" @click="tryRegister">Register</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import PreLoader from "./PreLoader.vue";
  export default {
    name: "RegisterC",
    components: {
      PreLoader
    },
    data() {
      return {
        username: "",
        password: "",
        password1: "",
        showPassword: false
      };
    },
    methods: {
      async tryRegister(){
        this.$store.dispatch('register',{
        username:this.username,
        password:this.password
      }) 
      }
    },
    computed:{
    load(){
      return this.$store.getters.getLoad;
    }
  }
  };
  </script>
  