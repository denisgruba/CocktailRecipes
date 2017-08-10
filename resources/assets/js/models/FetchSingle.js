/**
 * Pulls the single alcohol details.
 */
class FetchSingle {
    static id(id) {
            return axios.get(url+'lookup.php?i='+id);
    };

}

export default FetchSingle;
