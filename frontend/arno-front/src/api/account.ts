import { BASE_URL } from "./base";
import axios from "axios";

const sendRequest = async (url: string, body: any) => {
  try {
    const res = await axios.post(url, body);
    const { data } = res;
    console.log("AAA", data);
    return { success: true, ...data };
  } catch (error: any) {
    console.log(error.response.data);
    return {
      success: false,
      error: error.response.data[Object.keys(error.response.data)[0]][0],
    };
  }
};

export async function sendSignUpRequest(params: any, role: string) {
  let url = `${BASE_URL}/account/register/${role}/`;

  const renamed_params = {
    first_name: params["firstName"],
    last_name: params["lastName"],
    email: params["email"],
    username: params["email"],
    phone: params["phone"],
    password: params["password"],
    specialities: params["specialities"]
  };

  const response = await sendRequest(url, renamed_params);
  return response;
}

export async function sendLoginRequest(params: any) {
  let url = `${BASE_URL}/account/login/`;

  const renamed_params = {
    username: params["email"],
    password: params["password"],
  };

  const response = await sendRequest(url, renamed_params);
  return response;
}
