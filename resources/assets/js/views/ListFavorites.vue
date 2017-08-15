/**
 * Every single Favourite drink will be displayed here.
 * Drink objects are saved in a variable and then saved to Local Storage,
 * so they can persist even on a page reload.
 * Drinks without image can be filtered out.
 */
<template>
    <div class="row">
        <div class="col s12 m12">
            <h4>Favorite Drinks</h4>
            <h5 v-if=""></h5>
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
         * This one is different from other functions as it takes the favouritesObjects as the source array.
         */
        drinksFiltered: function () {
            if(this.hideThumbs){
                // If hideThumbs is true, filter out items without images
                return this.favouritesObjects.filter( function(el) {
                    // Filter keeps the item in array if returned value is truthy
                    if(el.strDrinkThumb){
                        // If drink thumb is defined, keep El in array
                        return true
                    } else return false;
                });
            } else return this.favouritesObjects;
        }
    }
}
</script>
