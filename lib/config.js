
////////////////////
// Configuration  //
////////////////////

export const DEV = process.env.NODE_ENV != 'production'
export const __ENV__ = !DEV ? 'production' : 'development'
export const apiUrl = API_URL || (DEV ? '/api' : "")
export const loginUrl = localStorage.getItem('LOGIN_URL') || '/workspace'
export const authToken =  localStorage.getItem('LOGIN_TOKEN_STORAGE') || 'auth.token'
export const callbackUrlStorage = localStorage.getItem('LOGIN_CALLBACK_URL_STORAGE') || 'auth.callbackUrl'
