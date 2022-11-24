import axios from 'axios';

export class BaseService {

    constructor(urlBase) {
        this.url = "http://localhost:8080/api/"+urlBase;
        this.urlBarra = "http://localhost:8080/api/"+urlBase+"/";
    }
    

    getAll() {
        return axios.get(this.url);
    }

    getById(id) {
        return axios.get(this.urlBarra + id);
    }

    post(objeto) {
        return axios.post(this.url, objeto);
    }

    put(objeto) {
        return axios.put(this.urlBarra + objeto.id, objeto);
    }

    delete(id) {
        return axios.delete(this.urlBarra + id);
    }
}