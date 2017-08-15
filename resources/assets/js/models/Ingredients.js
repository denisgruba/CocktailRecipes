/**
 * Provides the list of all ingredients.
 * I've decided not to use it, as it was too messy.
 */
class Ingredients {
    static all() {
        /**
         * Returns a promise of ingredients list
         */
        return axios.get(url+'list.php?i=list');
    }
}

export default Ingredients;
