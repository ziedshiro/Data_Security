export default interface User {
    userId:string,
    firstname:string,
    lastname:string
    password:string,
    codeTwoFactorAuthentication?:string,
    secretCode?:string
}



