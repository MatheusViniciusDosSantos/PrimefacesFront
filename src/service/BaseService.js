import axios from 'axios';

export class BaseService {

    constructor(urlBase) {
        this.url = "http://localhost:8080/api/"+urlBase;
        this.urlBarra = "http://localhost:8080/api/"+urlBase+"/";
    }
    

    getAll() {
        return axios.get(this.url);
    }

    post(objeto) {
        return axios.post(this.url, objeto);
    }

    put(id) {
        return axios.put(this.urlBarra + id);
    }

    delete(id) {
        axios.delete(this.urlBarra + id);
    }
}