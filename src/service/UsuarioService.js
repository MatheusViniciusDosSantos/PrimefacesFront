import axios from 'axios';

export class UsuarioService {

    url = "http://localhost:8080/api/usuario";
    urlBarra = "http://localhost:8080/api/usuario/";

    getUsuarios() {
        return axios.get(this.url);
    }

    postUsuario(usuario) {
        return axios.post(this.url, usuario);
    }

    putUsuario(id) {
        return axios.put(this.urlBarra + id);
    }

    deleteUsuario(id) {
        axios.delete(this.urlBarra + id);
    }
}