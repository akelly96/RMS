<template>
  <div>
    <div class="mainBox" v-if="section == 'createAccount'">
      <div id="headerBox">
        <p id="headerText">Create Account</p>
      </div>
      <form class="subBox">
          <div class="inputField">
            <p class="inputLabel">Username</p>
            <input type="text" class="validInput" name="username" maxlength="30" v-model="userCredentials.username" @blur="validateUsername()"/>
            <div class="inputError usernameInputError">Usernames can only use letters, numbers, underscores, and periods.</div>
            <div class="inputError usernameTakenError">This username isn't available. Please try another.</div>
          </div>
         <div class="inputField">
            <p class="inputLabel">Email Address</p>
            <input type="text" class="validInput" name="email" maxlength="65" v-model="userCredentials.emailAddress" @blur="validateEmailAddress()"/>
            <div class="inputError emailError">* Invalid Email Address</div>
            <div class="inputError emailUnavailableError">This email is already linked to an account.</div>
          </div>
          <div class="inputField">
            <p class="inputLabel">Password</p>
            <input type="password" autocomplete="new-password" maxlength="70" class="validInput"  name="password" v-model="userCredentials.password" @blur="validatePassword()"/>
            <div class="inputError passwordError">Password must contain at least 6 characters: one uppercase letter, one lowercase letter, one digit, and one special character</div>
            <div id="passwordSpec">Use a minimum of 6 characters (case sensitive) with at least one uppercase letter, one lowercase letter, one number, and one special character</div>
          </div>
          <div class="inputField">
            <p class="inputLabel">Confirm Password</p>
            <input type="password" autocomplete="new-password" maxlength="70" class="validInput" name="confirmPassword" v-model="confirmedPassword" @blur="validateConfirmPassword()"/>
            <div class="inputError passwordMatchError">Passwords do not match</div>
          </div>
        <div :class=isDisabled @click="validateCreationInfo()">
          <p class="buttonText">Sign Up</p>
        </div>
        <div class=button @click="cancel()">
          <p class="buttonText">Cancel</p>
        </div>
      </form>
    </div>
    <div v-if="section == 'accountSettings'">
        <p id="settingsHeader">Account Settings</p>
        <div class="mainBox editMainBox">
            <div id="headerBox">
                <p id="headerText">Username</p>
            </div>
            <form class="subBox" v-on:submit.prevent>
                <div class="inputField edit">
                    <p class="inputLabel">Username</p>
                    <input disabled type="text" class="validInput" name="editUsername" maxlength="30" v-model="userCredentials.username" @keyup.enter="saveUsername"/>
                    <div class="inputError usernameInputError">Usernames can only use letters, numbers, underscores, and periods.</div>
                    <div class="inputError usernameTakenError">This username isn't available. Please try another.</div>
                </div>
                <div class="button editButton editUsernameButton" @click="enableUsernameEdit()">
                    <p class="buttonText">Edit Username</p>
                </div>
                <div style="display:none" :class="usernameSaveIsDisabled" id="saveUsernameButton" @click="saveUsername()">
                    <p class="buttonText">Save Username</p>
                </div>
                <div style="display:none" class="button editButton cancelUsernameButton" @click="cancelUsernameEdit()">
                    <p class="buttonText">Cancel</p>
                </div>
            </form>
        </div>
        <div class="mainBox editMainBox">
            <div id="headerBox">
                <p id="headerText">Email Address</p>
            </div>
            <form class="subBox" v-on:submit.prevent>
                <div class="inputField edit">
                    <p class="inputLabel">Email Address</p>
                    <input disabled type="text" class="validInput" name="editEmail" maxlength="65" v-model="userCredentials.emailAddress" @keyup.enter="saveEmail()"/>
                    <div class="inputError emailError">* Invalid Email Address</div>
                    <div class="inputError emailUnavailableError">This email is already linked to an account.</div>
                </div>
                <div class="button editButton editEmailButton" @click="enableEmailEdit()">
                    <p class="buttonText">Edit Email</p>
                </div>
                <div style="display:none" :class="emailSaveIsDisabled" id="saveEmailButton" @click="saveEmail()">
                    <p class="buttonText">Save Email</p>
                </div>
                <div style="display:none" class="button editButton cancelEmailButton" @click="cancelEmailEdit()">
                    <p class="buttonText">Cancel</p>
                </div>
            </form>
        </div>
        <div class="mainBox editMainBox" id="passwordMainBox">
            <div id="headerBox">
                <p id="headerText">Password</p>
            </div>
            <form class="subBox">
                <div class="inputField edit">
                    <p class="inputLabel">Password</p>
                    <input disabled type="password"  class="validInput" value="Invalid Password"/>
                </div>
                <div class="button editButton editPasswordButton" @click="enablePasswordEdit()">
                    <p class="buttonText">Edit Password</p>
                </div>
            </form>
        </div>
        <div class="mainBox editMainBox" id="passwordEditMainBox"> 
            <div id="headerBox">
                <p id="headerText">Password</p>
            </div>
            <form class="subBox">
                <div class="inputField">
                    <p class="inputLabel">Old Password</p>
                    <input type="password" autocomplete="new-password" maxlength="70" class="validInput"  name="oldPassword" v-model="oldPassword" @keyup.enter="savePassword()"/>
                    <div class="inputError" id="incorrectPasswordError">Incorrect Password</div>
                </div>
                <div class="inputField">
                    <p class="inputLabel">New Password</p>
                    <input type="password" autocomplete="new-password" maxlength="70" class="validInput"  name="newPassword" v-model="userCredentials.password" @blur="validatePassword()" @keyup.enter="savePassword()"/>
                    <div class="inputError passwordError">Password must contain at least 6 characters: one uppercase letter, one lowercase letter, one digit, and one special character</div>
                    <div id="passwordSpec">Use a minimum of 6 characters (case sensitive) with at least one uppercase letter, one lowercase letter, one number, and one special character</div>
                </div>
                <div class="inputField edit">
                    <p class="inputLabel">Confirm Password</p>
                    <input type="password" autocomplete="new-password" maxlength="70" class="validInput" name="confirmPassword" v-model="confirmedPassword" @blur="validateConfirmPassword()" @keyup.enter="savePassword()"/>
                    <div class="inputError passwordMatchError">Passwords do not match</div>
                </div>
                 <div :class="passwordSaveIsDisabled" id="savePasswordButton" @click="savePassword()">
                    <p class="buttonText">Save Password</p>
                </div>
                <div class="button editButton cancelPasswordButton" @click="cancelPasswordEdit()">
                    <p class="buttonText">Cancel</p>
                </div>
            </form>
        </div>
        <div class="mainBox editMainBox" id="passwordMainBox">
          <div id="headerBox">
              <p id="headerText">Delete Account?</p>
          </div>
          <div class="subBox">
            <div class="button" @click="deleteAccount()">
                <p class="buttonText">Delete Account</p>
            </div>
          </div>
      </div>
    </div>
    <b-spinner variant="primary" class="loading" id="signUpSpinner" style="display:none"></b-spinner>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'UserCredentials',
  props: ['section'],
  data: function() {
    return {
      confirmedPassword: "",
      validLoginPassword: false,
      validLoginUsername: false,
      oldPassword: "",
      originallyTypedUsername: "",
      originalUsername: "",
      originallyTypedEmail: "",
      originalEmailAddress: "",
      userCredentials: { 
        userId: -1,
        username: "",
        password: "",
        emailAddress: ""
      },
      validEmailAddress: false,
      validUsername: false,
      validPassword: false,
      passwordsMatch: false
    }
  }, 
  computed: {
    isDisabled() {
      if (this.userCredentials.username == "" || this.confirmedPassword.length == "" ||
          this.userCredentials.password.length == ""|| this.userCredentials.emailAddress == "") {
        return "disabledButton";
      } else {
        return "button";
      }
    },
    usernameSaveIsDisabled() {
        if (this.userCredentials.username == this.originalUsername || this.userCredentials.username == "") {
            return "disabledButton editButton";
        }
        return "button editButton";
    },
    emailSaveIsDisabled() {
        if (this.userCredentials.emailAddress == this.originalEmailAddress || this.userCredentials.emailAddress == "") {
            return "disabledButton editButton";
        }
        return "button editButton";
    },
    passwordSaveIsDisabled() {
        if (this.userCredentials.password == "" || this.oldPassword == "" || 
            this.confirmedPassword == "" || this.userCredentials.password == this.oldPassword) {
            return "disabledButton editButton";
        }
        return "button editButton";
    },
    ...mapState([
      'usernameAvailable',
      'emailAvailable',
      'user',
      'validOldPassword'
    ])
  },
  methods: {
    ...mapActions([
      'validateUsername',
      'postNewUser',
      'validateEmail',
      'validateOldPassword',
      'updateUser',
      'changePassword',
      'displaySuccessErrorMessage',
      'deleteAccount'
    ]),
    async validateCreationInfo() {
      if (this.isDisabled == "button") {
        this.validatePasswordMatch();
        if (this.validUsername && this.validPassword && this.validEmailAddress && this.passwordsMatch && 
            this.usernameAvailable) {
              let signUpSpinner = document.getElementById("signUpSpinner");
              signUpSpinner.style.display = "inline-block";
              await this.$store.dispatch('postNewUser', this.userCredentials);
              signUpSpinner.style.display = "none";
              this.clearForm();
              this.$router.push("/home");
        }
      }
    },
    clearForm() {
      this.userCredentials.emailAddress = "";
      this.userCredentials.username = "";
      this.userCredentials.password = "";
      this.confirmedPassword = "";
    },
    cancel() {
      this.clearForm();
      this.$router.push("/");
    },
    async deleteAccount() {
      const answer = window.confirm('Are you sure you wish to delete your account?')
      if (answer) {
        let success = await this.$store.dispatch('deleteAccount');
        if (success) {
          this.$store.dispatch('displaySuccessErrorMessage', {message: 'Account Successfully Deleted', success: true});
          this.$router.push('/');
        }
      }
    },
    async validateEmailAddress() {
      let element;
      if (this.section == "createAccount") {
            element = document.getElementsByName("email")[0];
      } else {
            element = document.getElementsByName("editEmail")[0];
      }
      let emailError = document.getElementsByClassName("emailError")[0];
      let emailUnavailableError = document.getElementsByClassName("emailUnavailableError")[0];
      if (this.userCredentials.emailAddress === "") {
        this.validEmailAddress = false;
        element.classList.add("invalidInput");
        element.placeholder = " Required Field";
      } else if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.userCredentials.emailAddress)){
        emailError.style.display = "none";
        if(this.originallyTypedEmail != this.userCredentials.emailAddress) {
          await this.$store.dispatch('validateEmailAddress', this.userCredentials.emailAddress);
          if (this.emailAvailable){
            element.classList.remove("invalidInput");
            emailUnavailableError.style.display = "none";
            this.validEmailAddress = true;
          } else {
            element.classList.add("invalidInput");
            emailUnavailableError.style.display = "block";
            this.validEmailAddress = false;  
          }
          this.originallyTypedEmail = this.userCredentials.emailAddress;
        }
      } else {
        emailError.style.display = "block";
        this.validEmailAddress = false;
        element.classList.add("invalidInput");
        this.originallyTypedEmail = this.userCredentials.emailAddress;
      }
    },
    async validateUsername() {
        let element;
        if (this.section == "createAccount"){
            element = document.getElementsByName("username")[0];
        }
        else {
            element = document.getElementsByName("editUsername")[0];
        }

        let inputError = document.getElementsByClassName("usernameInputError")[0];
        let takenError = document.getElementsByClassName("usernameTakenError")[0];

        if (this.userCredentials.username === "") {
            this.validUsername = false;
            element.classList.add("invalidInput");
            element.placeholder = " Required Field";
        } else if (this.userCredentials.username != "" && /(^[a-zA-Z0-9._]{1,30})+$/.test(this.userCredentials.username)) {
            inputError.style.display = "none";
            if(this.originallyTypedUsername != this.userCredentials.username){
                await this.$store.dispatch('validateUsername', this.userCredentials.username);
                if (this.usernameAvailable){
                    element.classList.remove("invalidInput");
                    takenError.style.display = "none";
                    this.validUsername = true;
                } else {
                    takenError.style.display = "block";
                    this.validUsername = false;
                }
                this.originallyTypedUsername = this.userCredentials.username;
            }
        } else {
            inputError.style.display = "block";
            this.validUsername = false;
            element.classList.add("invalidInput");
            this.originallyTypedUsername = this.userCredentials.username;
        }
    },
    validatePassword() {
      let element;
      if (this.section == "createAccount") {
        element = document.getElementsByName("password")[0];
      } else {
        element = document.getElementsByName("newPassword")[0];
      }
      let inputError = document.getElementsByClassName("passwordError")[0];
      if (this.userCredentials.password === "") {
        element.classList.add("invalidInput");
        element.placeholder = " Required Field";
        this.validPassword = false;
      } else if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?'._+~`"!@$%^&*-]).{8,}$/.test(this.userCredentials.password)) {
        inputError.style.display = "none";
        element.classList.remove("invalidInput");
        this.validPassword = true;
        if (this.confirmedPassword != "") {
          this.validatePasswordMatch();
        }
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
        if (this.validPassword) {
          this.validatePasswordMatch();
        }
      }
    },
    validatePasswordMatch() {
      if (this.confirmedPassword != "") {
        let element = document.getElementsByName("confirmPassword")[0];
        let matchError = document.getElementsByClassName("passwordMatchError")[0];
        if (this.userCredentials.password === this.confirmedPassword)
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
    enableUsernameEdit() {
      document.getElementsByClassName("editUsernameButton")[0].style.display = "none";
      document.getElementById("saveUsernameButton").style.display = "inline-block";
      document.getElementsByClassName("cancelUsernameButton")[0].style.display = "inline-block";
      let inputField = document.getElementsByName("editUsername")[0];
      inputField.disabled = false;
      inputField.focus();
    },
    async saveUsername() {
      if (this.usernameSaveIsDisabled == "button editButton"){
        let spinner = document.getElementsByClassName("loading")[0];
        spinner.style.display = "block";
        await this.validateUsername();
        if (this.validUsername) {
          let success = await this.$store.dispatch('updateUser', {save: 'username', username: this.userCredentials.username});
          document.getElementsByClassName("editUsernameButton")[0].style.display = "inline-block";
          document.getElementById("saveUsernameButton").style.display = "none";
          document.getElementsByClassName("cancelUsernameButton")[0].style.display = "none";
          document.getElementsByName("editUsername")[0].disabled = true;
          this.originalUsername = this.userCredentials.username;
          if (success) {
            this.$store.dispatch('displaySuccessErrorMessage', {message: 'Username Updated!', success: true});
          }
        }
        spinner.style.display = "none";
      }
    },
    cancelUsernameEdit() {
      document.getElementsByClassName("editUsernameButton")[0].style.display = "inline-block";
      document.getElementById("saveUsernameButton").style.display = "none";
      document.getElementsByClassName("cancelUsernameButton")[0].style.display = "none";
      this.userCredentials.username = this.originalUsername;
      this.originallyTypedUsername = this.userCredentials.username;
      let element = document.getElementsByName("editUsername")[0];
      element.disabled = true;  
      element.classList.remove("invalidInput");
      document.getElementsByClassName("usernameInputError")[0].style.display = "none";
      document.getElementsByClassName("usernameTakenError")[0].style.display = "none";
    },
    enableEmailEdit() {
      document.getElementsByClassName("editEmailButton")[0].style.display = "none";
      document.getElementById("saveEmailButton").style.display = "inline-block";
      document.getElementsByClassName("cancelEmailButton")[0].style.display = "inline-block";
      let inputField = document.getElementsByName("editEmail")[0];
      inputField.disabled = false;
      inputField.focus();
    },
    async saveEmail() {
      if (this.emailSaveIsDisabled == "button editButton") {
        let spinner = document.getElementsByClassName("loading")[0];
        spinner.style.display = "block";
        await this.validateEmailAddress();
        if (this.validEmailAddress) {
          let success = this.$store.dispatch('updateUser', {save: 'email', email: this.userCredentials.emailAddress});
          document.getElementsByClassName("editEmailButton")[0].style.display = "inline-block";
          document.getElementById("saveEmailButton").style.display = "none";
          document.getElementsByClassName("cancelEmailButton")[0].style.display = "none";
          document.getElementsByName("editEmail")[0].disabled = true;
          this.originalEmailAddress = this.userCredentials.emailAddress;
          if (success) {
            this.$store.dispatch('displaySuccessErrorMessage', {message: 'Email Updated!', success: true})
          }
        }
        spinner.style.display = "none";
      }
    },
    cancelEmailEdit() {
      document.getElementsByClassName("editEmailButton")[0].style.display = "inline-block";
      document.getElementById("saveEmailButton").style.display = "none";
      document.getElementsByClassName("cancelEmailButton")[0].style.display = "none";
      this.userCredentials.emailAddress = this.originalEmailAddress;
      let element = document.getElementsByName("editEmail")[0];
      element.disabled = true;  
      element.classList.remove("invalidInput");
      document.getElementsByClassName("emailError")[0].style.display = "none";
      document.getElementsByClassName("emailUnavailableError")[0].style.display = "none";
    },
    enablePasswordEdit() {
      document.getElementById("passwordMainBox").style.display = "none";
      document.getElementById("passwordEditMainBox").style.display = "block";
      document.getElementsByName('oldPassword')[0].focus();
    },
    async savePassword() {
      let spinner = document.getElementsByClassName("loading")[0];
      let incorrectPassword = document.getElementById("incorrectPasswordError");
      if (this.passwordSaveIsDisabled == "button editButton" && this.validPassword && this.passwordsMatch){
        spinner.style.display = "block";
        await this.$store.dispatch('validateOldPassword', this.oldPassword);
        if (this.validOldPassword) {
          let success = this.$store.dispatch('changePassword', this.confirmedPassword);
          incorrectPassword.style.display = "none";
          this.userCredentials.password = "";
          this.confirmedPassword = "";
          this.oldPassword = "";
          document.getElementById("passwordMainBox").style.display = "block";
          document.getElementById("passwordEditMainBox").style.display = "none";
          if (success) {
            this.$store.dispatch('displaySuccessErrorMessage', {message: 'Password Updated!', success: true});
          }
        } else {
          incorrectPassword.style.display = "block";
        }
        spinner.style.display = "none";
      } else if (this.passwordSaveIsDisabled == "button editButton") {
        if (!this.validPassword) {
          this.validatePassword();
        }
        if (this.validPassword && !this.passwordsMatch) {
          this.validateConfirmPassword();
        }
        if (this.validPassword && this.passwordsMatch) {
          this.savePassword();
        }
      }
    },
    cancelPasswordEdit() {
        this.userCredentials.password = "";
        this.confirmedPassword = "";
        this.oldPassword = "";
        document.getElementById("passwordMainBox").style.display = "block";
        document.getElementById("passwordEditMainBox").style.display = "none";
    }
  },
  beforeMount() {
      if (this.section == "accountSettings") {
          this.userCredentials = JSON.parse(JSON.stringify(this.user));
          this.originallyTypedUsername = this.userCredentials.username;
          this.originalUsername = this.userCredentials.username;
          this.originallyTypedEmail = this.userCredentials.emailAddress;
          this.originalEmailAddress = this.userCredentials.emailAddress;
      }
  }
}
</script>

<style scoped>
    #settingsHeader {
        color: #ffffff;
        font-size:30px;
        text-align:center;
        margin: 0;
        text-decoration: underline;
    }

    .editButton, .edit {
        margin-bottom: 0px;
    }

    .editMainBox {
        margin-top: 15px;
        margin-bottom: 15px;
    }

    #passwordEditMainBox {
        display: none;
    }

    #passwordMainBox {
        display:block;
    }
</style>