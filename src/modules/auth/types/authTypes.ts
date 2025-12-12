export interface User {
  id: string;
  
  firstName: string;
  lastName: string;
  name:string;
  email: string;
  token: string;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}
