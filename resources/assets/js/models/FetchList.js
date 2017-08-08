class FetchList {
    static byBase(base) {
            return axios.get(url+'filter.php?a='+base);
    };
    static all() {
        
    };
}

export default FetchList;
