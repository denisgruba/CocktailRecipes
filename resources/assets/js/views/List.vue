<template>
    <div class="row">
        <div class="col s12 m12">
            <h4>Browse</h4>
            <h5>{{$route.params.base ? spaceThis($route.params.base) : 'All'}}</h5>
        </div>
        <div v-for="drink in drinks" class="col s12 m6 l4 xl3">
            <div class="card hoverable">
                <div class="card-image">
                    <img :src="drink.strDrinkThumb != null ? drink.strDrinkThumb : '/img/no_thumb.jpg'">
                    <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">favorite_border</i></a>
                </div>
                <div class="card-content">
                    <span class="card-title">{{drink.strDrink}}</span>
                </div>
                <div class="card-action">
                    <router-link :to="{ name: 'ShowSingle', params: { id: drink.idDrink }}">
                        View Recipe
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FetchList from '../models/FetchList';

export default {
    data() {
        return {
            drinks: {}
        }
    },
    methods: {
        spaceThis (text) {
            return text.replace("_", " ");
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
        this.updateDrinks();
    },
    watch: {
        '$route' (to, from) {
            this.updateDrinks();
        }
    }

}
</script>
