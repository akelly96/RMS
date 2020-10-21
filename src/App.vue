<template>
  <div>
    <div id="loggedOutHeader" v-if="!loggedIn">
      <img class="logo" src="./assets/logo.png"/>
      <p id="loggedOutHeaderText">Recipe Management System</p>
    </div>
    <div id="topNavigation" v-if="loggedIn">
      <img class="logo" src="./assets/logo.png"/>
      <p id="topNavigationText">Recipe Management System</p>
      <p id="smallTopNavigationText">RMS</p>
      <div class="navButtonContainer">
        <div class="navButtons">
          <img class="home" src="./assets/home.png"/>
          <p class="navButtonText">Home</p>
        </div>
      </div>
      <div class="navButtonContainer">
        <div class="navButtons">
          <div class="addRecipe">+</div>
          <p class="navButtonText">Add Recipe</p>
        </div>
      </div>
      <div class="navButtonContainer">
        <div class="navButtons">
          <img class="searchIcon" src="./assets/search.png"/>
          <p class="navButtonText">Search</p>
        </div>
      </div>
      <div id="hamburger">&#9776;</div>
    </div>
    <router-view id="view"/>
    <div id="bottomNavigation" v-if="loggedIn">
      <div class="navButtonContainer">
        <div class="navButtons">
          <img class="home" src="./assets/home.png"/>
        </div>
      </div>
      <div class="navButtonContainer">
        <div class="navButtons">
          <div class="addRecipe">+</div>
        </div>
      </div>
      <div class="navButtonContainer">
        <div class="navButtons">
          <img class="searchIcon" src="./assets/search.png"/>
        </div>
      </div>
      <div id="bottomHamburger">&#9776;</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Login',
  computed: {
    ...mapState([
      'loggedIn'
    ]),
    headingTextID() {
      if (this.loggedOut){
        return "headingText"
      } else {
        return "loggedInHeadingText"
      }
    }
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

#app {
  margin: 0px;
  font-family: Roboto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#bottomHamburger {
  color:#ffffff;
  font-size: 30px;
  cursor: pointer;
  margin:auto;
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

#hamburger {
  color:#ffffff;
  font-size: 30px;
  position:absolute;
  top: 5px;
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
  margin:10px;
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
  background: #ffffff;
  text-align: left;
  border-radius:4px;
  width:90%;
  margin-left:auto;
  margin-right:auto;
  padding-bottom:7px;
  margin-bottom:10px;
}

.inputField p {
  margin:1px;
  color:#808080;
  font-size:14px;
  display: inline-block;
  margin-bottom: -10px;
  background: white;
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
  background: #ffffff;
  border: 1px solid black;
  width:90%;
  padding-left:5px;
  margin-left:auto;
  margin-right:auto;
  border-radius: 4px;
}

@media only screen and (max-width: 850px){
  .navButtonText {
    display:none !important;
  }
}

@media only screen and (max-width: 670px){
  #topNavigationText {
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
  #topNavigation {
    display: none;
  }
  .navButtonContainer {
    margin:auto;
  }
  body{
    height: auto;
  }
  #view {
    margin-bottom:88px;
    overflow: scroll;
  }
}
</style>
