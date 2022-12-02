import axios from 'axios';
import { BaseService } from '../BaseService';

export class LoginService extends BaseService {

    CHAVE_TOKEN = "@token_loja";

    constructor() {
        super("usuarioGerenciamento");
    }

    login(email, senha, mensagemErro) {
        var usuario = { "email": email, "senha": senha }
        axios.post(this.urlBarra + "login", usuario).then(res => {
            localStorage.setItem(this.CHAVE_TOKEN, res.data.token);
            window.location.href = "/";
        }).catch(error => {
            mensagemErro(error.response.data.message);
        });
    }

    autenticado() {
        return this.getToken() != null;
    }

    sair() {
        localStorage.removeItem(this.CHAVE_TOKEN);
    }

    getToken() {
        return localStorage.getItem(this.CHAVE_TOKEN);
    }

}