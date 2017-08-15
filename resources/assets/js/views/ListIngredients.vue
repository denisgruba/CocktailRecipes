/**
 * Provides a list of drinks filtered by their ingredients.
 * It was just way to messy to use in this state.
 */
<template @addFavourite="console.log('tet')">
    <div class="row">
        <div class="col s12 m12">
            <h4>Browse</h4>
            <h5>{{$route.params.ingredient ? spaceThis($route.params.ingredient) : 'All'}}</h5>
        </div>
        <ul class="pagination">
            <li v-for="ingredient in ingredients" :class="$route.params.ingredient == underscoreThis(ingredient.strIngredient1) ? 'active' : 'waves-effect'">
                <router-link :to="{ name: 'ListIngredientSelected', params: { ingredient:  underscoreThis(ingredient.strIngredient1) }}">
                    {{ingredient.strIngredient1}}
                </router-link>
            </li>
        </ul>
        <!-- Loops through Filtered Drinks computed property and displays Drink Card for each available item -->
        <div v-for="drink in drinksFiltered" class="col s12 m6 l4 xl3 drink-container">
            <drink-card :drink="drink" :favs="favouritesID"></drink-card>
        </div>
    </div>
</template>

<script>
import Ingredients from '../models/Ingredients';
import FetchList from '../models/FetchList';

export default {
    data() {
        return {
            ingredients: [], //Initialize empty ingredients array
            drinks: [], //Initialize empty drinks array
        }
    },
    methods: {
        getIngredientsList (){
            /**
             * Get the list of Ingredients
             */
            Ingredients.all()
                .then(response => this.ingredients = response.data.drinks);
        },
        underscoreThis (text) {
            return text.replace(/ /g,"_");
        },
        spaceThis (text) {
            return text.replace("_", " ");
        },
        /**
         * Get the list of drinks filtered by the ingredient
         */
        updateDrinks () {
            if(this.$route.params.ingredient)
                FetchList.byIngredient(this.$route.params.ingredient)
                    .then(response => this.drinks = response.data.drinks);
            else
                this.drinks = [];
        },
    },
    created() {
        // Get the list of ingredients and drinks after initialized
        this.getIngredientsList();
        this.updateDrinks();
    },
    watch: {
        /**
         * Reload the list of drinks if route changes for the same component
         */
        '$route' (to, from) {
            this.updateDrinks();
        },
    },
    computed: {
        /**
         * Binds dynamic favouritesID, favouritesObjects and hideThumbs values taken from Vuex storage.
         */
        favouritesID () {
            return store.state.favouritesID;
        },
        favouritesObjects () {
            return store.state.favouritesObjects;
        },
        hideThumbs () {
            return store.state.hideThumbs;
        },
        /**
         * Returns unchanged array of drinks, or returns list of drinks only with items that have image.
         */
        drinksFiltered: function () {
            if(this.hideThumbs){
                // If hideThumbs is true, filter out items without images
                return this.drinks.filter( function(el) {
                    // Filter keeps the item in array if returned value is truthy
                    if(el.strDrinkThumb){
                        // If drink thumb is defined, keep El in array
                        return true
                    } else return false;
                });
            } else return this.drinks;
        }
    }
}
</script>
