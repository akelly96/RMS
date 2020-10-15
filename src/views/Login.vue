<template>
  <div>
    <div id="mainBox">
      <div id="headerBox">
        <p id="headerText">Log Into Recipe Management System</p>
      </div>
      <form id="login">
        <div class="inputField" style="margin-top:10px;">
          <p class="inputLabel">Username</p>
          <input type="text" class="validInput" name="username" v-model="username" />
        </div>
        <div class="inputField">
          <p class="inputLabel">Password</p>
          <input type="password" class="validInput" autocomplete="" name="password" v-model="password"/>
        </div>
        <div :class=isDisabled @click="login()">
          <p class="buttonText">Log In</p>
        </div><br/>
        <router-link id="forgotPassword" to="/ForgotPassword">Forgot Password?</router-link>
        <hr/>
        <router-link id="createAccountButton" to="/SignUp">Create New Account</router-link>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: function() {
    return {
      username: "",
      password: "",

    }
  },
  computed: {
    isDisabled() {
      if (this.username == '' || this.password.length < 8){
        return "disabledButton";
      } else {
        return "button";
      }
    }
  },
  methods: {
    login() {
      if (this.isDisabled !== "disabledButton"){
          //Call GET: api/Users
          this.username = "";
          this.password = "";
      }
    } 
  }
}
</script>

<style scoped>

#createAccountButton {
  border-radius: 4px;
  border: 1px solid #586d89;
  background: #1d4b02;
  cursor:pointer;
  width: 200px;
  color: #ffffff;
  padding:10px;
  font-size:20px;
  text-decoration:none;
  margin:20px;
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
}

#login {
    padding-bottom:20px;
}
</style>