import axios from 'axios';

export class CategoriaService {

    url = "http://localhost:8080/api/categoria";
    urlBarra = "http://localhost:8080/api/categoria/";

    getCategorias() {
        return axios.get(this.url);
    }

    postCategoria(categoria) {
        return axios.post(this.url, categoria);
    }

    putCategoria(id) {
        return axios.put(this.urlBarra + id);
    }

    deleteCategoria(id) {
        axios.delete(this.urlBarra + id);
    }
}