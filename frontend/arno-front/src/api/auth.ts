import { BaseAPI } from "./base";
import { UserRole } from "../models";

export async function callRegister(params: any, role: UserRole) {

  const renamed_params = {
    first_name: params["firstName"],
    last_name: params["lastName"],
    email: params["email"],
    username: params["email"],
    phone: params["phone"],
    password: params["password"],
    specialities: params["specialities"],
  };

  const b = new BaseAPI('account') 
 
  const response = await b.sendPostRequest({
    path: `register/${role}/`,
    body: renamed_params,
    headers: null
  })
 
  console.log("SIGNUP response", response);

  return response;
}

export async function callLogin(params: any) {

  const renamed_params = {
    username: params["email"],
    password: params["password"],
  };

  const b = new BaseAPI('account') 
 
  const response = await b.sendPostRequest({
    path: `login/`,
    body: renamed_params,
    headers: null
  })

  console.log("LOGIN response", response);
  return response;
}
