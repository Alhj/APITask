export interface IAuthSigin {
  email:string
  password:string
}


export interface IToken extends Object {
  data: string
}