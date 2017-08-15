/**
 * Performs search for matching names in the API on update of the search input.
 */
<template>
    <div class="row">
        <div class="col s12 m12">
            <h4>Search By Name</h4>
            <h5 v-if="this.searchString">Name Contains "{{this.searchString}}"</h5>
            <h6 v-if="searchString && drinks!=null">Found {{drinks.length}}:</h6>
            <div class="input-field">
                <i class="material-icons prefix">search</i>
                <label for="searchString">Search</label>
                <input type="text" id="searchString" class="validate" v-model="searchString">
            </div>
        </div>
        <!-- Loops through Filtered Drinks computed property and displays Drink Card for each available item -->
        <div v-if="drinks" v-for="drink in drinksFiltered" class="col s12 m6 l4 xl3">
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
            searchString: '', //Initialize empty search string
        }
    },
    methods: {
        /**
         * Get the list of drinks matching the searchString
         */
        updateDrinks () {
            if(this.searchString)
            FetchList.byString(this.searchString)
            .then(response => this.drinks = response.data.drinks);
            else
            this.drinks = [];
        },
    },
    watch: {
        /**
         * If searchString is changed, update the drink list
         */
        searchString () {
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
