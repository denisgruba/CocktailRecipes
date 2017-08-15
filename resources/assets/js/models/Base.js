/**
 * Provides methods to get list of Alcohol categories.
 * Provides method to pull random drink.
 */
class Base {
    /**
     * Returns a promise with a list of alcoholic filters.
     */
    static all() {
            return axios.get(url+'list.php?a=list');
    };
    /**
     * Returns a promise with a random drink from the API.
     * 'i' has to be the unique string or number so that Async impaired browsers don't confuse the requests.
     * 'i' fixes the Safari and IE11 repeat item bug.
     */
    static random(i) {
            return axios.get(url+'random.php?i='+i);
    };
}

export default Base;
