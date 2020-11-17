<template>
  <div v-if="!loggedIn">
    <div class="mainBox">
      <div id="headerBox">
        <p id="headerText">Log Into Recipe Management System</p>
      </div>
      <form class="subBox" @keyup.enter="login()">
        <div class="inputField" style="margin-top:10px;">
          <p class="inputLabel">Username</p>
          <input type="text" class="validInput" name="username" v-model="username" />
        </div>
        <div class="inputField">
          <p class="inputLabel">Password</p>
          <input type="password" class="validInput" autocomplete="" name="password" v-model="password"/>
        </div>
        <div class="inputError" id="invalidCredentialsError">The username or password is incorret. Try again.</div>
        <div :class=isDisabled @click="login()">
          <p class="buttonText">Log In</p>
        </div><br/>
        <router-link id="forgotPassword" to="/ForgotPassword">Forgot Password?</router-link>
        <hr/>
        <router-link id="createAccountButton" to="/SignUp">Create New Account</router-link>
      </form>
      <b-spinner variant="primary" class="loading" id="loginSpinner" style="display:none"></b-spinner>
    </div>  
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data: function() {
    return {
      username: "",
      password: "",

    }
  },
  computed: {
    ...mapState ([
      'token',
      'loggedIn'
    ]),
    isDisabled() {
      if (this.username == '' || this.password.length < 8){
        return "disabledButton";
      } else {
        return "button";
      }
    }
  },
  methods: {
    ...mapActions([
      'login',
      'getRecipeList'
    ]),
    async login() {
      if (this.isDisabled !== "disabledButton"){
          let loginSpinner = document.getElementById("loginSpinner");
          loginSpinner.style.display = "inline-block";
          await this.$store.dispatch('login', {username: this.username, password: this.password});
          if (this.token)
          {
            this.username = "";
            this.password = "";
            await this.$store.dispatch('getRecipeList');
            loginSpinner.style.display = "none";
            this.$router.push("/home")
          } else {
            loginSpinner.style.display = "none";
            document.getElementById("invalidCredentialsError").style.display = "block";
          }
      }
    } 
  },
  beforeMount() {
    window.scroll(0, 0);
    if (this.loggedIn) {
      this.$router.push("/home");
    }
  }
}
</script>

<style scoped>

#createAccountButton {
  display:block;
  border-radius: 4px;
  border: 1px solid #276403;
  background: #1d4b02;
  cursor:pointer;
  width: 200px;
  color: #ffffff;
  padding:5px;
  font-size:20px;
  text-decoration:none;
  margin: 20px auto 10px auto;
}

#createAccountButton:hover {
    background: #307d03;
}

#createButtonText {
    color: #ffffff;
    margin:10px;
    font-size:20px;
}

#forgotPassword {
    color:#1877f2;
    font-size: 18px;
    text-decoration:none;
}
#forgotPassword:hover {
    text-decoration:underline;
}

hr {
    margin-bottom:20px;
    background-color: #ffffff;
}

#login {
    padding-bottom:20px;
}
</style>