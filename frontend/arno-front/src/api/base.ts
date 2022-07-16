import axios from "axios";

export const BASE_URL = "http://localhost:8000/api";

const sendGetRequest = async (url: string) => {
  const token = window.localStorage.getItem("token");
  console.log(token);

  try {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Authorization: `Token ${token}`,
      },
    };

    const res = await axios.get(url, config);
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
        error: error.response.data,
      };
    }
  }
};
export { sendGetRequest };


interface APIRequest {
  path: string
  body: object|null
  header: object|null
}


interface APIResponse{
  success: boolean
  data: object|null
  error: string
}

abstract class BaseAPI {
  base_url: string = BASE_URL
  base_path: string

  constructor(base_url: string, base_path: string) {
    this.base_url = base_url;
    this.base_path = base_path
  }
  
  async sendGetRequest(r: APIRequest) : Promise<APIResponse> {
    
      try {
        const config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            ...r.header
          },
        };
    
        const url = `${this.base_url}${this.base_path}${r.path}`
        const res = await axios.get(url, config);

        const { data } = res;
        return { 
          success: true, 
          data: data ,
          error: ""
        };
      } catch (error: any) {
        if (error.code === "ERR_NETWORK") {
          return {
            success: false,
            data: null,
            error: "در ارتباط با سرور خطایی رخ داد. مجددا تلاش کنید..",
          }
        } else {
          return {
            data: null,
            success: false,
            error: error.response.data,
          };
        }
      }
  }
  async sendAuthorizedGetRequest(r: APIRequest) : Promise<APIResponse> {
      const token = window.localStorage.getItem("token");
      r.header = {...r.header, Authorization: `Token ${token}`}
      return this.sendGetRequest(r)
  }
}
