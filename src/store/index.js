import Axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import Router from '../router';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

let baseURL = "https://localhost:44325/api/";

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
    validOldPassword: false,
    successErrorMessage: "Save Successful",
    success: false,
    trigger: false
  },  
  actions: {
    async addIngredients({dispatch, state}, ingredients) {
      try {
        await Axios.post(`${baseURL}Ingredients`, ingredients, {headers: {Authorization: `Bearer ${state.token}`}});
        return true;
      } catch (error) {
        if (error.response.status === 401) {
          console.log("Invalid token. Refreshing...");
          await dispatch('refreshToken', {param: ingredients, backTo: 'addIngredients'});
        } else {
          console.log(error);
          dispatch('displaySuccessErrorMessage', {message: 'Failed to Add Ingredients', success: false});
          return false;
        }
      }
    },
    async addRecipe({commit, state, dispatch}, recipe){
      try {
        let result = await Axios.post(`${baseURL}Recipes`, recipe, {headers: {Authorization: `Bearer ${state.token}`}});
        commit('ADD_RECIPE', result.data)
        commit('ADD_RECIPE_TO_LIST', result.data)
        commit("SET_RECIPE_LIST", state.recipeList);
        commit('SET_SELECTED_RECIPE', result.data);
        return true;
      } catch (error) {
        if (error.response.status === 401) {
          console.log("Invalid token. Refreshing...");
          await dispatch('refreshToken', {param: recipe, backTo: 'addRecipe'});
        } else {
          console.log(error);
          dispatch('displaySuccessErrorMessage', {message: 'Recipe Save Failed', success: false});
          return false;
        }
      }
    },
    async changePassword({dispatch, state}, password) {
      let user = {userId: state.user.userId, password: password}
      try {
        await Axios.put(`${baseURL}Login/ChangePassword/${state.user.userId}`, user, {headers: {Authorization: `Bearer ${state.token}`}});
        return true;
      } catch(error) {
        if (error.response.status === 401) {
          console.log("Invalid token. Refreshing...");
          await dispatch('refreshToken', { param: password, backTo: 'changePassword'});
        } else {
          console.log(error);
          dispatch('displaySuccessErrorMessage', {message: 'Password Change Failed', success: false});
          return false;
        }
      }
    },
    async deleteAccount({dispatch, commit, state}) {
      try {
        await Axios.delete(`${baseURL}Login`, {headers: {Authorization: `Bearer ${state.token}`}, params: {id: state.user.userId}}, );
        commit('SET_LOGGED_OUT');
        return true;
      } catch (error) {
        if (error.response.status === 401) {
          console.log("Invalid token. Refreshing...");
          await dispatch('refreshToken', {param: "", backTo: 'deleteAccount'});
        } else {
          console.log(error);
          dispatch('displaySuccessErrorMessage', {message: 'Failed To Delete Account', success: false});
          return false;
        }
      }
    },
    async deleteIngredients({dispatch, state}, ingredientIds) {
      try {
        await Axios.delete(`${baseURL}Ingredients`, ingredientIds, {headers: {Authorization: `Bearer ${state.token}`}});
        return true;
      } catch (error) {
        if (error.response.status === 401) {
          console.log("Invalid token. Refreshing...");
          await dispatch('refreshToken', {param: ingredientIds, backTo: 'deleteIngredients'});
        } else {
          console.log(error);
          dispatch('displaySuccessErrorMessage', {message: 'Failed To Delete Ingredients', success: false});
          return false;
        }
      }
    },
    async deleteRecipe({commit, dispatch, state}, id) {
      try {
        await Axios.delete(`${baseURL}Recipes`,{headers: {Authorization: `Bearer ${state.token}`}, params: {id: id}});
        commit('REMOVE_RECIPE', id);
        commit('SET_RECIPE_LIST', state.recipeList);
        return true;
      } catch (error) {
        if (error.response.status === 401) {
          console.log("Invalid token. Refreshing...");
          await dispatch('refreshToken', {param: id, backTo: 'deleteRecipe'});
        } else {
          console.log(error);
          dispatch('displaySuccessErrorMessage', {message: 'Failed To Delete Recipe', success: false});
          return false;
        }
      }
    },
    displaySuccessErrorMessage({commit}, params){
      commit('SET_SUCCESS_ERROR_MESSAGE', params.message);
      commit('SET_SUCCESS', params.success);
      commit('TOGGLE_TRIGGER')
    },
    async getRecipeById({commit, state, dispatch}, id) {
      let recipe = state.fullRecipes.find(x => x.recipeId == id);
      if (recipe == null){
        try {
          let result = await Axios.get(`${baseURL}Recipes/${id}`, {headers: {Authorization: `Bearer ${state.token}`}})
          commit('ADD_RECIPE_TO_LIST', result.data);
          commit('SET_SELECTED_RECIPE', result.data);
          return true;
        } catch(error){
          if (error.response.status === 401) {
            console.log("Invalid token. Refreshing...");
            await dispatch('refreshToken', { param: id, backTo: 'getRecipeById'});
          } else {
            console.log(error);
            dispatch('displaySuccessErrorMessage', {message: 'Recipe Retrieval Failed', success: false})
            return false;
          }
        }
      } else {
        commit('SET_SELECTED_RECIPE', recipe);
      }
    },
    async getRecipeList({commit, state}) {
      try {
        let result = await Axios.get(`${baseURL}Recipes?id=${state.user.userId}`, {headers: {Authorization: `Bearer ${state.token}`}});
        commit('SET_RECIPE_LIST', result.data);
      } catch (error) {
        console.log(error);
      }
    },
    async login({commit, dispatch}, credentials) {
      try {
        let result = await Axios.get(`${baseURL}Login`, {params: {username: credentials.username, password: credentials.password}})
        if (result.data == "unauthorized")
          throw("The username or password is incorrect")
        commit('SET_TOKEN', result.data.token);
        commit('SET_USER', result.data.user);
        commit('SET_LOGGED_IN', true);
      } catch (error) {
        console.log(error);
        dispatch('displaySuccessErrorMessage', {message: 'Login Failed. Please Try Again', success: false})
      }
    },
    async postNewUser({commit, dispatch}, user) {
      try {
        let result = await Axios.post(`${baseURL}Login`, user);
        commit('SET_TOKEN', result.data.token);
        commit('SET_USER', result.data.user);
        commit('SET_LOGGED_IN', true);
      } catch(error) {
        console.log(error);
        dispatch('displaySuccessErrorMessage', {message: 'Failed To Create Account. Please Try Again', success: false})
      }
    },
    async refreshToken({commit, state, dispatch}, param){
      try {
        let result = await Axios.get(`${baseURL}Login/RefreshToken`, {params: {token: state.token}});
        commit('SET_TOKEN', result.data.token)
        if (param.param != "") {
          await dispatch(param.backTo, param.param);
        } else {
          await dispatch(param.backTo);
        }
      }catch(error) {
        console.log(error);
        commit("SET_LOGGED_OUT");
        alert("Something Went Wrong! Please Re-Login and Try Again!");
        Router.replace("/");
      }
    },
    async updateIngredients({dispatch, state}, ingredients) {
      try {
        await Axios.put(`${baseURL}Ingredients`, ingredients, {headers: {Authorization: `Bearer ${state.token}`}});
        return true;
      } catch (error) {
        if (error.response.status === 401) {
          console.log("Invalid token. Refreshing...");
          await dispatch('refreshToken', {param: ingredients, backTo: 'updateIngredients'});
        } else {
          console.log(error);
          dispatch('displaySuccessErrorMessage', {message: 'Failed To Update Ingredients', success: false})
          return false;
        }
      }
    },
    async updateRecipe({commit, dispatch, state}, recipe) {
      try {
        await Axios.put(`${baseURL}Recipes`, recipe, {headers: {Authorization: `Bearer ${state.token}`}});
        commit('SET_RECIPE', recipe);
        commit('SET_RECIPE_LIST', state.recipeList);
        commit('SET_SELECTED_RECIPE', recipe);
        return true;
      } catch (error) {
        if (error.response.status === 401) {
          console.log("Invalid token. Refreshing...");
          await dispatch('refreshToken', { param: recipe, backTo: 'updateRecipe'});
        } else {
          console.log(error);
          dispatch('displaySuccessErrorMessage', {message: 'Failed To Update Recipe', success: false})
          return false;
        }
      }
    },
    async updateUser({commit, dispatch, state}, params) {
      let oldEmail = state.user.emailAddress;
      let oldUsername = state.user.username;

      try {
        if (params.save == "email") {
          commit('SET_USER_EMAIL', params.email);
        } else {
          commit('SET_USER_USERNAME', params.username);
        }
        await Axios.put(`${baseURL}Login/${state.user.userId}`, state.user, {headers: {Authorization: `Bearer ${state.token}`}});
        return true;
      } catch(error) {
        if (error.response.status === 401) {
          console.log("Invalid token. Refreshing...");
          await dispatch('refreshToken', { param: params, backTo: 'updateUser'});
        } else {
          if (params.save == "email") {
            commit('SET_USER_EMAIL', oldEmail);
          } else {
            commit('SET_USER_USERNAME', oldUsername);
          }
          console.log(error);
          dispatch('displaySuccessErrorMessage', {message: 'Failed To Update Account Info', success: false})
          return false;
        }
      }
    },
    async validateEmailAddress({commit, dispatch}, emailAddress) {
      try{
        let result = await Axios.get(`${baseURL}Login/ValidateEmail`, { params: { emailAddress: emailAddress } })
        commit('SET_EMAIL_AVAILABILITY', result.data);
      } catch(error) {
        console.log(error);
        dispatch('displaySuccessErrorMessage', {message: 'Failed To Validate Email. Please Refresh and Try Again', success: false})
      }
    },
    async validateUsername({commit, dispatch}, username) {
      try{
        let result = await Axios.get(`${baseURL}Login/ValidateUsername`, { params: { username: username } })
        commit('SET_USERNAME_AVAILABILITY', result.data);
      } catch(error) {
        console.log(error);
        dispatch('displaySuccessErrorMessage', {message: 'Failed To Validate Username. Please Refresh and Try Again', success: false})
      }
    },
    async validateOldPassword({commit, state, dispatch}, oldPassword) {
      try {
        let result = await Axios.get(`${baseURL}Login/ValidatePassword`, {headers: {Authorization: `Bearer ${state.token}`}, params: {username: state.user.username, password: oldPassword}})
        commit('SET_OLD_PASSWORD_VALID', result.data);
      } catch (error) {
        if (error.response.status === 401) {
          console.log("Invalid token. Refreshing...");
          await dispatch('refreshToken', {param: oldPassword, backTo: 'validateOldPassword'});
        } else {
          console.log(error);
          dispatch('displaySuccessErrorMessage', {message: 'Could Not Validate Old Password. Please Refresh and Try Again', success: false})
        }
      }
    }
  },
  mutations: {
    ADD_RECIPE(state, newRecipe) {
      if (state.recipeList.length) {
        state.recipeList.push(newRecipe);
      } else {
        state.recipeList = [newRecipe];
      }
    },
    ADD_RECIPE_TO_LIST(state, recipe) {
      if (state.fullRecipes.length) {
        state.fullRecipes.push(recipe);
      } else {
        state.fullRecipes = [recipe];
      }
    },
    REMOVE_RECIPE(state, id) {
      for (let i in state.recipeList) {
        if (state.recipeList[i].recipeId == id) {
          state.recipeList.splice(i, 1);
          break;
        }
      }
      for (let i in state.fullRecipes) {
        if (state.fullRecipes[i].recipeId == id) {
          state.fullRecipes.splice(i, 1);
          break;
        }
      }
    },
    SET_USERNAME_AVAILABILITY(state, usernameAvailable){
      state.usernameAvailable = usernameAvailable;
    },
    SET_EMAIL_AVAILABILITY(state, emailAvailable){
      state.emailAvailable = emailAvailable;
    },
    SET_RECIPE(state, recipe) {
      for (let i in state.recipeList) {
        if (state.recipeList[i].recipeId == recipe.recipeId)
        {
          state.recipeList[i] = recipe;
          break;
        }
      }

      for (let i in state.fullRecipes) {
        if (state.fullRecipes[i].recipeId == recipe.recipeId)
        {
          state.fullRecipes[i] = recipe;
          break;
        }
      }
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
    SET_SUCCESS(state, success) {
      state.success = success;
    },
    SET_SUCCESS_ERROR_MESSAGE(state, message) {
      state.successErrorMessage = message;
    },
    SET_OLD_PASSWORD_VALID(state, valid) {
      state.validOldPassword = valid;
    },
    TOGGLE_TRIGGER(state) {
      state.trigger = !state.trigger;
    }
  }
})
