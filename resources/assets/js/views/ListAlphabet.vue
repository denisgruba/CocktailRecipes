<template>
    <div class="row">
        <div class="col s12 m12">
            <h4>Search alphabet</h4>
            <h5>Contains {{$route.params.letter ? $route.params.letter : 'Alphabet'}}</h5>
            <a class="waves-effect waves-light btn blue" @click="toggleImageFilter"><i class="material-icons left">broken_image</i>{{this.filterImagesOut ? 'Show Missing Images' : 'Hide Missing Images'}}</a>
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
