import axios from 'axios';
import { BaseService } from './BaseService';

export class ProdutoImagensService extends BaseService {

    constructor() {
        super("produtoImagem");
    }

    getByProdutoId(id) {
        return axios.get(this.urlBarra+"produto/" + id);
    }

    uploadImagens(obj){
        const formData = new FormData();
        formData.append('idProduto', obj.idProduto);
        formData.append('file', obj.file);
        const config ={
            headers :{
                'content-type':'multipart/form-data'
            }
        }
        return axios.post(this.url, formData, config);
    }
}