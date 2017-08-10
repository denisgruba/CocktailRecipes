/**
 * Provides list of alcohols filtered by different API requests.
 */
class FetchList {
    static byBase(base) {
            return axios.get(url+'filter.php?a='+base);
    };
    static byLetter(letter) {
            return axios.get(url+'search.php?s='+letter);
    };
    static byIngredient(ingredient) {
            return axios.get(url+'filter.php?i='+ingredient);
    };
}

export default FetchList;
