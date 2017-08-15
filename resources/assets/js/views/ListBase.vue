/**
 * Displays The list of drinks depending on whether they are alcoholic or not.
 * Allows to filter out the Drinks that have no image available.
 */
<template @addFavourite="console.log('tet')">
    <div class="row">
        <div class="col s12 m12">
            <h4>Browse</h4>
            <h5>{{$route.params.base ? spaceThis($route.params.base) : 'All'}}</h5>
        </div>
        <!-- Loops through Filtered Drinks computed property and displays Drink Card for each available item -->
        <div v-for="drink in drinksFiltered" class="col s12 m6 l4 xl3 drink-container">
            <drink-card :drink="drink" :favs="favouritesID"></drink-card>
        </div>
    </div>
</template>

<script>
import FetchList from '../models/FetchList';

export default {
    data() {
        return {
            drinks: [], //Initialize empty drinks array
        }
    },
    methods: {
        /**
         * Replaces underscore in string with spaces
         */
        spaceThis (text) {
            return text.replace("_", " ");
        },
        /**
         * Get the list of drinks filtered by the alcoholic/non alcoholic base
         */
        updateDrinks () {
            if(this.$route.params.base){
                    FetchList.byBase(this.$route.params.base)
                        .then(response => this.drinks = response.data.drinks);
            }
            else
                this.drinks = [];
        },
    },
    created() {
        // Get the list of drinks after initialized
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
