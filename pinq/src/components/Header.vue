<template>
  <header class="header">
    <div class="container">
      <div class="header-wrapper">
        <div class="header-logo">
          <router-link :to="{ name: 'main' }">
            <h1 class="logo">pinq</h1>
          </router-link> 
        </div>
        <button class="burger-button" @click="toggleMenu">
          <span :class="{ open: isOpen }"></span>
          <span :class="{ open: isOpen }"></span>
          <span :class="{ open: isOpen }"></span>
        </button>
        <div class="header-nav closed">
          <ul class="header-nav-list">
            <li class="header-nav-el">
              <router-link v-if="username" class="header-nav-link" :to="{ name: 'login' }">
                Profile
              </router-link>  
            </li>
            <li class="header-nav-el" @click = "scrollToElement('faq')">
                <p class="header-nav-link">FAQ</p> 
            </li>
            <li class="header-nav-el" @click = "scrollToElement('about')">
                <p class="header-nav-link">About Us</p> 
            </li>
            <li class="header-nav-el">
              <router-link class="header-nav-link" :to="{ name: 'login' }">
                Login/Register
              </router-link>  
            </li>
            <li class="header-nav-el">
              <div class="head-btn-wrapper">
                <button class="head-btn1">Install</button>
              </div>
            </li>
            <li class="header-nav-el">
              <button v-if="username" @click = "logout" class="header-nav-btn">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="burder-block openned" v-if = "isOpen">
        <div class="header-nav" v-if = "isOpen">
          <ul class="header-nav-list header-nav-list-burger">
            <li class="header-nav-el">
              <router-link v-if="username" class="header-nav-link" :to="{ name: 'login' }">
                Profile
              </router-link>  
            </li>
            <li class="header-nav-el" @click = "close();scrollToElement('faq')">
                <p class="header-nav-link">FAQ</p> 
            </li>
            <li class="header-nav-el" @click = "scrollToElement('about');close()">
                <p class="header-nav-link">About Us</p> 
            </li>
            <li class="header-nav-el">
              <router-link class="header-nav-link" :to="{ name: 'login' }" @click = "close">
                Login/Register
              </router-link>  
            </li>
            <li class="header-nav-el btn-install">
              <div class="head-btn-wrapper">
                <button class="head-btn1">Install</button>
              </div>
            </li>
            <li class="header-nav-el">
              <button v-if="username" @click = "logout;close" class="header-nav-btn">
                Logout
              </button>
            </li>
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
  top: 308px;
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
</style>

<script>
export default {
  name: "HeaderC",
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    close(){
      this.isOpen = false;
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
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
      let a = this.$store.getters.getUser.username;
      if(localStorage.getItem('username')){
        return localStorage.getItem('username')
      }
      return a;
    },
  }
};
</script>

