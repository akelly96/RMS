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
    recipeList: [],
    alphabeticalRecipeList: [],
    reverseAlphabeticalRecipeList: [],
    fullRecipes: [],
    selectedRecipe: {},
    validOldPassword: false
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
    async validateOldPassword({commit, state, dispatch}, oldPassword) {
      try {
        let result = await Axios.get("Login/ValidatePassword", {headers: {Authorization: `Bearer ${state.token}`}, params: {username: state.user.username, password: oldPassword}})
        commit('SET_OLD_PASSWORD_VALID', result.data);
      } catch (error) {
        console.log(error);
        await dispatch('refreshToken', {param: oldPassword, backTo: 'validateOldPassword'});
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
    },
    async getRecipeById({commit, state, dispatch}, id) {
      let recipe = state.fullRecipes.find(x => x.recipeId == id);
      if (recipe == null){
        try {
          let result = await Axios.get(`Recipes/${id}`, {headers: {Authorization: `Bearer ${state.token}`}})
          commit('ADD_RECIPE_TO_LIST', result.data);
          commit('SET_SELECTED_RECIPE', result.data);
        } catch(error){
          if (error.response.status === 401) {
            await dispatch('refreshToken', { param: id, backTo: 'getRecipeById'});
          }
        }
      } else {
        commit('SET_SELECTED_RECIPE', recipe);
      }
    },
    async updateUser({commit, dispatch, state}, params) {
      if (params.save == "email") {
        commit('SET_USER_EMAIL', params.email);
      } else {
        commit('SET_USER_USERNAME', params.username);
      }

      try {
        await Axios.put(`Login/${state.user.userId}`, state.user, {headers: {Authorization: `Bearer ${state.token}`}});
      } catch(error) {
        if (error.response.status === 401) {
          await dispatch('refreshToken', { param: params, backTo: 'updateUser'});
        }
      }
    },
    async changePassword({dispatch, state}, password) {
      let user = {userId: state.user.userId, password: password}
      try {
        await Axios.put(`Login/ChangePassword/${state.user.userId}`, user, {headers: {Authorization: `Bearer ${state.token}`}});
      } catch(error) {
        if (error.response.status === 401) {
          await dispatch('refreshToken', { param: password, backTo: 'changePassword'});
        }
      }
    },
    async refreshToken({commit, state, dispatch}, param){
      try {
        let result = await Axios.get("Login/RefreshToken", {params: {token: state.token}});
        commit('SET_TOKEN', result.data.token)
        if (param.backTo == "getRecipeById") {
          await dispatch('getRecipeById', param.param);
        } else if (param.backTo == "validateOldPassword") {
          await dispatch('validateOldPassword', param.param);
        } else if (param.backTo == 'updateUser') {
          await dispatch('updateUser', param.param);
        } else if (param.backTo == 'changePassword') {
          await dispatch('changePassword', param.param);
        }
      }catch(error) {
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
    SET_USER_EMAIL(state, email) {
      state.user.emailAddress = email;
    },
    SET_USER_USERNAME(state, username) {
      state.user.username = username;
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
      state.selectedRecipe = {};
      state.fullRecipes = [];
    },
    SET_SELECTED_RECIPE(state, recipe){
      state.selectedRecipe = recipe;
    },
    SET_OLD_PASSWORD_VALID(state, valid) {
      console.log(state.user);
      state.validOldPassword = valid;
    },
    ADD_RECIPE_TO_LIST(state, recipe) {
      state.fullRecipes.push(recipe);
    }
  }
})
