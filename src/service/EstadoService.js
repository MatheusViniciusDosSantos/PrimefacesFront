import axios from 'axios';
import { BaseService } from './BaseService';

export class EstadoService extends BaseService {
    constructor() {
        super("estado");
    }
}