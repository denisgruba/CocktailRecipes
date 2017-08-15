/**
 * Page view for the Home, pulls a list of random drinks.
 */
<template>
    <div class="row">
        <div class="col s12 m12">
            <h4>Browse</h4>
            <h5>Find Inspiration with this set of Random Drinks:</h5>
        </div>
        <!-- Loops through Filtered Drinks computed property and displays Drink Card for each available item -->
        <div v-for="drink in drinksFiltered" class="col s12 m6 l4 xl3 drink-container">
            <drink-card :drink="drink" :favs="favouritesID"></drink-card>
        </div>
    </div>
</template>

<script>
import Base from '../models/Base';

export default {
    data() {
        return {
            drinks: [], //Initialize empty drinks array
        }
    },
    methods: {
        /**
         * Get random drink for each pass of the loop.
         * Pass i to random function to fix async issues with Safari and IE11
         */
        updateDrinks () {
            for(var i = 0; i < 12; i++) {
                Base.random(i)
                    .then(response => this.drinks.push(response.data.drinks[0]));
            };
        }
    },
    created() {
        // Get the list of drinks after initialized
        this.updateDrinks();
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
