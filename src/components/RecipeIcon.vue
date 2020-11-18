<template>
    <div class="recipeIcon" @click="getRecipeById">
        <div id="recipeImage">
            <img id="image" :src=getRecipeImage />
        </div>
        <p id=recipeName>{{recipe.recipeName}}</p>
        <b-spinner variant="primary" class="loading" id="resetSpinner" style="display:none"></b-spinner>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name:"recipeIcon",
    computed: {
        getRecipeImage() {
            if (this.recipe.imageURL == "") {
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
                return this.recipe.imageURL;
            }
        }
    },
    props: [
        'recipe'
    ],
    methods: {
        ...mapActions([
            'getRecipeById'
        ]),
        async getRecipeById() {
            let spinner = document.getElementsByClassName("loading")[0];
            spinner.style.display = "block";
            await this.$store.dispatch('getRecipeById', this.recipe.recipeId)
            spinner.style.display = "none";
            this.$router.push("/recipe")
        },
        setImageSize() {
            let imageContainer = document.getElementById("recipeImage");
            let image = document.getElementById("image");
            if (imageContainer.clientHeight > image.clientHeight) {
                image.id = "smallImage";
            }
        }
    },
    mounted() {
        this.setImageSize();
    }
}
</script>

<style scoped>

#recipeImage {
    max-width: 100%;
    height: calc(225px * .631);
    overflow: hidden;
    margin: 10px auto 0 auto;
    border-top-right-radius:8px;
    border-top-left-radius:8px;
    background: #85001a;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
}

#image {
    min-width:100%;
    max-width:100%;
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
    vertical-align: middle;
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


#smallImage {
    min-height:100%;
    max-height:100%;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
}

@media only screen and (max-width:565px) {
    #recipeImage, #recipeName, .recipeIcon {
        width:165px;
    }
    .recipeIcon {
        height: 141px;
    }
    #recipeImage {
        height: calc(165px * .631)
    }
}

@media only screen and (max-width:375px) {
    #recipeImage, #recipeName, .recipeIcon {
        width:140px;
    }
    .recipeIcon {
        height: 130px;
    }
    #recipeImage {
        height: calc(140px * .631)
    }
}

@media only screen and (max-width:330px) {
    #recipeImage, #recipeName, .recipeIcon {
        width:200px;
    }
    .recipeIcon {
        height: 150px;
    }
    #recipeImage {
        height: calc(200px * .631)
    }
}
</style>