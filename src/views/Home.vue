<template>
<div v-if="loggedIn">
    <div v-if="recipeList.length > 0">
        <div id="selectBox">
            <div class="selectedItem" @click.stop="setOptionDisplay">
                <p class="selectBoxText">Sort Recipes By:</p>
                <p class="selectBoxText" style="text-decoration: underline">{{selectedOption}}</p>
            </div> 
            <div class="selectOption active" id="Category" @mouseover="changeActiveClass" @click="setSelectedItem('Category')">Category</div>
            <div class="selectOption" id="Title: A-Z" @mouseover="changeActiveClass" @click="setSelectedItem('Title: A-Z')">Title: A-Z</div>
            <div class="selectOption" id="Title: Z-A" @mouseover="changeActiveClass" @click="setSelectedItem('Title: Z-A')">Title: Z-A</div>
        </div>
        <div v-if="selectedOption == 'Category'">
            <div :class="getCategoryClass(recipeCategory.length)" v-for="(recipeCategory, index) in recipes" :key="index">
                <div id="categoryName">
                    {{getCategoryName(index + 1)}}
                </div>
                <div class="leftArrowContainer" @click="scrollLeft(index, setScrollingLeftFalse)">
                    <div class="leftArrow"></div>
                </div>
                <div class="categories">
                    <RecipeIcon v-for="recipe in recipeCategory" 
                        :key="recipe.RecipeId"
                        :recipe="recipe"></RecipeIcon>
                </div>
                <div class="rightArrowContainer" @click="scrollRight(index, setScrollingRightFalse)">
                    <div class="rightArrow"></div>
                </div>
            </div>
        </div>
        <div class="allRecipesContainer" v-else-if="selectedOption == 'Title: A-Z'">
             <div class="allRecipes">
                    <RecipeIcon v-for="recipe in alphabeticalRecipeList" 
                    :key="recipe.RecipeId"
                    :recipe="recipe"></RecipeIcon>
            </div>
        </div>
        <div class="allRecipesContainer" v-else>
             <div class="allRecipes">
                    <RecipeIcon v-for="recipe in reverseAlphabeticalRecipeList" 
                    :key="recipe.RecipeId"
                    :recipe="recipe"></RecipeIcon>
            </div>
        </div>
    </div>
    <div v-else class="mainBox">
        <div id="headerBox">
            <p id="headerText">Welcome {{user.username}}</p>
        </div>
        <div class="subBox">
            <p class="subBoxText">You have not created any recipes!</p>
            <p class="subBoxText">Click below to add your first recipe.</p>
            <div class="button" @click="goToCreateRecipe">
                <p class="buttonText">Add First Recipe</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import RecipeIcon from '../components/RecipeIcon';
import { mapState } from 'vuex';
export default {
    name: "home",
    components: {
        RecipeIcon
    },
    computed: {
        ...mapState([
        'recipeList',
        'alphabeticalRecipeList',
        'reverseAlphabeticalRecipeList',
        'loggedIn',
        'user'
        ])
    },
    data: function() {
        return {
            recipes: [],
            selectedOption: "Category",
            setTopOptions: false,
            isOpen: false,
            slideTimer: null,
            scrollingLeft: Array(13).fill(false),
            scrollingRight: Array(13).fill(false)
        }
    },
    methods: {
        closeSelectOptions() {
            if (this.isOpen){
                let elements = document.getElementsByClassName("selectOption")
                elements.forEach(element => {
                    element.style.display = "none";
                })
                let box = document.getElementsByClassName("selectedItem")[0];
                box.style.borderBottomLeftRadius = "8px";
                box.style.borderBottomRightRadius = "8px";
                this.isOpen = false;
                let activeElement = document.getElementsByClassName("selectOption active")[0];
                if (activeElement.value != this.selectedOption){
                    activeElement.classList.remove("active");
                    document.getElementById(this.selectedOption).classList.add("active");
                }
                
            }
        },
        changeActiveClass() {
            if (!event.target.classList.contains("active")){
                document.getElementsByClassName("selectOption active")[0].classList.remove("active");
                event.target.classList.add("active");
            }
        },
        getCategoryClass(recipeAmount) {
            if (recipeAmount > 0) {
                return "categoriesContainer";
            } else {
                return "categoriesContainer categoriesDisplayNone";
            }
        },
        getCategoryName(index) {
            switch(index){
                case 1:
                    return "Breakfast";
                case 2:
                    return "Appetizers";
                case 3:
                    return "Beverages";
                case 4:
                    return "Soups & Salads";
                case 5: 
                    return "Main Dishes: Beef";
                case 6: 
                    return "Main Dishes: Poultry";
                case 7: 
                    return "Main Dishes: Pork";
                case 8: 
                    return "Main Dishes: Seafood";
                case 9: 
                    return "Main Dishes: Vegetarian";
                case 10: 
                    return "Side Dishes";
                case 11:
                    return "Desserts";
                case 12:
                    return "Breads & Rolls";
                case 13:
                    return "Micellaneous";
                default:
                    return "None";
            }
        },
        getScrollDistance() {
            if (window.innerWidth > 565) {
                return 35;
            }
            return 34;
        },
        getWidth() {
            let innerWidth = window.innerWidth;
            if (innerWidth > 1290)
                return 245 * 5;
            else if (innerWidth > 1050)
                return 245 * 4;
            else if (innerWidth > 800)
                return 245 * 3;
            else if (innerWidth > 565)
                return 245 * 2;
            return 175 * 2;
        },
        goToCreateRecipe() {
            this.$router.push("/addrecipe");
        },
        scrollLeft(index, callback){
            if (!this.scrollingLeft[index] && !this.scrollingRight[index]) {
                this.scrollingLeft[index] = true;
                let content = document.getElementsByClassName("categories")[index];
                let scrollAmount = 0;
                let scrollDistance = this.getScrollDistance();
                let width = this.getWidth();
                let slideTimer = setInterval(function(){
                    content.scrollLeft -= scrollDistance;
                    scrollAmount += scrollDistance;
                    if(scrollAmount >= width){
                        window.clearInterval(slideTimer);
                        callback(index);
                    }
                }, 15);
            }
        },
        scrollRight(index, callback) {
            if (!this.scrollingLeft[index] && !this.scrollingRight[index]) {
                this.scrollingRight[index] = true;
                let content = document.getElementsByClassName("categories")[index];
                let scrollAmount = 0;
                let width = this.getWidth()
                let scrollDistance = this.getScrollDistance();
                let slideTimer = setInterval(function(){
                    content.scrollLeft += scrollDistance;
                    scrollAmount += scrollDistance;
                    if(scrollAmount >= width){
                        window.clearInterval(slideTimer);
                        callback(index);
                    }
                }, 15);
            }
        },
        setArrowVisibility() {
            let elements = document.getElementsByClassName("categoriesContainer");
            let leftArrows = document.getElementsByClassName("leftArrowContainer");
            let rightArrows = document.getElementsByClassName("rightArrowContainer");
            for (let i = 0; i < elements.length; i++) {
                let width = 0;
                let childCount = elements[i].getElementsByClassName("categories")[0].childElementCount;
                if (childCount > 0) {
                    if (window.innerWidth > 565)
                        width = 245 * childCount + 50;
                    else
                        width = 175 * childCount + 50;
                }
                if (width < window.innerWidth) {
                    rightArrows[i].style.display = "none";
                    leftArrows[i].style.display = "none";
                } else {
                    rightArrows[i].style.display = "flex";
                    leftArrows[i].style.display = "flex";
                }
            }
        },
        setScrollingRightFalse(index) {
            this.scrollingRight[index] = false;
        },
        setScrollingLeftFalse(index) {
            this.scrollingLeft[index] = false;
        },
        setOptionDisplay(event) {
            let elements = document.getElementsByClassName("selectOption");

            if (!this.setTopOptions){
                for (let i = 0; i < elements.length; i++){
                    let top = 40 * (i + 1)
                    elements[i].style.top = `${top}px`; 
                }
                this.setTopOptions = true;
            }
            let clicked = event.target;
            if (clicked.tagName == "P") {
                clicked = clicked.parentElement;
            }
            elements.forEach(element => {
                if (element.style.display == "none" || element.style.display == ""){
                    clicked.style.borderBottomLeftRadius = "0px";
                    clicked.style.borderBottomRightRadius = "0px";
                    element.style.display = "flex";
                    this.isOpen = true;
                } else {
                    element.style.display = "none";
                    clicked.style.borderBottomLeftRadius = "8px";
                    clicked.style.borderBottomRightRadius = "8px";
                    this.isOpen = false;
                }
            })
        },
        setSelectedItem(selectedOption) {
            this.selectedOption = selectedOption;
        },
       
    },
    beforeMount() {
        window.scrollTo(0,0);
        if (this.loggedIn)
        {
            if (this.recipeList.length > 0){
                for (var i = 1; i <= 13; i++){
                    let categoryId = i;
                    let recipeCategory = this.recipeList.filter(i => i.categoryId == categoryId);
                    this.recipes.push(recipeCategory);
                }
            }
        } else {
            this.$router.replace("/");
        }
        window.addEventListener("click", this.closeSelectOptions);
        window.addEventListener("resize", this.setArrowVisibility);      
    },
    mounted() {
        this.setArrowVisibility()
    },
    beforeDestory() {
        window.removeEventListener("click", this.closeSelectOptions);
        window.removeEventListener("resize", this.setArrowVisibility);      
    }
}
</script>

<style scoped>
#categoryName {
    font-size:20px;
    color: #ffffff;
    margin-left:60px;
}

.categories {
    position:relative;
    display:inline-block;
    overflow: auto;
    white-space: nowrap;
    width:100%;
    -ms-overflow-style: none;
    scrollbar-width: none;
    padding: 0 50px 0 50px;
}

.categories::-webkit-scrollbar {
    display:none;
}

.categoriesContainer {
    position: relative;
    height: 240px;
}

.categoriesDisplayNone {
    display:none;
}

html {
    scroll-behavior: smooth;
}

.leftArrowContainer, .rightArrowContainer {
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    opacity: 0;
    height: auto;
    justify-content: center;
    align-items:center;
    position: absolute;
    top:37px;
    z-index: 1;
    height: 210px;
    width:60px;
}

.leftArrow {
    border-left: 4px solid #ffffff;
    transform: rotateY(0deg) rotate(-45deg);
}

.leftArrowContainer:hover, .rightArrowContainer:hover {
    opacity: 1;
}

.leftArrowContainer {
    left: 0px;
}

.rightArrowContainer {
    right: 0px;
}

.leftArrow, .rightArrow {
    border-top:4px solid #ffffff;
    height:20px;
    width:20px;
}

.rightArrow {
    border-right: 4px solid #ffffff;
    transform: rotateY(0deg) rotate(45deg);
}

#selectBox {
    position:relative;
    height:40px;
}
.selectedItem, .selectOption {
    width: 220px;
    right: 0px;
    height: 40px;
    color: #ffffff;
    display:flex;
    align-items:center;
    padding-left:5px;
    margin: 0 10px 0 auto;
    cursor: pointer;
    position:absolute;
}

.selectedItem {
    background: #85001a;
    border-radius:8px;
}

.selectedItem:after {
    content: "";
    width: 8px;
    height:8px;
    border-top: 1px solid #ffffff;
    border-left: 1px solid #ffffff;
    transform:rotate(-135deg);
    top:15px;
    right:10px;
}

.selectBoxText {
    margin: 0 10px 0 0;
    display: inline-block;
}

.selectOption {
    background: #c7c6c6;
    color: #000000;
    position:absolute;
    right: 0;
    z-index: 1;
    display:none;
}

.selectOption:last-of-type {
    border-bottom-left-radius:8px;
    border-bottom-right-radius: 8px;
}

.selectOption.active {
    background:#7FAEC2;
}

.subBoxText {
    color:white;
    font-size:18px;
    margin:0;
    width:100%;
}

@media only screen and (max-width: 565px) {
    .leftArrowContainer, .rightArrowContainer {
        height:180px;
    }
}
@media only screen and (max-width: 415px) {
    .leftArrowContainer, .rightArrowContainer {
        display: none;
    }
    .categories {
        padding: 0px;
    }
    .categoriesContainer:not(:last-of-type) {
        margin-bottom:-20px;
    }
    #categoryName {
        text-align: center;
        margin: 0px;
    }
    #selectBox {
        margin-top:10px;
        display:flex;
        justify-content:center;
    }
    .selectedItem, .selectOption {
        right:unset;
    }
    .button {
        width:auto;
    }
} 
</style>