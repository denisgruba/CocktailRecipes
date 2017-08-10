/**
 * Provides methods to get list of Alcohol categories.
 * Provides method to pull random drink.
 */
class Base {
    static all() {
            return axios.get(url+'list.php?a=list');
    };
    static random() {
            return axios.get(url+'random.php');
    };
}

export default Base;
