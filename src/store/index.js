import Axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usernameAvailable: false,
    user: {},
    token: null,
    emailAvailable: false
  },  
  actions: {
    async login({commit}, credentials) {
      try {
        let result = await Axios.get(`Login?username=${credentials.username}&password=${credentials.password}`)
        commit('SET_TOKEN', result.data.token);
        commit('SET_USER', result.data.user);
      } catch (error) {
        console.log(error);
      }
    },
    async validateUsername({commit}, username) {
      try{
        let result = await Axios.get("Login/ValidateUsername", { params: { username: username } })
        commit('SET_USERNAME_AVAILABILITY', result.data);
      } catch(error) {
        console.log(error);
      }
    },
    async validateEmailAddress({commit}, emailAddress) {
      try{
        let result = await Axios.get("Login/ValidateEmail", { params: { emailAddress: emailAddress } })
        commit('SET_EMAIL_AVAILABILITY', result.data);
      } catch(error) {
        console.log(error);
      }
    },
    async postNewUser({commit}, user) {
      try {
        let result = await Axios.post("Login", user);
        commit('SET_TOKEN', result.data.token);
        commit('SET_USER', result.data.user);
      } catch(error) {
        console.log(error);
      }
    }
  },
  mutations: {
    SET_USERNAME_AVAILABILITY(state, usernameAvailable){
      state.usernameAvailable = usernameAvailable;
    },
    SET_EMAIL_AVAILABILITY(state, emailAvailable){
      state.emailAvailable = emailAvailable;
    },
    SET_USER(state, user){
      state.user = user;
    },
    SET_TOKEN(state, token){
      state.token = token;
    }
  }

})
