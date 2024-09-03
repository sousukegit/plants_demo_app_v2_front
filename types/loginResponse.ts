import { type loginUser } from "~~/types/loginUser";

export type loginResponse = {
    token:string | null;
    expire:number | null;
    user:loginUser| null;
  }