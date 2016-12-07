// Generated by typings
// Source: typings/lib/globals.d.ts
declare var require: any
declare var System: {
    import: (...x: any[]) => Promise<any>
}

declare var global
declare var componentHandler: any
declare var module: any
declare var __DEV__

interface Object {
    assign: Function
}

declare module "config" {
    export const __ENV__: string
    export const __DEV__: string
    export const apiUrl: string
    export const loginUrl: string
    export const authToken: string
    export const callbackUrlStorage: string
    export default {
        __ENV__,
        __DEV__,
        apiUrl,
        loginUrl,
        authToken,
        callbackUrlStorage
    }
}

// xml-mapping library
declare module 'xml-mapping' {
    export function load<T>(xml: string): T
    export function dump<T>(xmlObject: T): string
    export interface XMLNode {
        $t: string
    }
}

// JWT-Decode function
declare module 'jwt-decode' {
    function jwtDecode<T>(jwtToken: string): T
    export = jwtDecode
}