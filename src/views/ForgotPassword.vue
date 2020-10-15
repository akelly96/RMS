<template>
  <div>
    <div id="mainBox">
        <div id="headerBox">
            <p id="headerText">Forgot Password?</p>
        </div>
        <div id="forgotPasswordSection">
            <div class="inputField" style="margin-top:10px;">
                <p class="inputLabel">Email Address</p>
                <input type="text" class="validInput" name="email" v-model="EmailAddress" @blur="validateEmailAddress()"/>
            </div>
            <div class="button" @click="sendEmail()">
                <p class="buttonText">Send Email</p>
            </div>
            <router-link id="signInCancelButton" to="/">Cancel</router-link>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: function() {
    return {
        EmailAddress: ""
    }
  },
  methods: {
    validateEmailAddress() {
        if (this.EmailAddress === "") {
            this.validEmailAddress = false;
            document.getElementsByName("email")[0].classList.add("invalidInput");
        } else if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.EmailAddress)){
            this.validEmailAddress = true;
            document.getElementsByName("email")[0].classList.remove("invalidInput");
        } else {
            this.validEmailAddress = false;
            document.getElementsByName("email")[0].classList.add("invalidInput");
        }
    },
    sendEmail() {
        // Make Call to backend!
    }
  }
}
</script>

<style scoped>
</style>