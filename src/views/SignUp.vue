<template>
  <div>
    <div class="mainBox">
      <div id="headerBox">
        <p id="headerText">Create Account</p>
      </div>
      <form class="subBox">
         <div class="inputField">
            <p class="inputLabel">Email Address</p>
            <input type="text" class="validInput" name="email" maxlength="65" v-model="user.EmailAddress" @blur="validateEmailAddress()"/>
            <div class="inputError" id="emailError">* Invalid Email Address</div>
            <div class="inputError" id="emailUnavailableError">This email is already linked to an account.</div>
          </div>
          <div class="inputField">
            <p class="inputLabel">Username</p>
            <input type="text" class="validInput" name="username" maxlength="30" v-model="user.Username" @blur="validateUsername()"/>
            <div class="inputError" id="usernameInputError">Usernames can only use letters, numbers, underscores, and periods.</div>
            <div class="inputError" id="usernameTakenError">This username isn't available. Please try another.</div>
          </div>
          <div class="inputField">
            <p class="inputLabel">Password</p>
            <input type="password" autocomplete="new-password" maxlength="70" class="validInput"  name="password" v-model="user.Password" @blur="validatePassword()"/>
            <div class="inputError" id="passwordError">Password must contain at least 6 characters: one uppercase letter, one lowercase letter, one digit, and one special character</div>
            <div id="passwordSpec">Use a minimum of 6 characters (case sensitive) with at least one uppercase letter, one lowercase letter, one number, and one special character</div>
          </div>
          <div class="inputField">
            <p class="inputLabel">Confirm Password</p>
            <input type="password" autocomplete="new-password" maxlength="70" class="validInput" name="confirmPassword" v-model="confirmedPassword" @blur="validateConfirmPassword()"/>
            <div class="inputError" id="passwordMatchError">Passwords do not match</div>
          </div>
        <div :class=isDisabled @click="validateCreationInfo()">
          <p class="buttonText">Sign Up</p>
        </div>
        <div class=button @click="cancel()">
          <p class="buttonText">Cancel</p>
        </div>
      </form>
    </div>
    <b-spinner variant="primary" class="loading" id="signUpSpinner" style="display:none"></b-spinner>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'SignUp',
  data: function() {
    return {
      confirmedPassword: "",
      validLoginPassword: false,
      validLoginUsername: false,
      originallyTypedUsername: "",
      originallyTypedEmail: "",
      user: { 
        UserID: -1,
        Username: "",
        Password: "",
        EmailAddress: ""
      },
      validEmailAddress: false,
      validUsername: false,
      validPassword: false,
      passwordsMatch: false
    }
  }, 
  computed: {
    isDisabled() {
      if (this.user.Username == "" || this.confirmedPassword.length == "" ||
          this.user.Password.length == "" || this.user.FirstName == "" ||
          this.user.LastName == "" || this.user.EmailAddress == "") {
        return "disabledButton";
      } else {
        return "button"
      }
    },
    ...mapState([
      'usernameAvailable',
      'emailAvailable'
    ])
  },
  methods: {
    ...mapActions([
      'validateUsername',
      'postNewUser',
      'validateEmail'
    ]),
    async validateCreationInfo() {
      if (this.isDisabled == "button"){
        this.validatePasswordMatch();
        if (this.validUsername && this.validPassword && this.validEmailAddress && this.passwordsMatch && 
            this.usernameAvailable) {
              let signUpSpinner = document.getElementById("signUpSpinner");
              signUpSpinner.style.display = "inline-block";
              await this.$store.dispatch('postNewUser', this.user);
              signUpSpinner.style.display = "none";
              this.clearForm();
              this.$router.push("/"); //User Logged in go to main screen
        }
      }
    },
    clearForm() {
      this.user.EmailAddress = "";
      this.user.Username = "";
      this.user.Password = "";
      this.confirmedPassword = "";
    },
    cancel() {
      this.clearForm();
      this.$router.push("/");
    },
    async validateEmailAddress() {
      let element = document.getElementsByName("email")[0];
      let emailError = document.getElementById("emailError");
      let emailUnavailableError = document.getElementById("emailUnavailableError");
      if (this.user.EmailAddress === "") {
        this.validEmailAddress = false;
        element.classList.add("invalidInput");
        element.placeholder = " Required Field";
      } else if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.user.EmailAddress)){
        emailError.style.display = "none";
        if(this.originallyTypedEmail != this.user.EmailAddress) {
          await this.$store.dispatch('validateEmailAddress', this.user.EmailAddress);
          if (this.emailAvailable){
            element.classList.remove("invalidInput");
            emailUnavailableError.style.display = "none";
            this.validEmailAddress = true;
          } else {
            element.classList.add("invalidInput");
            emailUnavailableError.style.display = "block";
            this.validEmailAddress = false;  
          }
          this.originallyTypedEmail = this.user.EmailAddress;
        }
      } else {
        emailError.style.display = "block";
        this.validEmailAddress = false;
        element.classList.add("invalidInput");
      }
    },
    async validateUsername() {
      let element = document.getElementsByName("username")[0];
      let inputError = document.getElementById("usernameInputError");
      let takenError = document.getElementById("usernameTakenError");

      if (this.user.Username === "") {
        this.validUsername = false;
        element.classList.add("invalidInput");
        element.placeholder = " Required Field";
      } else if (this.user.Username != "" && /(^[a-zA-Z0-9._]{1,30})+$/.test(this.user.Username)) {
        inputError.style.display = "none";
        if(this.originallyTypedUsername != this.user.Username){
          await this.$store.dispatch('validateUsername', this.user.Username);
          if (this.usernameAvailable){
            element.classList.remove("invalidInput");
            takenError.style.display = "none";
            this.validUsername = true;
          } else {
            takenError.style.display = "block";
            this.validUsername = false;
          }
          this.originallyTypedUsername = this.user.Username;
        }
      } else if (this.user.Username != "") {
        inputError.style.display = "block";
        this.validUsername = false;
        element.classList.add("invalidInput");
      }
    },
    validatePassword() {
      let element = document.getElementsByName("password")[0];
      let inputError = document.getElementById("passwordError")
      if (this.user.Password === "") {
        element.classList.add("invalidInput");
        element.placeholder = " Required Field";
        this.validPassword = false;
      } else if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?'._+~`"!@$%^&*-]).{8,}$/.test(this.user.Password)) {
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
        if (this.user.Password === this.confirmedPassword)
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
    }
  }
}
</script>