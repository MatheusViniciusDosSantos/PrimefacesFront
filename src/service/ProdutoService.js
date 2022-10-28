import axios from 'axios';

export class ProdutoService {

    url = "http://localhost:8080/api/produto";
    urlBarra = "http://localhost:8080/api/produto/";

    getProdutos() {
        return axios.get(this.url);
    }

    postProduto(produto) {
        return axios.post(this.url, produto);
    }

    putProduto(id) {
        return axios.put(this.urlBarra + id);
    }

    deleteProduto(id) {
        axios.delete(this.urlBarra + id);
    }
}