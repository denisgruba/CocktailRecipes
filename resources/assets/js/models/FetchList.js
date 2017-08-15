/**
 * Provides list of alcohols filtered by different API requests.
 */
class FetchList {
    /**
     * Returns a promise with a list drinks filtered by their alcoholic/non alcoholic base.
     */
    static byBase(base) {
            return axios.get(url+'filter.php?a='+base);
    };
    /**
     * Returns a promise with a list drinks that contain the certain string.
     */
    static byString(string) {
            return axios.get(url+'search.php?s='+string);
    };
    /**
     * Returns a promise with a list drinks that contain the ingredient.
     */
    static byIngredient(ingredient) {
            return axios.get(url+'filter.php?i='+ingredient);
    };
}

export default FetchList;
