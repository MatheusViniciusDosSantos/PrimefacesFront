import axios from 'axios';

export class EstadoService {

    url = "http://localhost:8080/api/estado";
    urlBarra = "http://localhost:8080/api/estado/";

    getEstados() {
        return axios.get(this.url);
    }

    postEstado(estado) {
        return axios.post(this.url, estado);
    }

    putEstado(id) {
        return axios.put(this.urlBarra + id);
    }

    deleteEstado(id) {
        axios.delete(this.urlBarra + id);
    }
}