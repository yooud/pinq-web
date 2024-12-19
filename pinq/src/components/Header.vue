<template>
  <header :class="{'header':true,'light':theme}">
    <div class="container">
      <div :class="{'header-wrapper':true,'light':theme}">
        <div class="header-logo">
          <router-link :to="{ name: 'main' }">
            <h1 :class="{'logo':true,'black-color':theme}">pinq</h1>
          </router-link> 
        </div>
        <button class="burger-button" @click="toggleMenu">
          <span :class="{ open: isOpen, 'light-burger':this.$store.getters.getTheme }"></span>
          <span :class="{ open: isOpen, 'light-burger':this.$store.getters.getTheme }"></span>
          <span :class="{ open: isOpen, 'light-burger':this.$store.getters.getTheme }"></span>
        </button>
        <div class="header-nav closed" >
          <ul class="header-nav-list">
            <li class="header-nav-el" v-if = "role == 'admin'">
                <router-link :class="{'header-nav-link':true,'black-color':theme}" :to="{ name: 'admin' }">
                  Admin 
              </router-link>  
            </li>
            <li class="header-nav-el" @click = "scrollToElement('faq')">
                <p :class="{'header-nav-link':true,'black-color':theme}">FAQ</p> 
            </li>
            <li class="header-nav-el" @click = "scrollToElement('about')">
                <p :class="{'header-nav-link':true,'black-color':theme}">About Us</p> 
            </li>
            <li class="header-nav-el" v-if="!username">
              <router-link :class="{'header-nav-link':true,'black-color':theme}" :to="{ name: 'login' }">
                Login/Register
              </router-link>  
            </li>
            <li class="header-nav-el">
              <div class="head-btn-wrapper">
                <button :class="{'head-btn1':true,'light-btn':theme}">Install</button>
              </div>
            </li>
            <li class="header-nav-el" v-if="username">
              <button  @click = "logout" :class="{'head-btn2':true,'light-btn':theme}">
                Logout from {{username}}
              </button>
            </li>
            <div class="theme-switcher header-nav-el">
              <span :class="{'theme':true,'theme1':theme}">Theme</span>
              <input 
                type="checkbox" 
                id="theme-toggle" 
                v-model="theme" 
                @change="toggleTheme" 
              />
              <label for="theme-toggle">
                <span class="toggle">
                  <span class="circle"></span>
                </span>
              </label>
            </div>
          </ul>
        </div>
      </div>
      <div class="burder-block openned" v-if = "isOpen">
        <div class="header-nav" v-if = "isOpen">
          <ul class="header-nav-list header-nav-list-burger" :class="{ 'light':this.$store.getters.getTheme }">
            <li class="header-nav-el" v-if = "role == 'admin'">
                <router-link :class="{'header-nav-link':true,'black-color':theme}" :to="{ name: 'admin' }">
                  Admin 
              </router-link>  
            </li>
            <li class="header-nav-el" @click = "close();scrollToElement('faq')">
                <p class="header-nav-link" :class="{'black-color':this.$store.getters.getTheme}">FAQ</p> 
            </li>
            <li class="header-nav-el" @click = "scrollToElement('about');close()">
                <p class="header-nav-link" :class="{'black-color':this.$store.getters.getTheme}">About Us</p> 
            </li>
            <li class="header-nav-el">
              <router-link class="header-nav-link" :class="{'black-color':this.$store.getters.getTheme}" :to="{ name: 'login' }" @click = "close">
                Login/Register
              </router-link>  
            </li>
            <li class="header-nav-el btn-install">
              <div class="head-btn-wrapper">
                <button class="head-btn1" :class="{'light-btn':this.$store.getters.getTheme}">Install</button>
              </div>
            </li>
            <li class="header-nav-el">
              <button v-if="username" @click = "logout" :class="{'head-btn2':true,'light-btn':theme}">
                Logout from {{username}}
              </button>
            </li>
            <div class="theme-switcher header-nav-el">
              <span :class="{'theme':true,'theme1':theme}">Theme</span>
              <input 
                type="checkbox" 
                id="theme-toggle" 
                v-model="theme" 
                @change="toggleTheme" 
              />
              <label for="theme-toggle">
                <span class="toggle">
                  <span class="circle"></span>
                </span>
              </label>
            </div>
          </ul>
        </div>
      </div>
    </div>
    <div class="block" v-if = "isOpen"></div>
  </header>
</template>

<style>
.head-btn-wrapper{
    display: flex;
    justify-content: center;
  }
  .head-btn1{
    padding: 10px 15px;
    border-radius: 15px;
    border: none;
    cursor: pointer;
    width: 100px;
  }
  .head-btn2{
    padding: 10px 15px;
    border-radius: 15px;
    border: none;
    cursor: pointer;
  }
  .head-btn1:hover {
    box-shadow: 0px 5px 10px rgba(211, 176, 22, 0.5);
    color: #967418;
    animation: shadow-pulse 1s infinite;
  }
.header {
  padding: 10px 0;
  flex-grow: 0;
  background-color: #000 ;
  color: #fff;
}
.logo{
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
  color: #e4b42f;
}
.header-nav-btn{
  padding: 5px 15px;
  border-radius: 15px;
  border: none;
  cursor: pointer;
}
.header-nav-btn:hover {
  box-shadow: 0px 5px 10px rgba(58, 6, 63, 0.2);
  color: #e4b42f;
  animation: shadow-pulse 1s infinite;
}

@keyframes shadow-pulse {
  0% {
    box-shadow: 0px 0px 8px rgba(218, 161, 40, 0.4);
  }
  50% {
    box-shadow: 0px 4px 16px rgba(218, 161, 40, 0.8);
  }
  100% {
    box-shadow: 0px 0px 8px rgba(218, 161, 40, 0.4);
  }
}

.burger-button {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  flex-direction: column;
  gap: 7px;
  padding: 10px;
}
.burger-button span {
  width: 30px;
  height: 3px;
  background-color: #ffffff;
  transition: transform 0.3s, opacity 0.3s;
}
.header{
  z-index: 10000;
}
.burger-button span.open:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}
.burger-button span.open:nth-child(2) {
  opacity: 0;
}
.burger-button span.open:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}
.header-nav-list-burger{
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: fixed;
  top: 43px;
  left: 0;
  width: 100%;
  padding: 20px 0;
  z-index: 101;
  background-color: #000
}
.btn-install{
  margin-top: 20px;
}
.block{
  display: none;
  z-index: 1001;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: .3;
}
@media (max-width: 1296px) {

}
@media (max-width: 768px) {
    .container {
      max-width: 100%;
      padding: 0px 15px;
    }
    .burger-button {
      display: flex;
    }
    .closed{
      display: none;
    }
    .openned{
      display: block
    }
    .block{
      display: block;
    }
    .header-wrapper{
      padding: 0px 15px;
      position: fixed;
      z-index: 9999;
      top: 0;
      left: 0;
      height: 75px;
      font-display: flex;
      justify-content: space-between;
      background-color: #000;
      width: 100%;
    }
}
@media (max-width: 480px) {

}
.theme-switcher {
  display: flex;
  align-items: center;
  gap: 20px;
}

label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.toggle {
  position: relative;
  width: 50px;
  height: 24px;
  background-color: #ccc;
  border-radius: 50px;
  transition: background-color 0.3s ease;
}

.toggle .circle {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
}
.burder-block{
  z-index: 9999;
}
.header-nav-list{
  z-index: 9999;
}
input[type="checkbox"] {
  display: none;
}

input[type="checkbox"]:checked + label .toggle {
  background-color: #000000;
}

input[type="checkbox"]:checked + label .circle {
  transform: translateX(26px);
}

.text {
  font-size: 16px;
  color: var(--text-color, #fff);
  margin-left: 10px;
}
</style>

<script>
export default {
  name: "HeaderC",
  data() {
    return {
      isOpen: false,
      theme: false,
    };
  },
  mounted() {
    this.theme = this.$store.getters.getTheme
  },
  methods: {
    toggleTheme() {
      this.$store.dispatch('setTheme')
    },
    close(){
      this.isOpen = false;
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      localStorage.removeItem('token1');
      this.$store.dispatch('logout')
      this.$router.push({name:'login'})
    },
    scrollToElement(el) {
        setTimeout(()=>{
          console.log("aaaa")
          const element = document.getElementById(el);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        },1)
        this.$router.push({name:'main'})
    },
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
  },
  computed: {
    username() {
      let a = this.$store.getters.getUser.email;
      if(localStorage.getItem('username')){
        return localStorage.getItem('username')
      }
      return a;
    },
    role() {
      let a = this.$store.getters.getUser.role;
      if(localStorage.getItem('role')){
        return localStorage.getItem('role')
      }
      return a;
    },
  }
};
</script>

