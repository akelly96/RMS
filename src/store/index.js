import Axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {
    usernameAvailable: false,
    user: {},
    token: null,
    emailAvailable: false,
    loggedIn: false,
    recipeList: {},
    alphabeticalRecipeList: {},
    reverseAlphabeticalRecipeList: {}
  },  
  actions: {
    async getRecipeList({commit, state}) {
      try {
        let result = await Axios.get(`Recipes?id=${state.user.userId}`, {headers: {Authorization: `Bearer ${state.token}`}});
        commit('SET_RECIPE_LIST', result.data);
      } catch (error) {
        console.log(error);
      }
    },
    async login({commit}, credentials) {
      try {
        let result = await Axios.get(`Login?username=${credentials.username}&password=${credentials.password}`)
        commit('SET_TOKEN', result.data.token);
        commit('SET_USER', result.data.user);
        commit('SET_LOGGED_IN', true);
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
    SET_RECIPE_LIST(state, recipeList) {
      state.recipeList = recipeList;
      state.alphabeticalRecipeList = recipeList.slice(0);
      state.alphabeticalRecipeList.sort((a, b) => a.recipeName.localeCompare(b.recipeName, navigator.languages[0] || navigator.language, {numeric: true, ignorePunctuation: true}));
      state.reverseAlphabeticalRecipeList = recipeList.slice(0);
      state.reverseAlphabeticalRecipeList.sort((a, b) => b.recipeName.localeCompare(a.recipeName, navigator.languages[0] || navigator.language, {numeric: true, ignorePunctuation: true}));
    },
    SET_USER(state, user){
      state.user = user;
    },
    SET_TOKEN(state, token){
      state.token = token;
    },
    SET_LOGGED_IN(state, loggedIn){
      state.loggedIn = loggedIn;
    },
    SET_LOGGED_OUT(state) {
      state.usernameAvailable = false;
      state.user = {};
      state.token = null;
      state.emailAvailable = false;
      state.loggedIn = false;
      state.recipeList = {};
      state.alphabeticalRecipeList = {};
      state.reverseAlphabeticalRecipeList = {};
    }
  }
})
