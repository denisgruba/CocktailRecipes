/**
 * Template for the single Card Component when listing Drinks.
 * Uses progressive image loading. Communicates with other components with help of Vuex.
 */

<template>
    <div class="card hoverable">
        <div class="card-image">
            <router-link :to="{ name: 'ShowSingle', params: { id: drink.idDrink }}">
                <progressive-img placeholder="/img/no_thumb.jpg" :src="drink.strDrinkThumb != null ? drink.strDrinkThumb : '/img/no_thumb.jpg'" />
            </router-link>
            <a v-if="this.favs.includes(drink.idDrink)" class="btn-floating halfway-fab waves-effect waves-light red"
                @click="removeFavourite(drink)"
            >
                <i class="material-icons">favorite</i>
            </a>
            <a v-else class="btn-floating halfway-fab waves-effect waves-light red"
                @click="addFavourite(drink)"
            >
                <i class="material-icons">favorite_border</i>
            </a>
        </div>
        <div class="card-content">
            <router-link class="card-title cursor-pointer" :to="{ name: 'ShowSingle', params: { id: drink.idDrink }}" tag="span">
                {{drink.strDrink}}
            </router-link>
        </div>
        <div class="card-action">
            <router-link :to="{ name: 'ShowSingle', params: { id: drink.idDrink }}">
                View Recipe
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: ['drink', 'favs'],
    methods: {
        addFavourite (object) {
            store.commit('addFavourite', object);
        },
        removeFavourite (object) {
            store.commit('removeFavourite', object);
        },
    },
}
</script>
