/**
 * Provides a list of drinks that contains selected letter.
 * Not used as it worked just like the search page.
 */
<template>
    <div class="row">
        <div class="col s12 m12">
            <h4>Search alphabet</h4>
            <h5>Contains {{$route.params.letter ? $route.params.letter : 'Alphabet'}}</h5>
            <div class="fixed-action-btn fab-btn-left-bottom">
                <a @click="toggleImageFilter" class="btn-floating btn-large waves-effect waves-light blue tooltipped" data-position="right" data-delay="50" data-tooltip="Toggle Display of Missing Images"><i class="material-icons">broken_image</i></a>
            </div>
        </div>
        <ul class="pagination">
            <li v-for="letter in alphabet" :class="$route.params.letter == letter ? 'active' : 'waves-effect'">
                <router-link :to="{ name: 'ListAlphabet', params: { letter:  letter }}">
                    {{letter}}
                </router-link>
            </li>
        </ul>
        <div v-for="drink in drinksFiltered" class="col s12 m6 l4 xl3">
            <drink-card :drink="drink" :favs="favouritesID" @fave="addFavourite" @unfave="removeFavourite"></drink-card>
        </div>
    </div>
</template>

<script>
import FetchList from '../models/FetchList';

export default {
    data() {
        return {
            drinks: {},
            alphabet: [],
            favouritesID: [],
            favouritesObjects: [],
            filterImagesOut: false,
        }
    },
    methods: {
        addFavourite (object) {
            this.favouritesID.push(object.idDrink);
            this.favouritesObjects.push(object);
        },
        removeFavourite (object) {
            this.favouritesID.splice( this.favouritesID.indexOf(object.idDrink), 1 );
            this.favouritesObjects = this.favouritesObjects.filter( function(el) {
                if(el.idDrink !== object.idDrink){
                    return true
                } else return false;
            });
        },
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
        toggleImageFilter () {
            this.filterImagesOut=!this.filterImagesOut;
        }
    },
    created() {
        this.assignAlphabet();
        this.updateDrinks();
        this.favouritesID = favouritesID;
        this.favouritesObjects = favouritesObjects;
    },
    watch: {
        '$route' (to, from) {
            this.updateDrinks();
        },
        favouritesID () {
            favouritesID = this.favouritesID;
            Vue.ls.set('favouritesID', favouritesID);
        },
        favouritesObjects () {
            favouritesObjects = this.favouritesObjects;
            Vue.ls.set('favouritesObjects', favouritesObjects);
        }
    },
    computed: {
        drinksFiltered: function () {
            if(this.filterImagesOut){
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
