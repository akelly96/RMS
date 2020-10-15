import Axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usernameAvailable: false,
  },  
  actions: {
    async validateUsername({commit}, username) {
      try{
        let result = await Axios.get("Users/ValidateUsername", { params: { username: username } })
        commit('SET_USERNAME_AVAILABLE', result.data);
      } catch(error) {
        console.log(error);
      }
    }
  },
  mutations: {
    SET_USERNAME_AVAILABLE(state, usernameAvailable){
      state.usernameAvailable = usernameAvailable;
    }
  }

})
