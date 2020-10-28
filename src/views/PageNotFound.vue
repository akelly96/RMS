<template>
    <div>
        <div class="centered">
            <div id="error">The page you were looking for cannot be found.</div><br/>
            <div id="todo">Please go to the Recipe Management System home page by clicking the button below</div>
            <router-link to="/home" id="home">RMS Home</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "PageNotFound"
}
</script>

<style>
.centered {
    position:fixed;
    top: 50%;
    left: 50%;
    margin-top:-120px;
    margin-left:-300px;
    text-align:center
}
#error, #todo{
    color: #ffffff;
    width:600px;
    text-align:center;
}
#error{
    font-size: 44px;
}
#home {
    height:40px;
    border:#ffffff;
    background-color:#85001a;
    padding: 0 15px 0 15px;
    border-radius:5px;
    color: #ffffff;
    margin:20px;
    display:inline-flex;
    align-items: center;
}

#home:hover {
    background-color: #b80024;
    text-decoration:none;
    cursor: pointer;
}

@media only screen and (max-width:650px) {
    #error, #todo {
        width: 100%;
        margin-left: 0px;
    }
    .centered {
        width: 100%;
        left: auto;
        display:block;
        margin-left: 0px;
    }
}
</style>