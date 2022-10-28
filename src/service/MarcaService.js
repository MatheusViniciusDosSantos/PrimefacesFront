import axios from 'axios';

export class MarcaService {

    url = "http://localhost:8080/api/marca";
    urlBarra = "http://localhost:8080/api/marca/";

    getMarcas() {
        return axios.get(this.url);
    }

    postMarca(marca) {
        return axios.post(this.url, marca);
    }

    putMarca(id) {
        return axios.put(this.urlBarra + id);
    }

    deleteMarca(id) {
        axios.delete(this.urlBarra + id);
    }
}