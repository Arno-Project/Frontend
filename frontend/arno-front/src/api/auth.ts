import { BASE_URL } from "./base";
import { UserRole } from "../models";
import axios from "axios";

const sendPostRequest = async (url: string, body: any) => {
  try {
    const res = await axios.post(url, body);
    const { data } = res;
    return { success: true, ...data };
  } catch (error: any) {
    if (error.code === "ERR_NETWORK") {
      return {
        success: false,
        error: "در ارتباط با سرور خطایی رخ داد. مجددا تلاش کنید..",
      };
    } else {
      return {
        success: false,
        error: error.response.data[Object.keys(error.response.data)[0]][0],
      };
    }
  }
};

export async function callRegister(params: any, role: UserRole) {
  let url = `${BASE_URL}/account/register/${role}/`;

  const renamed_params = {
    first_name: params["firstName"],
    last_name: params["lastName"],
    email: params["email"],
    username: params["email"],
    phone: params["phone"],
    password: params["password"],
    specialities: params["specialities"],
  };

  const response = await sendPostRequest(url, renamed_params);
  console.log("SIGNUP response", response);

  return response;
}

export async function callLogin(params: any) {
  let url = `${BASE_URL}/account/login/`;

  const renamed_params = {
    username: params["email"],
    password: params["password"],
  };

  const response = await sendPostRequest(url, renamed_params);
  console.log("LOGIN response", response);
  return response;
}
