<template>
    <div>
        <div id="topBar">
            <p id="topBarTitle">{{page}} RECIPE</p>
            <div id="topBarButtons">
                <div class="button" id="save">
                    <p class="buttonText">SAVE</p>
                </div>
                <div class="button" id="cancel">
                    <p class="buttonText">CANCEL</p>
                </div>
            </div>
            
        </div>
        <div class="alterRecipeContainer">
            <div class="half">
                <div class="inputField">
                    <p class="inputLabel">Recipe Name</p>
                    <input type="text" placeholder="Add Recipe Name" class="validInput" name="recipeName" maxlength="60" v-model="fullRecipe.recipeName"/>
                </div>
            </div>
            <div class="half">
                <div class="inputField">
                    <p class="inputLabel">Category</p>
                    <select class="validInput" name="categories" v-model="category">
                        <option value=1>Breakfast</option>
                        <option value=2>Appetizers</option>
                        <option value=3>Beverages</option>
                        <option value=4>Soups & Salads</option>
                        <option value=5>Main Dishes: Beef</option>
                        <option value=6>Main Dishes: Poultry</option>
                        <option value=7>Main Dishes: Pork</option>
                        <option value=8>Main Dishes: Seafood</option>
                        <option value=9>Main Dishes: Vegetarian</option>
                        <option value=10>Side Dishes</option>
                        <option value=11>Desserts</option>
                        <option value=12>Breads & Rolls</option>
                        <option value=13>Miscellaneous</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="alterRecipeContainer">
            <div class="half">
                <div class=dragAndDropContainer>
                    <div class="dragAndDrop" @dragover.prevent @drop="onDrop">
                        <img v-if="!image" src="../assets/upload.png" id="upload" />
                        <div v-if="!image" class="dragAndDropText">
                            <div>Drag And Drop an Image Here</div>
                            <div>or</div>
                        </div>
                        <label v-if="!image" class="button">
                            <p class="buttonText">BROWSE</p>
                            <input type="file" id="imageSelect" name="image" @change="onChange">
                        </label>
                        <div v-else>
                            <div class="croppedImage">
                                <img :src="image" alt=""/>
                            </div>
                            <div class="button" @click="removeImage">
                                <p class="buttonText">CHANGE IMAGE</p>
                            </div>
                        </div>
                    </div>
                </div>
               
                <div class="inputField textarea" v-if="columns == 2">
                    <p class="inputLabel textareaLabel">Notes</p>
                    <textarea class="validInput" :placeholder="notesPlaceholder" name="recipeName"></textarea>
                </div>
            </div>
            <div class="half">
                <div class="ingredientContainer">
                    <div id="ingredients">
                        <table>
                            <thead>
                                <tr>
                                    <th class="sort">Sort</th>
                                    <th class="ingredientTableContainer">Ingredients</th>
                                    <th class="delete">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(ingredient, index) in fullRecipe.ingredients" :key="index">
                                    <td class="sort">&#8942;&#8942;</td>
                                    <td class="ingredientTableContainer">
                                        <input type="text" class="ingredientName" name="ingredient" maxlength="60" :placeholder="ingredientPlaceholder" v-model="ingredient.ingredientName"/>
                                    </td>
                                    <td class="delete"></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="button ingredientButton" id="addIngredient" @click="addIngredient()">
                            <p class="buttonText">ADD INGREDIENT</p>
                        </div> 
                    </div>
                </div>
                
                <div class="inputField textarea">
                    <p class="inputLabel textareaLabel">Instructions</p>
                    <textarea class="validInput" placeholder="Add steps to create recipe" name="recipeName"></textarea>
                </div>
            </div>
            <div class="half" v-if="columns == 1">
                <div class="inputField notes">
                    <p class="inputLabel textareaLabel">Notes</p>
                    <textarea class="validInput" name="recipeName" :placeholder="notesPlaceholder"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'AlterRecipe',
    props: ['page'],
    computed: {
        ...mapState([
            'loggedIn'
        ])
    },
    data: function() {
        return {
            fullRecipe: {
                categoryId:2,
                imageURL:"",
                ingredients:[
                    {
                        ingredientId:-1,
                        ingredientName:"",
                        recipeId:-1,
                        sortOrder:1
                    }
                ],
                instructions:"",
                notes:"",
                recipeId:13,
                recipeName:""
            },
            category: "1",
            image: "",
            columns: 2,
            notesPlaceholder: "Add anything you may find beneficial",
            ingredientPlaceholder: "e.g. 1 cup milk",
        }
    },
    methods: {
        addIngredient() {
            this.fullRecipe.ingredients.push({
                ingredientId:-1,
                ingredientName:"",
                recipeId:-1,
                sortOrder: 2
            });
        },
        handler(e) {
            e.preventDefault();
            e.returnValue = '';
        },
        validateRecipeName() {

        },
        onDrop(event) {
            event.stopPropagation();
            event.preventDefault();
            var files = event.dataTransfer.files;
            var validated = this.createFile(files[0]);
            console.log(validated);
            if (!validated) {
                event.dataTransfer.files = "";
            }
        },      
        onChange(event) {
            var files = event.target.files;
            var validated = this.createFile(files[0]);
            if (!validated) {
                event.target.value = "";
            }
        },
        createFile(file) {
            var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
            if (!allowedExtensions.exec(file.name)) { 
                alert('Invalid file type'); 
                this.image = ''; 
                return false; 
            }  
            else  {
                var reader = new FileReader();
                var vm = this;

                reader.onload = (event) => {
                    vm.image = event.target.result;
                }

                reader.readAsDataURL(file);
            } 
            return true;           
        },
        removeImage() {
            this.image = '';
        },
        setResizeVariables() {
            if (window.innerWidth > 700) {
                this.columns = 2;
            } else {
                this.columns = 1;
            }

            if (window.innerWidth < 330) {
                this.ingredientPlaceholder = "e.g. 1 egg";
            } else {
                this.ingredientPlaceholder = "e.g. 1 cup milk";
            }
        }
    },
    beforeMount() {
        window.addEventListener("resize", this.setResizeVariables);
        window.scrollTo(0,0);
        if (!this.loggedIn) {
            this.$router.replace("/");
        }
    },
    created() {
        //window.addEventListener("beforeunload", this.handler);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.setResizeVariables);
        //window.removeEventListener("beforeunload", this.handler);
    }

}
</script>

<style scoped>
.alterRecipeContainer {
    display:flex;
    justify-content: flex-start;
}
.croppedImage {
    width: 225px;
    height: 142px;
    overflow: hidden;
    margin: 10px auto 0 auto;
    border-radius: 4px;
    border: 3px solid #005d85;
}
.croppedImage img {
    max-width:100%;
    border-radius: 4px;
}
.dragAndDropContainer {
    text-align:center;
    width: 90%;
    margin: 10px auto 10px auto;
    background: #ffffff;
    border-radius: 4px;
    padding: 10px 0 10px 0;
}

.dragAndDrop {
    border: 2px dashed #262f3b;
    border-radius: 4px;
    width: 90%;
    margin: 0 auto 0 auto;
}
.dragAndDropText {
    font-size:20px;
    padding:5px;
}

.half {
    display: inline-block;
    width: 50%;
    position:relative;
    top: 0;
}

#imageSelect {
    display: none;
}

#ingredients {
    border-radius:4px;
    border: 1px solid #000000;
    text-align:center;
    min-height: 223px;
    width: 90%;
    margin: 0 auto 0 auto;
}
.ingredientContainer {
    min-height: 243px;
    width:90%;
    border-radius: 4px;
    padding: 10px 0 10px 0;
    background: #ffffff;
    margin: 10px auto 10px auto;
}

.ingredientTableContainer {
    width: 60%;
}

.ingredientName {
    width:100%;
    border:none;
    padding-left:10px;
    text-overflow:ellipsis;
}
.ingredientName:focus {
    outline:none;
}
.inputField p{
    margin-left:40px;
}

select:focus {
    outline: none;
}

.sort, .delete {
    width: 20%;
}

table { 
    border: 1px solid #000000;
    border-collapse: separate;
    border-left: 0;
    border-radius: 4px;
    border-spacing: 0px;
    width: 90%;
    margin: 10px auto 10px auto;
}

.textarea {
    margin-top: 20px;
}

thead {
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
    border-collapse: separate;
}
tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
}
th, td {
    padding: 5px 4px 6px 4px; 
    text-align: left;
    vertical-align: top;
    border-left: 1px solid #000000;    
}
td {
    border-top: 1px solid #000000;    
}
thead:first-child tr:first-child th:first-child, tbody:first-child tr:first-child td:first-child {
    border-radius: 4px 0 0 0;
}
thead:last-child tr:last-child th:first-child, tbody:last-child tr:last-child td:first-child {
    border-radius: 0 0 0 4px;
}

td.sort, th, td.delete {
    text-align:center;
}

textarea {
    min-height: 200px;
    padding:10px;
}

.textareaLabel{
    position:relative;
    z-index:1;
}

textarea:focus {
    outline: none;
}

#topBar {
    background: #85001a;
    margin:10px auto 10px auto;
    width: 95%;
    border-radius: 4px;
    position:relative;
    border: 1px solid #ffffff;
}
#topBarButtons {
    right: 0;
    position:absolute;
    margin-top:-3px;
    display:inline-block;
}
#topBarTitle {
    display: inline-block;
    color: #ffffff;
    font-size: 20px;
    margin: 10px;
    vertical-align:middle;
}
#upload {
    margin:20px 0 10px 0;
    color: #93b0b3;
}
@media only screen and (max-width:1000px) {
    .inputField p {
        margin-left:35px;
    }
}
@media only screen and (max-width:700px) {
    .half {
        display: block;
        width: auto;
    }
    .textarea {
        margin-top:10px;
    }
    .alterRecipeContainer {
        display: block;
    }
    #topBar {
        width: 90%;
    }
}
@media only screen and (max-width:500px) {
    #topBarTitle, #topBarButtons {
        position:relative;
        display: block;
        text-align:center;
    }
}
@media only screen and (max-width:415px) {
    .inputField p {
        margin-left:30px;
    }
    .notes {
        margin-bottom:20px;
    }
    .ingredientButton {
        width:150px;
    }
}
</style>