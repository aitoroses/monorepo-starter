import { Injectable } from 'angular2-di'
import { Http } from './Http'

@Injectable()
export class CreateService {
    constructor( private http: Http) {}

    instantiate = (): Promise<any> => {
        return this.http.post('test/instantiate', null) as any
    }
}
