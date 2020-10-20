<template>
  <div>
    <div id="heading">
      <p id="headingText">Recipe Management System</p>
    </div>
    <router-view/>
  </div>
</template>

<style>
html, body {
  margin: 0px;
  height:100%;
  background: #005d85 !important;
}

#app {
  margin: 0px;
  font-family: Roboto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#heading {
  margin-bottom:20px;
}

#headingText {
  background: #85001a;
  padding:10px;
  color: #ffffff;
  font-size:30px;
  margin:0px;
  text-align:center;
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

#passwordSpec {
  width:90%;
  margin-left:auto;
  margin-right:auto;
  font-size:14px;
  margin-top:5px
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

.subBox {
  border: 1px solid #ffffff;
  border-top: none;
  margin: 10px;
  margin-top:0px;
  padding:10px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

@media only screen and (max-width: 635px){
  .mainBox{
    width:90%;
  }
}
</style>
