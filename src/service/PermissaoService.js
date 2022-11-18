import axios from 'axios';
import { BaseService } from './BaseService';

export class PermissaoService extends BaseService {
    constructor() {
        super("permissao");
    }
}