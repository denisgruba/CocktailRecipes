/**
 * Provides a list of drinks that contains selected letter.
 * Not used as it worked just like the search page.
 */
<template>
    <div class="row">
        <div class="col s12 m12">
            <h4>Search alphabet</h4>
            <h5>Contains {{$route.params.letter ? $route.params.letter : 'Alphabet'}}</h5>
        </div>
        <ul class="pagination">
            <li v-for="letter in alphabet" :class="$route.params.letter == letter ? 'active' : 'waves-effect'">
                <router-link :to="{ name: 'ListAlphabet', params: { letter:  letter }}">
                    {{letter}}
                </router-link>
            </li>
        </ul>
        <!-- Loops through Filtered Drinks computed property and displays Drink Card for each available item -->
        <div v-for="drink in drinksFiltered" class="col s12 m6 l4 xl3">
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
            alphabet: [],
        }
    },
    methods: {
        /**
         * Creates an alphabet based on character code range.
         */
        assignAlphabet (){
            var charCodeRange = {
                start: 65,
                end: 90
            }
            for (var cc = charCodeRange.start; cc <= charCodeRange.end; cc++) {
                this.alphabet.push(String.fromCharCode(cc));
            }
        },
        /**
         * Get the list of drinks filtered by the selected letter.
         */
        updateDrinks () {
            if(this.$route.params.letter)
                FetchList.byString(this.$route.params.letter)
                    .then(response => this.drinks = response.data.drinks);
            else
                this.drinks = {};
        },
    },
    created() {
        // Create the alphabet array on init
        this.assignAlphabet();
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
