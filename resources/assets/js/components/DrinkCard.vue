<template>
    <div class="card hoverable">
        <div class="card-image">
            <img :src="drink.strDrinkThumb != null ? drink.strDrinkThumb : '/img/no_thumb.jpg'">
            <a v-if="this.favs.includes(drink.idDrink)" class="btn-floating halfway-fab waves-effect waves-light red"
                @click="removeFavourite(drink.idDrink)"
            >
                <i class="material-icons">favorite</i>
            </a>
            <a v-else class="btn-floating halfway-fab waves-effect waves-light red"
                @click="addFavourite(drink.idDrink)"
            >
                <i class="material-icons">favorite_border</i>
            </a>
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
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: ['drink', 'favs'],
    methods: {
        addFavourite (id) {
            this.$emit('fave', id);
        },
        removeFavourite (id) {
            this.$emit('unfave', id);
        },
    },
}
</script>
