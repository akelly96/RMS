<template>
    <div>
        <div id="searchBarContainer">
            <input type="text" class="searchBar" v-model="searchText" @keyup="setSearchResults" @paste="setSearchResults" placeholder="Search Recipes" />
        </div>
        <div class="allRecipesContainer">
             <div class="allRecipes">
                    <RecipeIcon v-for="recipe in searchResults" 
                    :key="recipe.RecipeId"
                    :recipe="recipe"></RecipeIcon>
            </div>
        </div>
        <div id="noResultsError" v-if="searchResults.length == 0">
            There are no recipes matching your search
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import RecipeIcon from '../components/RecipeIcon'
export default {
    name: 'Search',
    computed: {
        ...mapState([
            'recipeList',
            'loggedIn'
        ])
    },    
    components: {
        RecipeIcon
    },
    data: function() {
        return {
            searchResults: [],
            searchText: ""
        }
    },
    methods: {
        setSearchResults() {
            this.searchResults = this.recipeList.filter(x => x.recipeName.toLowerCase().includes(this.searchText.trim().toLowerCase()))
        }
    },
    beforeMount() {
        window.scrollTo(0,0);
        if (this.loggedIn) {
            this.setSearchResults();
        } else {
            this.$router.replace("/")
        }
    }

}
</script>

<style scoped>
#noResultsError {
    color: #ffffff;
    font-size: 18px;
    text-align:center;
}

.searchBar {
    padding:5px;
    border-radius:4px;
    width:300px;
    border: none;
    background: #e7e6e6;
}

#searchBarContainer {
    text-align:center;
    margin-top:10px;
}

@media only screen and (max-width:415px) {
    #searchBarContainer {
    margin-top:20px;
}
}
</style>