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
            drinks: [],
            alphabet: [],
        }
    },
    methods: {
        assignAlphabet (){
            var charCodeRange = {
                start: 65,
                end: 90
            }
            for (var cc = charCodeRange.start; cc <= charCodeRange.end; cc++) {
                this.alphabet.push(String.fromCharCode(cc));
            }
        },
        updateDrinks () {
            if(this.$route.params.letter)
                FetchList.byLetter(this.$route.params.letter)
                    .then(response => this.drinks = response.data.drinks);
            else
                this.drinks = {};
        },
    },
    created() {
        this.assignAlphabet();
        this.updateDrinks();
    },
    watch: {
        '$route' (to, from) {
            this.updateDrinks();
        },
    },
    computed: {
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
                return this.drinks.filter( function(el) {
                    if(el.strDrinkThumb){
                        return true
                    } else return false;
                });
            } else return this.drinks;
        }
    }
}
</script>
