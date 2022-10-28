import axios from 'axios';

export class PermissaoService {

    url = "http://localhost:8080/api/permissao";
    urlBarra = "http://localhost:8080/api/permissao/";

    getPermissaos() {
        return axios.get(this.url);
    }

    postPermissao(permissao) {
        return axios.post(this.url, permissao);
    }

    putPermissao(id) {
        return axios.put(this.urlBarra + id);
    }

    deletePermissao(id) {
        axios.delete(this.urlBarra + id);
    }
}