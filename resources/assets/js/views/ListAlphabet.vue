<template>
    <div class="row">
        <div class="col s12 m12">
            <h4>Browse</h4>
            <h5>{{$route.params.letter ? $route.params.letter : 'Alphabet'}}</h5>
        </div>
        <ul class="pagination">
            <li v-for="letter in alphabet" :class="$route.params.letter == letter ? 'active' : 'waves-effect'">
                <router-link :to="{ name: 'ListAlphabet', params: { letter:  letter }}">
                    {{letter}}
                </router-link>
            </li>
        </ul>
        <div v-for="drink in drinks" class="col s12 m6 l4 xl3">
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
            favouritesID: []
        }
    },
    methods: {
        addFavourite (id) {
            this.favouritesID.push(id);
        },
        removeFavourite (id) {
            this.favouritesID.splice( this.favouritesID.indexOf(id), 1 );
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
            if(this.$route.params.base)
            FetchList.byBase(this.$route.params.base)
            .then(response => this.drinks = response.data.drinks);
            else
            this.drinks = {};
        }
    },
    created() {
        this.assignAlphabet();
        // this.updateDrinks();
    },
    watch: {
        '$route' (to, from) {
            this.updateDrinks();
        },
        favouritesID () {
            favouritesID = this.favouritesID;
        }
    }

}
</script>
<style>
    .pagination{
        text-align: center;
    }
</style>
