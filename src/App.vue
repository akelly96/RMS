<template>
  <div>
    <div id="loggedOutHeader" v-if="!loggedIn">
      <img class="logo" src="./assets/logo.png"/>
      <p id="loggedOutHeaderText">Recipe Management System</p>
      <p id="smallTopNavigationText">RMS</p>
    </div>
    <div id="topNavigation" v-if="loggedIn">
      <img class="logo" src="./assets/logo.png"/>
      <p id="topNavigationText">Recipe Management System</p>
      <p id="smallTopNavigationText">RMS</p>
      <div v-if="topRoutersVisible" style="display:flex;">
        <router-link to="/home" class="navButtonContainer">
        <div class="navButtons">
          <img class="home" src="./assets/home.png"/>
          <p class="navButtonText">Home</p>
        </div>
        </router-link>
        <router-link to="/addrecipe" class="navButtonContainer">
          <div class="navButtons">
            <div class="addRecipe">+</div>
            <p class="navButtonText">Add Recipe</p>
          </div>
        </router-link>
        <router-link to="/search" class="navButtonContainer">
          <div class="navButtons">
            <img class="searchIcon" src="./assets/search.png"/>
            <p class="navButtonText">Search</p>
          </div>
        </router-link>
      </div>
      <div id="hamburger" @click.stop="toggleMenuItemsDisplay">&#9776;</div>
      <div id="hamburgerMenuContainer">
        <div class="hamburgerMenu" @click="routeToAccountSettings">Account</div>
        <div class="hamburgerMenu" @click="logOut">Log Out</div>
      </div>
    </div>
    <div id="successErrorMessageContainer">
      <p :id="success? 'successMessage' : 'errorMessage'"><b>{{successErrorMessage}}</b></p>
    </div>
    <router-view :id=getViewId />
    <div id="bottomNavigation" v-if="loggedIn">
      <router-link to="/home" class="navButtonContainer">
        <div class="navButtons">
          <img class="home" src="./assets/home.png"/>
        </div>
      </router-link>
      <router-link to="/addrecipe" class="navButtonContainer">
        <div class="navButtons">
          <div class="addRecipe">+</div>
        </div>
      </router-link>
      <router-link to="/search" class="navButtonContainer">
        <div class="navButtons">
          <img class="searchIcon" src="./assets/search.png"/>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
export default {
  name: 'RecipeManagementSystem',
  computed: {
    ...mapState([
      'loggedIn',
      'successErrorMessage',
      'success',
      'trigger'
    ]),
    getViewId() {
      if (!this.loggedIn){
        return "view"
      } else {
        return "viewLoggedIn"
      }
    }
  },
  data: function() {
    return {
      topRoutersVisible: true,
      timeout: 0
    }
  },
  watch: {
    trigger: function() {
      document.getElementById("successErrorMessageContainer").style.height = '40px';
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
         document.getElementById("successErrorMessageContainer").style.height= '0px';
      }, 2000)
    }
  },
  methods: {
     ...mapMutations([
      'SET_LOGGED_OUT', 
     ]),
    toggleMenuItemsDisplay() {
      let element = document.getElementById("hamburgerMenuContainer");
      if (element.style.display == "none" || element.style.display == "")
        element.style.display = "block";
      else
        element.style.display = "none";
    },
    hideMenuItems() {
      if (this.loggedIn){
        document.getElementById("hamburgerMenuContainer").style.display = "none";
      }
    },
    logOut() {
      this.$store.commit('SET_LOGGED_OUT');
      sessionStorage.removeItem('vuex');
      this.$router.push("/");
    },
    routeToAccountSettings() {
      this.$router.push("/account");
    },
    setRouterVisibility() {
      if (window.innerWidth > 415) {
        this.topRoutersVisible = true;
      } else {
        this.topRoutersVisible = false;
      }
    },
    handler(e) {
      e = e || event;
      e.preventDefault();
    }
  },
  beforeMount() {
    document.addEventListener("click", this.hideMenuItems);
    window.addEventListener("resize", this.setRouterVisibility);
    window.addEventListener("dragover",this.handler, false);
    window.addEventListener("drop", this.handler, false);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.hideMenuItems);
    window.removeEventListener("resize", this.setRouterVisibility);
    window.removeEventListener("dragover",this.handler, false);
    window.removeEventListener("drop", this.handler, false);
  }
}
</script>


<style>
html, body {
  margin: 0px;
  height:100%;
  background: #005d85 !important;
}

.addRecipe {
  font-size:40px;
  color: #ffffff;
  vertical-align:middle;
  margin-top:-10px;
  display:inline-block;
}

.allRecipesContainer {
    margin: 30px auto 0 auto; 
    width:1225px;
}

#app {
  margin: 0px;
  font-family: Roboto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#bottomNavigation {
  background:#85001a;
  display: none;
  align-items:center;
  justify-content:center;
  position: fixed;
  width:100%;
  bottom: 0;
  border-top: 1.8px solid #ffffff;
  z-index: 2;
}

.button {
  background: #262f3b;
  display: inline-block;
  margin:10px;
  text-align:center;
  vertical-align: middle;
  width:140px;
  border-radius:4px;
  border: 1px solid #586d89
}

.button:hover {
  cursor:pointer;
  background:#3a485a; 
}

.buttonText {
  color: #ffffff;
  margin:5px;
}

#confirmationBox {
    font-size: 20px;
    color: #ffffff;
    margin:10px auto 10px auto;
}

.disabledButton {
  background: #3a485a;
  display: inline-block;
  margin:10px;
  text-align:center;
  vertical-align: middle;
  width:140px;
  border-radius:4px;
  border: 1px solid #586d89;
}

#errorMessage {
  color: #FF0000;
}

#hamburger {
  color:#ffffff;
  font-size: 30px;
  position:absolute;
  right: 10px;
  cursor: pointer;
  margin-left:10px;
  height:80px;
  display: flex;
  align-items: center;
}

#hamburger:hover {
  color: #80b3f5;
}

.hamburgerMenu {
  width:150px;
  height:25px;
  justify-content:center;
  align-items:center;
  display:flex;
  background:lightgray;
  cursor: pointer;
}

.hamburgerMenu:hover {
  background:grey;
}

#hamburgerMenuContainer {
  position:absolute;
  right: 10px;
  top:70px;
  display:none;
}

#hamburgerMenuContainer div:first-of-type {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom:1px solid grey;
}

.hamburgerMenu:last-of-type {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

#headerBox {
  border: 1px solid #ffffff;
  margin:10px;
  margin-bottom:0px;
  text-align:center;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

#headerText {
  color: #ffffff;
  font-size:25px;
  margin:5px;
  overflow-wrap:break-word;
}

.home {
  width:25px;
  height:auto;
  display:inline-block;
}

.inputError {
  color: red;
  width: 90%;
  margin-left:auto;
  margin-right:auto;
  display: none;
  margin-top:5px;
}

.inputField {
  background: #e7e6e6;
  text-align: left;
  border-radius:4px;
  width:90%;
  margin-left:auto;
  margin-right:auto;
  padding-bottom:7px;
  margin-bottom:10px;
}

.inputField p {
  color:#808080;
  font-size:14px;
  display: inline-block;
  margin-bottom: -10px;
  background: #e7e6e6;
  padding-left:4px;
  padding-right:4px;
  margin-left:35px;
  border-radius:15px;
}

input:focus {
  outline: none;
}

.invalidInput {
  box-shadow: inset 0px 0px 4px 4px red;
  background: #e7e6e6;
}

.loading {
  position:fixed;
  left:49%;
  top:49%;
}

#loggedOutHeader {
  justify-content: center;
}

#loggedOutHeaderText {
  text-align:center;
}

.logo {
  display: inline-block;
  width:70px;
  height:auto;
  margin:10px;
}

.mainBox {
  border: 1px solid #FFFFFF;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background: #85001a;
  margin-left:auto;
  margin-right:auto;
  width:600px;
  margin-top:30px;
  text-align:center;
  border-radius:4px;
}

.navButtons {
  margin:5px;
  color:#ffffff;
  cursor:pointer;
}

.navButtonContainer {
  height:80px;
  align-items: center;
  display:flex;
  cursor:pointer;
  margin-right: 10px;
}

.navButtonContainer:hover div p {
  text-decoration:underline;
}

.navButtons p{
  display:inline-block;
  margin: 0px 0px 0px 5px;
}

#passwordSpec {
  width:90%;
  margin-left:auto;
  margin-right:auto;
  font-size:14px;
  margin-top:5px
}

.searchIcon {
  width:25px;
  height:auto;
  display:inline-block;
}

#smallTopNavigationText {
  display: none;
  padding:10px;
  color: #ffffff;
  font-size:30px;
  margin:0px;
}
#successErrorMessageContainer {
  height:0px;
  width:100%;
  top:90px;
  z-index:2;
  text-align:center;
  position: fixed;
  vertical-align: middle;
  border-bottom-left-radius:4px;
  border-bottom-right-radius:4px;
  background: #00415d;
  transition: 300ms;
  overflow:hidden;
}

#successMessage, #errorMessage {
  margin:0px;
  font-size:25px;
}

#successMessage {
  color: #00e600;
}
.subBox {
  border: 1px solid #ffffff;
  border-top: none;
  margin: 10px;
  margin-top:0px;
  padding:10px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

#topNavigation, #loggedOutHeader {
  display:flex;
  align-items:center;
  margin-bottom:20px;
  background: #85001a;
  position:fixed;
  width:100%;
  top:0;
  z-index: 2;
}

#topNavigationText, #loggedOutHeaderText {
  display:inline-block;
  padding:10px;
  color: #ffffff;
  font-size:30px;
  margin:0px;
}

.validInput {
  display:block;
  margin-top:-10px;
  height:35px;
  background: #e7e6e6;
  border: 1px solid black;
  width:90%;
  padding-left:5px;
  margin-left:auto;
  margin-right:auto;
  border-radius: 4px;
}

#view, #viewLoggedIn {
  padding-top: 98px;
}

@media only screen and (max-width: 850px){
  .navButtonText {
    display:none !important;
  }
}

@media only screen and (max-width: 670px){
  #topNavigationText, #loggedOutHeaderText {
    display: none;
  }
  #smallTopNavigationText {
    display: inline-block;
  }
}

@media only screen and (max-width: 635px){
  .mainBox{
    width:90%;
  }
}

@media only screen and (max-width: 415px) {
  #bottomNavigation {
    display:flex;
  }

  .navButtonContainer {
    margin:auto;
  }

  body{
    height: auto;
  }

  #viewLoggedIn {
    padding-top:100px;
    padding-bottom:50px;
    margin-bottom:20px;
    overflow: scroll;
  }

  #view {
    padding-top:100px;
    margin-bottom:10px;
  }

  .button, .disabledButton {
    width: 125px;
  }
  
  .allRecipesContainer {
      margin-left:auto;
  }
}

@media only screen and (max-width: 1250px){
  .allRecipesContainer {
    width: 980px;
  }
}

@media only screen and (max-width: 1005px){
  .allRecipesContainer {
    width: 740px;
  }
}

@media only screen and (max-width: 760px){
  .allRecipesContainer {
    width: 490px;
  }
}

@media only screen and (max-width: 565px){
  .allRecipesContainer {
    width: 375px;
  }
}

@media only screen and (max-width: 375px){
  .allRecipesContainer {
    width: 320px;
  }
}

@media only screen and (max-width: 330px){
  .allRecipesContainer {
    width: 100%;
    text-align:center;
  }
}

@media only screen and (max-height: 400px) {
  .logo {
    width:60px;
  }
  #successErrorMessageContainer {
    top:80px;
  }
}
</style>
