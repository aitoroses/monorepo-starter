import { Injectable } from 'angular2-di'
import { Http } from './Http'

@Injectable()
export class LoginService {
    constructor( private http: Http) {}

    login = (): Promise<any> => {
        return this.http.post('auth', null) as any
    }
}
