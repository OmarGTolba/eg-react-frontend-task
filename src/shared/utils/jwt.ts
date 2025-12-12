import { jwtDecode } from "jwt-decode";


interface JwtPayload {
  sub: string;
  email: string;
  role: "admin" | "user";
  iat?: number;
  exp?: number;
}

export const decodeToken = (token: string): JwtPayload => {
  return jwtDecode<JwtPayload>(token);
};
