import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';

class OpeningTreeService extends CommonService {
    constructor(public http: HttpClient) {
        super();
        this.endPoint = 'http://127.0.0.1:3108/api/openings/';
    }
}


