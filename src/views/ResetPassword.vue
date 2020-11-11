<template>
  <div v-if="tokenValidated">
    <div class="mainBox">
      <div id="confirmationBox" v-if="passwordReset">
            <p class="confirmation" v-if="!expiredToken">Password Update Successful! You can now log into Recipe Management System with your new password.</p>
            <p class="confirmation" v-if="expiredToken">Token has expired! To request a new token <router-link to='/ForgotPassword'>click here.</router-link></p>
            <div class="button" @click="goToLoginPage()">
                <p class="buttonText">Back To Login</p>
            </div>
        </div>
        <div id="headerBox" v-if="!passwordReset">
            <p id="headerText">Reset Password</p>
        </div>
        <form class="subBox" v-if="!passwordReset">
           <div class="inputField">
            <p class="inputLabel">Password</p>
            <input type="password" autocomplete="new-password" maxlength="70" class="validInput"  name="password" v-model="password" @blur="validatePassword"/>
            <div class="inputError" id="passwordError">Password must contain at least 6 characters: one uppercase letter, one lowercase letter, one digit, and one special character</div>
            <div id="passwordSpec">Use a minimum of 6 characters (case sensitive) with at least one uppercase letter, one lowercase letter, one number, and one special character</div>
          </div>
          <div class="inputField">
            <p class="inputLabel">Confirm Password</p>
            <input type="password" autocomplete="new-password" maxlength="70" class="validInput" name="confirmPassword" v-model="confirmedPassword" @blur="validateConfirmPassword"/>
            <div class="inputError" id="passwordMatchError">Passwords do not match</div>
          </div>
            <div class="button" @click="resetPassword()">
                <p class="buttonText">Reset Password</p>
            </div>
        </form>
    </div>
    <b-spinner variant="primary" class="loading" id="resetSpinner" style="display:none"></b-spinner>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'ResetPassword',
  data: function() {
    return {
        password: "",
        confirmedPassword: "",
        token: null,
        validPassword: false,
        passwordsMatch: false,
        passwordReset: false,
        expiredToken: false,
        tokenValidated: false
    }
  },
  methods: {
    async resetPassword() {
      let spinner = document.getElementById("resetSpinner");
      if (this.validPassword)
      {
        this.validatePasswordMatch();
        if (this.passwordsMatch)
        {
          try {
              spinner.style.display = "inline-block";
              await Axios.put(`ResetPassword?token=${this.token}&password=${this.password}`, {}, {headers: {Authorization: `Bearer ${this.token}`}});
              spinner.style.display = "none"
              this.passwordReset = true;
          } catch(error) {
              console.log(error);
          }
        }
      }
    },
     validatePassword() {
      let element = document.getElementsByName("password")[0];
      let inputError = document.getElementById("passwordError")
      if (this.password === "") {
        element.classList.add("invalidInput");
        element.placeholder = " Required Field";
        this.validPassword = false;
      } else if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?'._+~`"!@$%^&*-]).{8,}$/.test(this.password)) {
        inputError.style.display = "none";
        element.classList.remove("invalidInput");
        this.validPassword = true;
      } else {
        inputError.style.display = "block";
        element.classList.add("invalidInput");
        this.validPassword = false;
      }
    },
    validateConfirmPassword() {
      let element = document.getElementsByName("confirmPassword")[0];
      if (this.confirmedPassword === "") {
        element.classList.add("invalidInput");
        element.placeholder = " Required Field";
      } else {
        element.classList.remove("invalidInput");
      }
    },
    validatePasswordMatch() {
      if (this.confirmedPassword != "") {
        let element = document.getElementsByName("confirmPassword")[0];
        let matchError = document.getElementById("passwordMatchError");
        if (this.password === this.confirmedPassword)
        {
          element.classList.remove("invalidInput");
          this.passwordsMatch = true;
          matchError.style.display = "none";
        } else {
          this.passwordsMatch = false;
          matchError.style.display = "block";
          element.classList.add("invalidInput");
        }
      }
    },
    goToLoginPage(){
      this.$router.replace("/");
    }
  },
  async beforeMount() {
    if(this.$route.query)
    {
        this.token = this.$route.query.token;
    }
    if (this.token != null) {
        try {
            let result = await Axios.get("ResetPassword/validateToken", { params: { token : this.token }, headers: { Authorization: `Bearer ${this.token}` }});
            if (!result.data)
            {
              this.passwordReset = true;
              this.expiredToken = true;
            }
            this.tokenValidated = true;
        } catch(error) {
            console.log(error);
        }
    } else {
        this.$router.push("/");
    }
  }
}
</script>