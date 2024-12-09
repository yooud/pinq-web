import { createStore } from 'vuex'
import router from '../router/index.js'; 

export default createStore({
  state: {
    user:[],
    load:false,
    theme: false,
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
  setTheme({commit}){
    commit('setTheme')
  }
  },
  modules: {
  }
})
