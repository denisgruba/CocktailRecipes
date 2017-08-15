/**
 * Provides methods to get list of Alcohol categories.
 * Provides method to pull random drink.
 */
class Base {
    static all() {
            return axios.get(url+'list.php?a=list');
    };
    static random(i) {
            return axios.get(url+'random.php?i='+i);
    };
}

export default Base;
