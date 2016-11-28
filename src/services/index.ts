import { ReflectiveInjector } from 'angular2-di'

// -- Imports
import { Http } from './Http'
import { LoginService } from './Login'

export const injector = ReflectiveInjector.resolveAndCreate([
    // -- Providers
    Http,
    LoginService
])

// -- Instances
export const loginService: LoginService = injector.get(LoginService)
