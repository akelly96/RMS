<template>
    <div class="recipeIcon" @click="getRecipeById">
        <img id="recipeImage" :src=getRecipeImage />
        <p id=recipeName>{{recipe.recipeName}}</p>
    </div>
</template>

<script>
export default {
    name:"recipeIcon",
    computed: {
        getRecipeImage() {
            if (this.recipe.imageURL == "string") {
                switch (this.recipe.categoryId){
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
                
            } else {
                return this.recipe.ImageURL;
            }
        }
    },
    props: [
        'recipe'
    ],
    methods: {
        getRecipeById() {
            console.log("Recipe API call for recipe: " + this.recipe.recipeId);
            //call database to get single recipe
        }
    }
}
</script>

<style scoped>
#recipeImage {
    max-width:100%;
    height:142px;
    border-top-right-radius:8px;
    border-top-left-radius:8px;
    background: #85001a;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
}

.recipeIcon {
    width:225px;
    text-align:center;
    height:185px;
    margin:10px 10px 50px 10px;
    border-radius:4px;
    box-shadow: -20px 26px 30px -10px #002c3f;
    cursor:pointer;
    display:inline-block;
    transition-duration: 350ms;
}

.recipeIcon:hover {
    box-shadow: -20px 30px 22px -10px #002c3f;
    transform: scale(1.05, 1.05) translateZ(0px) translate3d(0px, 0px, 0px);
    transition-duration: 350ms;
    transition-property: transform, box-shadow;
    transition-timing-function: ease-in-out;
}

#recipeName {
    width: 225px;
    height:45px;
    text-align:center;
    color:white;
    margin: 0px 0px 0px 0px;
    background: #85001a;
    border-bottom-right-radius:8px;
    border-bottom-left-radius:8px;
    word-wrap: break-word;
    white-space:normal;
    display:flex;
    justify-content: center;
    align-items: center;
}

#recipeBox {
    height: 145px;
    border-radius: 4px;
}

@media only screen and (max-width:565px) {
    #recipeImage, #recipeName, .recipeIcon {
        width:165px;
    }
    .recipeIcon {
        height: 136px;
    }
    #recipeImage {
        height: 104px;
    }
}
</style>