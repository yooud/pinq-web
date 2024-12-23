import { createStore } from 'vuex'
import router from '../router/index.js'; 

export default createStore({
  state: {
    user:[],
    load:false,
    theme: false,
    adminInfo:[],
    adminInfoPagination:[],
    adminPagination:{
      skip:0,
      count:3,
      page:1
    }
  },
  getters: {
    getUser(state){
      return state.user
    },
    getLoad(state){
      return state.load
    },
    getTheme(state){
      return state.theme
    },
    getAdminInfo(state){
      return state.adminInfo
    },
    getAdminPagination(state){
      return state.adminPagination
    }
  },
  mutations: {
    setUser(state,payload){
      state.user = payload
    },
    logout(state,payload){
      state.user = payload
    },
    setLoad(state,payload){
      state.load = payload
    },
    setTheme(state){
      state.theme = !state.theme
    },
    setAdminInfo(state,payload){
      state.adminInfo = payload
    },
    setAdminPagination(state,payload){
      state.adminPagination = payload
    }
  },
  actions: {
    async login({ commit }, payload) {
      commit('setLoad',true)
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: payload.username,
          password: payload.password,
        }),
      });
      let res = await response.json();
      if(res.access_token){
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('username', res.username);
        router.push('/');
      }
      commit('setUser',res)
      commit('setLoad',false)
  },
  async register({ commit },payload) {
    try {
      commit('setLoad',true)
      const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: payload.username,
          password: payload.password,
        }),
      });
      let res = await response.json();
      console.log(res)
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
    commit('setLoad',false)
  },
  async logout({ commit }) {
    commit('logout',[])
  },
  async googleLogin({ commit },payload) {
    commit('setUser',payload)
  },
  setTheme({commit}){
    commit('setTheme')
  },
  async getAdminInfo({ commit }){
      commit('setLoad',true)
      const token = localStorage.getItem('token1');
      let response = await fetch(`https://api.pinq.yooud.org/admin/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      let res = await response.json();
      console.log(res)
      res.data.forEach((el) => {
        const date = new Date(el.created_at * 1000);
        el.created_at = date.toDateString();
        el.username = el.profile.username;
        el.profile_image = el.profile.profile_picture_url
        delete el.profile
      });
      commit('setAdminInfo', res);
      commit('setLoad',false)
    },
    async modifyRole({ commit },payload){
      const token = localStorage.getItem('token1');
      commit('setLoad',true)
      await fetch(`https://api.pinq.yooud.org/admin/user/${payload.id}`, {
        method: "PATCH", // Метод запиту
        headers: {
          "Content-Type": "application/json", // Формат даних
          "Authorization": `Bearer ${token}` // Додаємо токен авторизації
        },
        body: JSON.stringify({role:payload.role}) // Дані які ми відправляємо на сервер
      })

      commit('setLoad',false)
    },
    setAdminPagination({commit},payload){
      commit('setAdminPagination',payload)
    }
  },
  modules: {
  }
})
