import axios from 'axios';

export class EstadoService {

    getEstados() {
        return axios.get("http://localhost:8080/api/estado").then(result => result.data);
    }

    postEstado(estado) {
        return axios.post("http://localhost:8080/api/estado", estado).then(result => result.data);
    }

    putEstado(estado) {
        return axios.put("http://localhost:8080/api/estado/", estado).then(result => result.data);
    }

    deleteEstado(id) {
        axios.delete("http://localhost:8080/api/estado/" + id).then(() => {});
    }
}