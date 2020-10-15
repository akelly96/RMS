<template>
  <div>
    <div id="mainBox">
      <div id="headerBox">
        <p id="headerText">Create Account</p>
      </div>
      <form id="createAccount">
          <div class="inputField" style="margin-top:10px;">
            <p class="inputLabel">First Name</p>
            <input type="text" maxlength="45" class="validInput" name="fname" v-model="user.FirstName" @blur="validateFirstName()"/>
          </div>
          <div class="inputField">
            <p class="inputLabel">Last Name</p>
            <input type="text" maxlength="45" class="validInput" name="lname" v-model="user.LastName" @blur="validateLastName()"/>
          </div>
          <div class="inputField">
            <p class="inputLabel">Email Address</p>
            <input type="text" class="validInput" name="email" maxlength="65" v-model="user.EmailAddress" @blur="validateEmailAddress()"/>
            <div class="inputError" id="emailError">* Invalid Email Address</div>
          </div>
          <div class="inputField">
            <p class="inputLabel">Username</p>
            <input type="text" class="validInput" name="username" maxlength="30" v-model="user.Username" @blur="validateUsername()"/>
            <div class="inputError" id="usernameInputError">* Usernames can only use letters, numbers, underscores, and periods.</div>
            <div class="inputError" id="usernameTakenError">* This username isn't available. Please try another.</div>
          </div>
          <div class="inputField">
            <p class="inputLabel">Password</p>
            <input type="password" autocomplete="new-password" maxlength="70" class="validInput"  name="password" v-model="user.Password" @blur="validatePassword()"/>
            <div class="inputError" id="passwordError">* Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character</div>
          </div>
          <div class="inputField">
            <p class="inputLabel">Confirm Password</p>
            <input type="password" autocomplete="new-password" maxlength="70" class="validInput" name="confirmPassword" v-model="confirmedPassword" @blur="validateConfirmPassword()"/>
            <div class="inputError" id="passwordMatchError">* Passwords do not match</div>
          </div>
        <div :class=isDisabled @click="validateCreationInfo()">
          <p class="buttonText">Sign Up</p>
        </div>
        <router-link id="signInCancelButton" to="/">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
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
      user: { 
        UserID: -1,
        FirstName: "",
        LastName: "",
        Username: "",
        Password: "",
        EmailAddress: ""
      },
      validFirstName: false,
      validLastName: false,
      validEmailAddress: false,
      validUsername: false,
      validPassword: false,
      passwordsMatch: false,
      clickedCreate: false,
      firstClick: true
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
      'usernameAvailable'
    ])
  },
  methods: {
    ...mapActions([
      'validateUsername'
    ]),
    async validateCreationInfo() {
      if (this.isDisabled == "button"){
        this.clickedCreate = true;

        if (this.firstClick) {
          this.validateFirstName();
          this.validateLastName();
          this.validateEmailAddress();
          this.validateUsername();
          this.validatePassword();
          this.validateConfirmPassword();
        }

        if (this.validFirstName && this.validLastName && this.validUsername &&
            this.validPassword && this.validEmailAddress && this.passwordsMatch && 
            this.usernameAvailable) {
              await this.postNewUser()
              this.confirmedPassword = "";
              this.user.FirstName = "";
              this.user.LastName = "";
              this.user.EmailAddress = "";
              this.user.Username = "";
              this.user.Password = "";
              this.$router.push("/");
        }
        this.firstClick = false;
      }
    },
    validateFirstName() {
      if (this.clickedCreate) {
        let element = document.getElementsByName("fname")[0];
        if (this.user.FirstName === "") {
          this.validFirstName = false;
          element.classList.add("invalidInput");
          element.placeholder = " *Required Field";
        } else {
          this.validFirstName = true;
          element.classList.remove("invalidInput");
        }
      }
    },
    validateLastName() {
      if (this.clickedCreate) {
        let element = document.getElementsByName("lname")[0];
        if (this.user.LastName === "") {
          this.validLastName = false;
          element.classList.add("invalidInput");
          element.placeholder = " *Required Field";
        } else {
          this.validLastName = true;
          element.classList.remove("invalidInput");
        }
      }
    },
    validateEmailAddress() {
      if (this.clickedCreate) {
        let element = document.getElementsByName("email")[0];
        let emailError = document.getElementById("emailError");
        if (this.user.EmailAddress === "") {
          this.validEmailAddress = false;
          element.classList.add("invalidInput");
          element.placeholder = " *Required Field";
        } else if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.user.EmailAddress)){
          emailError.style.display = "none";
          this.validEmailAddress = true;
          element.classList.remove("invalidInput");
        } else {
          emailError.style.display = "block";
          this.validEmailAddress = false;
          element.classList.add("invalidInput");
        }
      }
    },
    async validateUsername() {
      let element = document.getElementsByName("username")[0];
      let inputError = document.getElementById("usernameInputError");
      let takenError = document.getElementById("usernameTakenError");

      if (this.user.Username === "" && this.clickedCreate) {
        this.validUsername = false;
        element.classList.add("invalidInput");
        element.placeholder = " *Required Field";
      } else if (this.user.Username != "" && /(^[a-zA-Z0-9._]{1,30})+$/.test(this.user.Username)) {
        inputError.style.display = "none";
        this.validUsername = true;
        if(this.originallyTypedUsername != this.user.Username){
          await this.$store.dispatch('validateUsername', this.user.Username)
          if (this.usernameAvailable){
            element.classList.remove("invalidInput");
            takenError.style.display = "none";
          } else {
            takenError.style.display = "block";
          }
          this.originallyTypedUsername = this.user.Username;
        }
      } else {
        inputError.style.display = "block";
        this.validUsername = false;
        element.classList.add("invalidInput");
      }
    },
    validatePassword() {
      if (this.clickedCreate) {
        let element = document.getElementsByName("password")[0];
        let inputError = document.getElementById("passwordError")
        if (this.user.Password === "") {
          element.classList.add("invalidInput");
          element.placeholder = " *Required Field";
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
      }
    },
    validateConfirmPassword() {
      if (this.clickedCreate) {
        let element = document.getElementsByName("confirmPassword")[0];
        if (this.confirmedPassword === "") {
          element.classList.add("invalidInput");
          element.placeholder = " *Required Field";
        } else {
          this.validatePasswordMatch();
        }
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
    },
    async postNewUser() {
      try {
        await Axios.post("Users", this.user);
      } catch(error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

</style>