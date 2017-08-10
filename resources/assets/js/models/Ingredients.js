class Ingredients {
    static all() {
            return axios.get(url+'list.php?i=list');
    }
}

export default Ingredients;
