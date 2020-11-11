<template>
  <div>
    <div class="mainBox">
        <div id="headerBox" v-if="!messageSent">
            <p id="headerText">Forgot Password?</p>
        </div>
        <div class="subBox" v-if="!messageSent">
            <div class="inputField">
                <p class="inputLabel">Email Address</p>
                <input type="text" class="validInput" name="email" maxlength="65" v-model="EmailAddress" @blur="validateEmailAddress()"/>
                <div class="inputError" id="emailError">Invalid Email Address</div>
                <div class="inputError" id="emailNotFoundError">We cannot find an account with that email address.</div>
            </div>
            <div :class=isDisabled @click="sendEmail()">
                <p class="buttonText">Reset Password</p>
            </div>
            <div class="button" @click="cancel()">
                <p class="buttonText">Cancel</p>
            </div>
        </div>
        <div id="confirmationBox" v-if="messageSent">
            <p id="emailConfirmation">{{confirmationMessage}}</p>
            <div class="button" @click="cancel()">
                <p class="buttonText">Back To Login</p>
            </div>
        </div>
    </div>
    <b-spinner variant="primary" class="loading" id="forgotPasswordSpinner" style="display:none"></b-spinner>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'ForgotPassword',
  computed: {
    isDisabled() {
      if (this.EmailAddress == "") {
        return "disabledButton";
      } else {
        return "button"
      }
    }
  },
  data: function() {
    return {
        EmailAddress: "",
        validEmailAddress: false,
        messageSent: false,
        confirmationMessage: ""
    }
  },
  methods: {
    validateEmailAddress() {
        let emailError = document.getElementById("emailError");
        let email = document.getElementsByName("email")[0];
        if (this.EmailAddress === "") {
            this.validEmailAddress = false;
            email.classList.add("invalidInput");
            email.placeholder = "Required Field"
        } else if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.EmailAddress)){
            this.validEmailAddress = true;
            email.classList.remove("invalidInput");
            emailError.style.display = "none";
        } else {
            this.validEmailAddress = false;
            email.classList.add("invalidInput");
            emailError.style.display = "block";
        }
    },
    async sendEmail() {
        if (this.isDisabled == "button") {
            let emailNotFoundError = document.getElementById("emailNotFoundError");
            let email = document.getElementsByName("email")[0];
            let spinner = document.getElementById("forgotPasswordSpinner")
            try{
                spinner.style.display = "inline-block";
                let result = await Axios.get("ResetPassword", {params: {emailAddress: this.EmailAddress}})
                spinner.style.display = "none";
                emailNotFoundError.style.display = "none";
                email.classList.remove("invalidInput");
                this.confirmationMessage = result.data;
                this.messageSent = true;
            } catch (error) {
                email.classList.add("invalidInput");
                emailNotFoundError.style.display = "block";
                console.log(error);
            }
        }
    },
    cancel() {
        this.EmailAddress = "";
        this.$router.push("/");
    }
  }
}
</script>