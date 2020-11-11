<template>
    <div v-if="loggedIn">
        <div id="buttonContainer">
            <div class="button" id="back" @click="goBack">
                <p class="buttonText">GO BACK</p>
            </div>
            
            <div class="button" id="edit" @click="goToEditRecipe">
                <p class="buttonText">EDIT RECIPE</p>
            </div>
        </div>
        <div id="leftSide">
            <div id="recipeNameContainer" style="margin-top:60px;" v-if="containersRelative">
                <p id="recipeName">{{selectedRecipe.recipeName}}</p>
            </div>
            <div id=imageContainer>
                <img :src=selectedRecipe.imageURL id="image" v-if="selectedRecipe.imageURL != 'string'"/>
                <img :src=getImage id="image" v-else />
            </div>
            <div id="notesContainer">
                <p class="containerHeader">Notes</p>
                <p id="notes">{{selectedRecipe.notes}}</p>
            </div>
        </div>
        <div id="rightSide">
            <div id="recipeNameContainer" v-if="!containersRelative">
                <p id="recipeName">{{selectedRecipe.recipeName}}</p>
            </div>
            <div id="ingredientsContainer">
                <p class="containerHeader">Ingredients</p>
                <ul>
                    <li class="ingredient" v-for="(ingredient, index) in selectedRecipe.ingredients" :key="index">{{ingredient.quantity}} {{ingredient.measurement}} {{ingredient.ingredientName}}</li>
                </ul>
            </div>
            <div id="instructionsContainer">
                <p class="containerHeader">Instructions</p>
                <p id="instructions">{{selectedRecipe.instructions}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: "recipe",
        computed: {
            ...mapState([
                'loggedIn',
                'selectedRecipe'
            ]),
            getImage() {
                switch (this.selectedRecipe.categoryId) {
                    case 1:
                        return "https://res.cloudinary.com/recipemanagementservices/image/upload/v1603468402/breakfast_q79ccv.png";
                    case 2:
                        return "https://res.cloudinary.com/recipemanagementservices/image/upload/v1603559236/appetizers_u1ej1m.png";
                    case 3:
                        return "https://res.cloudinary.com/recipemanagementservices/image/upload/v1603471264/beverages_didrfp.png";
                    case 4:
                        return "https://res.cloudinary.com/recipemanagementservices/image/upload/v1603471269/soup_zvjwqp.png";
                    case 5: 
                        return "https://res.cloudinary.com/recipemanagementservices/image/upload/v1603560182/beef_jluoey.png";
                    case 6: 
                        return "https://res.cloudinary.com/recipemanagementservices/image/upload/v1603471265/chicken_loouh5.png";
                    case 7: 
                        return "https://res.cloudinary.com/recipemanagementservices/image/upload/v1603471268/pork_p9aocl.png";
                    case 8: 
                        return "https://res.cloudinary.com/recipemanagementservices/image/upload/v1603471268/seafood_oqqqqg.png";
                    case 9: 
                        return "https://res.cloudinary.com/recipemanagementservices/image/upload/v1603471269/vegetarian_zz0s8a.png";
                    case 10: 
                        return "https://res.cloudinary.com/recipemanagementservices/image/upload/v1603559623/sides_rull9a.png";
                    case 11:
                        return "https://res.cloudinary.com/recipemanagementservices/image/upload/v1603471265/desserts_q4yshs.png";
                    case 12:
                        return "https://res.cloudinary.com/recipemanagementservices/image/upload/v1603471264/bread_bg7ess.png";
                    case 13:
                        return "https://res.cloudinary.com/recipemanagementservices/image/upload/v1603471267/miscellaneous_m7guge.png";
                    default:
                        return "https://res.cloudinary.com/recipemanagementservices/image/upload/v1603471267/miscellaneous_m7guge.png";
                }
            }
        },
        data: function() {
            return {
                containersRelative: false
            }
        },
        methods: {
            goToEditRecipe() {
                this.$router.push('/editrecipe');
            },
            goBack() {
                this.$router.back();
            },
            setContainersRelative() {
                if (window.innerWidth > 885){
                    this.containersRelative = false;
                } else {
                    this.containersRelative = true;
                }
            }
        },
        beforeMount() {
            if (this.loggedIn){
                this.setContainersRelative();
                window.addEventListener("resize", this.setContainersRelative);
            }
            else {
                this.$router.replace("/");
            }
        },
        beforeDestroy() {
            window.removeEventListener("resize", this.setContainersRelative);
        }
    }
</script>

<style scoped>
    #back {
        position:absolute;
        left:10px;
    }

    #buttonContainer {
        display:flex;
        position:relative;
    }

    #container {
        display:flex;
        width: 90%;
        align-items: center;
    }

    .containerHeader {
        text-align:center;
        width:100%;
        font-size:20px;
        margin: 0;
        border-bottom:1px solid #d3d1d1;
        padding:5px;
    }

    #edit {
        position:absolute;
        right:10px;
    }

    #image {
        width:100%;
        height:auto;
    }

    #imageContainer {
        padding:10px;
        width:90%;
        text-align:center;
        background: #85001a;
        display:flex;
        justify-content: center;
        align-items: center;
        margin: 10px auto 10px 20px;
        border-radius:4px;
    }

    #ingredientsContainer, #instructionsContainer {
        background:  #e7e6e6;
        width:90%;
        border-radius:4px;
        align-items:center;
        margin: 10px 20px 10px auto;
    }

    #leftSide {
        width:33%;
        display:inline-block;
        position:absolute;
        left:0;
        top: 140px;
    }

    #notesContainer {
        width:90%;
        margin:10px auto 10px 20px;
        background: #e7e6e6;
        border-radius:4px;
    }

    #notes, #instructions {
        padding: 10px;
    }

    #recipeNameContainer {
        width:90%;
        background:#85001a;
        padding: 5px;
        border-radius: 4px;
        text-align:center;
        margin: 10px 20px 0 auto;
    }

    #recipeName {
        color: #ffffff;
        font-size:25px;
        margin: 0px;
    }

    #rightSide{
        width:66%;
        display:inline-block;
        position:absolute;
        right: 0;
        top:140px;
    }

    ul {
        columns: 2;
        margin: 0px;
        position:relative;
    }

    ul:before {
        content:"";
        border-left: 1px solid #d3d1d1;
        left: 50%;
        position:absolute;
        height:100%;
    }
    
    li {
        display: inline-block;
        width: 100%;
        padding:5px 0 5px 0;
        position:relative;
    }

    li:before {
        content: "";
        position:absolute;
        display:list-item;
    }

@media only screen and (max-width: 885px){
    #leftSide, #rightSide {
        width:100%;
        display:block;
        position:relative;
        right:unset;
        top:unset;
    }

    #notesContainer, #recipeNameContainer, #ingredientsContainer, #instructionsContainer {
        margin: 10px auto 10px auto;
    }

    #imageContainer{
        display:none;
    }
}

@media only screen and (max-width:415px){
    ul{
        columns: 1;
        text-align:center;
        padding-inline-start: 0px;
    }

    ul:before {
        display:none;
    }
    #instructionsContainer{
        margin-bottom:20px;
    }
    li:before {
        left: 30%;
    }
}
@media screen and (max-width:360px){
    li:before {
        left: 26%;
    }
}
</style>