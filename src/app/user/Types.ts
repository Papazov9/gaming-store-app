export interface User {
  username: string,
  token: string,
  roles: string[]
}

export interface UserDTO {
  username: string,
  email: string,
  password: string,
  confirm: string,
  phone: string,
  age: number,
  firstName: string,
  lastName: string
}

export interface UserDetailed extends UserDTO {
  createdAt: string,
  modifiedAt: string
}

export interface JWTDto {
  iss: string,
  sub: string,
  iat: number,
  roles: string
}