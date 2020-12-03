<template>
    <div>
        <div id="topBar">
            <p id="topBarTitle">{{page}} RECIPE</p>
            <div id="topBarButtons">
                <div class="button" id="save" @click="validateChanges">
                    <p class="buttonText">SAVE</p>
                </div>
                <div class="button" id="cancel" @click="cancelChanges"> 
                    <p class="buttonText">CANCEL</p>
                </div>
            </div>
            
        </div>
        <div class="alterRecipeContainer">
            <div class="half">
                <div class="inputField">
                    <p class="inputLabel">Recipe Name</p>
                    <input type="text" placeholder="Add Recipe Name" class="validInput" name="recipeName" maxlength="60" v-model="fullRecipe.recipeName" @blur="validateRecipeName"/>
                </div>
            </div>
            <div class="half">
                <div class="inputField">
                    <p class="inputLabel">Category</p>
                    <select class="validInput" name="categories" v-model="category" @change="setCategoryId">
                        <option value=1>Breakfast</option>
                        <option value=2>Appetizers</option>
                        <option value=3>Beverages</option>
                        <option value=4>Soups &amp; Salads</option>
                        <option value=5>Main Dishes: Beef</option>
                        <option value=6>Main Dishes: Poultry</option>
                        <option value=7>Main Dishes: Pork</option>
                        <option value=8>Main Dishes: Seafood</option>
                        <option value=9>Main Dishes: Vegetarian</option>
                        <option value=10>Side Dishes</option>
                        <option value=11>Desserts</option>
                        <option value=12>Breads &amp; Rolls</option>
                        <option value=13>Miscellaneous</option>
                    </select>
                    <div class="inputError categoryError">Oh no! Something went wrong! Please reselect the category.</div>
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
                        <div v-show="image">
                            <div class="croppedImage">
                                <img id="image" :src="image" alt="" />
                            </div>
                            <div class="button" id="changeImage" @click="removeImage">
                                <p class="buttonText">CHANGE IMAGE</p>
                            </div>
                        </div>
                    </div>
                </div>
               
                <div class="inputField textarea" v-if="columns == 2">
                    <p class="inputLabel textareaLabel">Notes</p>
                    <textarea class="validInput" :placeholder="notesPlaceholder" name="notes" v-model="fullRecipe.notes"></textarea>
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
                            <draggable
                                :list="fullRecipe.ingredients"
                                handle="#sortSymbol"
                                :animation="200"
                                group="ingredients"
                                filter=".action-button"
                                tag="tbody"
                                style="width: 100%"
                                @change="onIngredientChange"
                            >
                                <tr v-for="(ingredient, index) in fullRecipe.ingredients" :key="index">
                                    <td class="sort">
                                        <p id="sortSymbol">&#8942;&#8942;</p>
                                    </td>
                                    <td class="ingredientTableContainer" @click="setIngredientFocus(index)">
                                        <input type="text" class="ingredientName" name="ingredient" maxlength="60" :placeholder="ingredientPlaceholder" v-model="ingredient.ingredientName" @blur="validateIngredients" @keyup.enter="addIngredient()"/>
                                    </td>
                                    <td class="delete" @click="deleteIngredient(index)">
                                        <div class="deleteButton">&#x2715;</div>
                                    </td>
                                </tr>
                            </draggable>
                        </table>
                        <div class="button ingredientButton" id="addIngredient" @click="addIngredient()">
                            <p class="buttonText">ADD INGREDIENT</p>
                        </div> 
                    </div>
                </div>
                
                <div class="inputField textarea">
                    <p class="inputLabel textareaLabel">Instructions</p>
                    <textarea class="validInput" placeholder="Add steps to create recipe" name="instructions" v-model="fullRecipe.instructions" @blur="validateInstructions"></textarea>
                </div>
            </div>
            <div class="half" v-if="columns == 1">
                <div class="inputField notes">
                    <p class="inputLabel textareaLabel">Notes</p>
                    <textarea class="validInput" name="notes" v-model="fullRecipe.notes" :placeholder="notesPlaceholder"></textarea>
                </div>
            </div>
        </div>
        <b-spinner variant="primary" class="loading" id="spinner" style="display:none"></b-spinner>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import Axios from 'axios'
export default {
    name: 'AlterRecipe',
    props: ['page'],
    components: {
        draggable
    },
    computed: {
        ...mapState([
            'loggedIn',
            'selectedRecipe',
            'user'
        ]) 
    },
    data: function() {
        return {
            fullRecipe: {
                categoryId: 1,
                createdBy: -1,
                imageURL: "",
                ingredients: [
                    {
                        ingredientId: -1,
                        ingredientName: "",
                        recipeId: -1,
                        sortOrder: 1
                    }
                ],
                instructions: "",
                notes: "",
                recipeId: -1,
                recipeName: "",
            },
            category: "1",
            image: "",
            imageHeight: -1,
            originalImage: "",
            columns: 2,
            notesPlaceholder: "Add anything you may find beneficial",
            ingredientPlaceholder: "e.g. 1 cup milk",
            deletedIngredients: [],
            updatedIngredients: [],
            newIngredients: [],
            recipeId: -1,
            originalFullRecipe: [],
            validRecipeName: false,
            validIngredients: false,
            validInstructions: false,
            validCategory: false,
            clickedSave: false,
            baseURL: "https://localhost:44325/api/",
            inProgess: false
        }
    },
    watch: {
        imageHeight: function() {
            if (this.image != "") {
                this.setImageSize();
            }
        }
    },
    methods: {
        ...mapActions([
            'addRecipe',
            'updateRecipe',
            'addIngredients',
            'updateIngredients',
            'deleteIngredients',
            'displaySuccessErrorMessage'
        ]),
        async addIngredient() {
            this.fullRecipe.ingredients.push({
                ingredientId:-1,
                ingredientName:"",
                recipeId: this.recipeId,
                sortOrder: this.fullRecipe.ingredients.length + 1
            });
            let elements = await document.getElementsByClassName("ingredientName");
            elements[elements.length - 1].focus();
        },
        cancelChanges() {
            if (!this.inProgress){
                this.inProgress = true;
                let category = document.getElementsByName("categories")[0];
                let categoryError = document.getElementsByClassName("categoryError")[0];
                let instructions = document.getElementsByName("instructions")[0];
                let recipeName = document.getElementsByName("recipeName")[0];
                category.classList.remove("invalidInput");
                categoryError.style.display = "none";
                instructions.classList.remove("invalidInput");
                instructions.placeholder = "Add steps to create recipe"
                recipeName.classList.remove("invalidInput");
                recipeName.placeholder = "Add Recipe Name";
                this.deletedIngredients = [];
                this.clickedSave = false;
                let index = 0;
                this.fullRecipe.ingredients.forEach(() => {
                    let element = document.getElementsByName("ingredient")[index];
                    element.parentElement.classList.remove("invalidInput");
                    element.placeholder = this.ingredientPlaceholder;
                    index++;
                });
                if (this.page == "ADD"){
                    this.fullRecipe = JSON.parse(JSON.stringify(this.originalFullRecipe));
                    this.category = "1";
                    this.image = "";
                } else {
                    this.fullRecipe = JSON.parse(JSON.stringify(this.selectedRecipe));
                    this.image = this.fullRecipe.imageURL;
                }
                this.validIngredients = false;
                this.validInstructions = false;
                this.validCategory = false;
                this.validRecipeName = false;
                this.$store.dispatch('displaySuccessErrorMessage',{message: 'Canceled!', success:false})
                this.inProgress = false;
                this.$router.back();
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
                    var image = new Image();
                    image.src = reader.result;

                    image.onload = function() {
                        vm.imageHeight = image.height;
                    };
                }

                reader.readAsDataURL(file);
            } 
            return true;           
        },
        async deleteImage() {
            let public_id = this.originalImage.split("/");
            public_id = public_id[public_id.length - 1];
            public_id = public_id.split(".");
            public_id = public_id[0];
            await Axios.get(`${this.baseURL}Images`, {params: {public_id: public_id}})
            .then(response => {
                console.log(response.data);
                this.fullRecipe.imageURL = "";
                this.image = "";
                this.imageHeight = -1;
            })
            .catch (error => {
                console.log(error);
            });
        },
        deleteIngredient(index) {
            if (this.fullRecipe.ingredients[index].ingredientId != -1) {
                this.deletedIngredients.push(this.fullRecipe.ingredients[index].ingredientId);
            }

            this.fullRecipe.ingredients.splice(index, 1);

            if (this.fullRecipe.ingredients.length == 0) {
                this.addIngredient();
            }
        },
        equalIngredients(a, b) {
            if (a.length != b.length) {
                return false;
            }

            for (let i = 0; i < a.length; i++) {
                if (a[i].ingredientId != b[i].ingredientId ||
                    a[i].ingredientName != b[i].ingredientName ||
                    a[i].sortOrder != b[i].sortOrder) {
                        return false;
                    }
            }
            return true;
        },
        equalRecipes(a,b) {
            if (a.categoryId != b.categoryId ||
                a.instructions != b.instructions ||
                a.notes != b.notes ||
                a.recipeName != b.recipeName ||
                this.image != this.originalImage ||
                !this.equalIngredients(a.ingredients,b.ingredients)){
                    return false
                }
            return true;
        },
        handler(e) {
            let isDirty = this.isDirty();
            
            if (isDirty) {
                e.preventDefault();
                e.returnValue = 'Do you really want to leave? You have unsaved changes!';
            }
        },
        isDirty() {
            if (this.page == "ADD")  {
                if (!this.equalRecipes(this.fullRecipe, this.originalFullRecipe)) {
                    return true;
                }
            } else {
                if (!this.equalRecipes(this.fullRecipe, this.selectedRecipe)) {
                    return true;
                }
            }
            return false;
        },
        onDrop(event) {
            event.stopPropagation();
            event.preventDefault();
            var files = event.dataTransfer.files;
            var validated = this.createFile(files[0]);
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
        onIngredientChange() {
            this.setSortOrder();
            this.validateIngredients();
        },
        removeImage() {
            this.image = '';
        }, 
        async saveChanges() {
            let spinner = document.getElementById("spinner");
            let success = true;
            spinner.style.display = "block";
            if (this.page == "ADD"){
                if (this.image != "") {
                    this.saveImage();
                }
                success = await this.$store.dispatch("addRecipe", this.fullRecipe);
                spinner.style.display = "none";
                if (success) {
                    await this.$store.dispatch('displaySuccessErrorMessage', {message: "Save Successful!", success: true})
                    this.originalFullRecipe = JSON.parse(JSON.stringify(this.fullRecipe));
                    this.$router.replace("/recipe");
                }
            } else {
                if (!this.equalRecipes(this.fullRecipe, this.selectedRecipe)) {
                    let ingredientSuccess = true;
                    let updateIngredientSuccess = true;
                    let deleteIngredientSuccess = true;
                    if (!this.equalIngredients(this.fullRecipe.ingredients, this.selectedRecipe.ingredients)) {
                        this.fullRecipe.ingredients.forEach(ingredient => {
                            if (ingredient.ingredientId != -1) {
                                this.updatedIngredients.push(ingredient)
                            } else {
                                this.newIngredients.push(ingredient);
                            }
                        });

                        if (this.newIngredients.length > 0) {
                            ingredientSuccess = await this.$store.dispatch("addIngredients", this.newIngredients);
                        }

                        if (this.updatedIngredients.length > 0) {
                            updateIngredientSuccess = await this.$store.dispatch("updateIngredients", this.updatedIngredients)
                        }

                        if (this.deletedIngredients.length > 0) {
                            deleteIngredientSuccess = await this.$store.dispatch("deleteIngredients", this.deletedIngredients)
                        }

                        this.newIngredients = [];
                        this.updatedIngredients = [];
                        this.deletedIngredients = [];                   
                    }

                    if (this.image == "" && this.image != this.originalImage){
                        await this.deleteImage();
                    } else if (this.image != "" && this.image != this.originalImage) {
                        if (this.originalImage != "") {
                            await this.deleteImage();
                        }
                        this.saveImage();
                    }
                    success = await this.$store.dispatch('updateRecipe', JSON.parse(JSON.stringify(this.fullRecipe)));
                    if (success && ingredientSuccess && updateIngredientSuccess && deleteIngredientSuccess) {
                        this.$store.dispatch('displaySuccessErrorMessage', {message: "Save Successful!", success: true})
                        this.$router.back();
                    }
                }
            }
            spinner.style.display = "none";
        },
        saveImage() {
            let formData = new FormData();
            formData.append("file", this.image);
            formData.append("upload_preset", "default-preset");
            let requestObj = {
                url: "https://api.cloudinary.com/v1_1/recipemanagementservices/upload",
                method: "POST",
                data: formData
            }
            Axios(requestObj)
            .then((result) => {
                this.fullRecipe.imageURL = this.image = this.originalImage = result.data.secure_url.toString();
                this.imageHeight = this.image.clientHeight;
            })
            .catch((error) => {
                console.log(error);
            })
        },
        setImageSize() {
            let imageContainer = document.getElementsByClassName("croppedImage")[0];
            let image = document.getElementById("image");
            if (imageContainer.clientHeight > this.imageHeight) {
                image.id = "smallImage";
            }
        },
        setIngredientFocus(index) {
            document.getElementsByName("ingredient")[index].focus();
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
        },
        setSortOrder() {
            for (let i = 0; i < this.fullRecipe.ingredients.length; i++) {
                this.fullRecipe.ingredients[i].sortOrder = i + 1;
            }
        },
        setCategoryId() {
            this.fullRecipe.categoryId = parseInt(this.category);
            this.validateCategory();
        },
        validateCategory() {
            let element = document.getElementsByName("categories")[0];
            let error = document.getElementsByClassName("categoryError")[0];
            if (this.fullRecipe.categoryId > 13 || this.fullRecipe.categoryId < 1 || !Number.isInteger(this.fullRecipe.categoryId)){
                element.classList.add("invalidInput");
                this.validCategory = false;
                error.style.display = "block";
            } else {
                element.classList.remove("invalidInput");
                this.validCategory = true;
                error.style.display = "none";
            }
        },
        validateChanges() {
            if (!this.inProgress) {
                this.inProgress = true;
                this.clickedSave = true;
                this.validateRecipeName();
                this.validateIngredients();
                this.validateCategory();
                this.validateInstructions();
                if (this.validRecipeName && this.validIngredients && this.validCategory && this.validInstructions) {
                    this.saveChanges();
                } else {
                    this.$store.dispatch('displaySuccessErrorMessage', {message: "Please Fix Errors Before Saving", success: false})
                }
                this.inProgress = false;
            }
        },
        validateIngredients() {
            if (this.clickedSave) {
                let index = 0;
                let invalidIngredients = 0;
                this.fullRecipe.ingredients.forEach(ingredient => {
                    let element = document.getElementsByName("ingredient")[index];
                    if (ingredient.ingredientName == "") {
                        element.placeholder = "Required Field";
                        element.parentElement.classList.add("invalidInput");
                        invalidIngredients++;
                    } else {
                        element.parentElement.classList.remove("invalidInput");
                        element.placeholder = this.ingredientPlaceholder;
                    }
                    index++;
                });

                if (invalidIngredients == 0) {
                    this.validIngredients = true;
                } else {
                    this.validIngredients = false;
                }
            }
        },
        validateInstructions() {
            if (this.clickedSave) {
                let element = document.getElementsByName("instructions")[0];
                if (this.fullRecipe.instructions == "") {
                    element.placeholder = "Required Field! Add steps to create recipe";
                    element.classList.add("invalidInput");
                    this.validInstructions = false;
                } else {
                    element.classList.remove("invalidInput");
                    element.placeholder = "Add steps to create recipe";
                    this.validInstructions = true;
                }
            }
        },
        validateRecipeName() {
            if (this.clickedSave) {
                let element = document.getElementsByName("recipeName")[0];
                if (this.fullRecipe.recipeName == "") {
                    element.placeholder = "Required Field";
                    element.classList.add("invalidInput");
                    this.validRecipeName = false;
                } else {
                    element.classList.remove("invalidInput");
                    element.placeholder = "Add Recipe Name";
                    this.validRecipeName = true;
                }
            }
        }
    },
    beforeMount() {
        window.addEventListener("resize", this.setResizeVariables);
        window.scrollTo(0,0);
        if (!this.loggedIn) {
            this.$router.replace("/");
        }

        if (this.page == "EDIT") {
            this.fullRecipe = JSON.parse(JSON.stringify(this.selectedRecipe));
            if (this.fullRecipe.imageURL != "") {
                this.image = this.fullRecipe.imageURL;
                this.originalImage = this.fullRecipe.imageURL;
            } else {
                this.image = "";
                this.originalImage = "";
            }
            this.recipeId = this.fullRecipe.recipeId;
            this.category = this.fullRecipe.categoryId;
        } else {
            this.fullRecipe.createdBy = this.user.userId;
            this.originalFullRecipe = JSON.parse(JSON.stringify(this.fullRecipe));
        }
    },
    created() {
        window.addEventListener("beforeunload", this.handler);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.setResizeVariables);
        window.removeEventListener("beforeunload", this.handler);
    }

}
</script>

<style scoped>
.alterRecipeContainer {
    display:flex;
    justify-content: flex-start;
}
.croppedImage {
    width: 337px;
    height: calc(337px * .631);
    overflow: hidden;
    margin: 10px auto 0 auto;
    border-radius: 4px;
    border: 3px solid #005d85;
}

#image {
    min-width:100%;
    max-width:100%;
}

#smallImage {
    min-height:100%;
    max-height:100%;
}
.deleteButton {
    display:inline-block;
    border-radius: 20px;
    padding:0.04px 5.6px 0.04px 5.4px;
    background:#262f3b;
    color: #ffffff;
    margin: 0 auto 0 auto;
    cursor: pointer;
}
.deleteButton:hover {
    background: #586d89;
}

.dragAndDropContainer {
    text-align:center;
    width: 90%;
    margin: 10px auto 10px auto;
    background: #e7e6e6;
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
    background: #e7e6e6;
    margin: 10px auto 10px auto;
}

.ingredientTableContainer {
    width: 60%;
    vertical-align:middle;
}

.ingredientName {
    width:100%;
    border:none;
    padding-left:10px;
    text-overflow:ellipsis;
    background: #e7e6e6;
}
.ingredientName:focus {
    outline:none;
}
.inputField, .inputLabel {
    background: #e7e6e6;
}

.inputField p{
    margin-left:40px;
}

select:focus {
    outline: none;
}

.sort, .delete {
    width: 20%;
    vertical-align:middle;
}

#sortSymbol {
    margin: 0px;
    font-size:28px;
    cursor: grab;
    display: inline-block;
    line-height: 25px;
    position:relative;
    top:2px;
    overflow: hidden;
}

#sortSymbol:hover {
    color: grey;
}
#sortSymbol:active {
    cursor:grabbing;
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

td.delete {
    vertical-align: middle;
}

td.ingredientTableContainer {
    cursor:text;
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
    background: #e7e6e6;
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

.validInput, .invalidInput {
    background: #e7e6e6;
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
@media only screen and (max-width:890px) and (min-width: 700px) {
    .croppedImage {
        width: 225px;
        height: calc(225px * .631);
    }
}
@media only screen and (max-width:500px) {
    #topBarTitle, #topBarButtons {
        position:relative;
        display: block;
        text-align:center;
    }
    
    .croppedImage {
        width: 225px;
        height: calc(225px * .631);
    }
}
@media only screen and (max-width:415px) {
    .inputField p {
        margin-left:30px;
    }

    .notes {
        margin-bottom:20px;
    }

    .ingredientButton, #changeImage {
        width:150px;
    }
}
@media only screen and (max-width: 325px) {
    #save, #cancel {
        width:100px;
    }
    .croppedImage {
        width: 180px;
        height: calc(180px * .631);
    }
}
</style>