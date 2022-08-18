import { BaseAPI } from "./base";
import { UserRole } from "../models";

export class AuthAPI extends BaseAPI {
  protected static instance: AuthAPI;

  private constructor(base_path: string = "account") {
    super(base_path);
  }

  public static getInstance(): AuthAPI {
    if (!AuthAPI.instance) {
      AuthAPI.instance = new AuthAPI("account");
    }

    return AuthAPI.instance;
  }

  async login(username:string, password:string) {
    const renamed_params = {
      username: username,
      password:password
    };
  
    const response = await this.sendPostRequest({
      path: `login/`,
      body: renamed_params,
      headers: null,
      params: null,
    });


    console.info("LOGIN", response);
    return response;
  }

  async register(params: any, role: UserRole) {
    const renamed_params = {
      first_name: params["firstName"],
      last_name: params["lastName"],
      email: params["email"],
      username: params["username"],
      phone: params["phone"],
      password: params["password"],
      specialities: params["specialities"],
    };

    console.log(renamed_params)

    const response = await this.sendPostRequest({
      path: `register/${role}/`,
      body: renamed_params,
      headers: null,
      params: null,
    });

    console.info("SIGNUP", response);
    return response;
  }

  async registerManager(params: any, role: UserRole) {
    const renamed_params = {
      first_name: params["firstName"],
      last_name: params["lastName"],
      email: params["email"],
      username: params["username"],
      phone: params["phone"],
      password: params["password"],
    };

    console.log(renamed_params)

    const response = await this.sendAuthorizedPostRequest({
      path: `manager/register/${role}/`,
      body: renamed_params,
      headers: null,
      params: null,
    });

    console.info("SIGNUPMAN", response);
    return response;
  }

  async logout() {
    const response = await this.sendAuthorizedPostRequest({
      path: `logout/`,
      body: {},
      headers: null,
      params: null,
    });

    console.info("LOGOUT", response);
    return response;
  }
}
