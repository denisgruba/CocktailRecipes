/**
 * Pulls the single alcohol details.
 */
class FetchSingle {
    /**
     * Returns a promise with a single drink that matches the id.
     */
    static id(id) {
            return axios.get(url+'lookup.php?i='+id);
    };
}

export default FetchSingle;
