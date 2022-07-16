import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

const NETWORK_ERROR_MSG = {
  custom_errors: "در ارتباط با سرور خطایی رخ داد. مجددا تلاش کنید.",
};

interface APIRequest {
  path: string;
  body: object | null;
  headers: object | null;
}

interface APIResponse {
  success: boolean;
  data: object | null;
  error: object | null;
}

class BaseAPI {
  private base_url: string;
  private base_path: string;

  constructor(base_path: string) {
    this.base_url = BASE_URL;
    this.base_path = base_path;
  }

  async sendGetRequest(r: APIRequest): Promise<APIResponse> {
    try {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          ...r.headers,
        },
      };

      const url = `${this.base_url}/${this.base_path}/${r.path}`;
      const res = await axios.get(url, config);

      const { data } = res;
      return {
        success: true,
        data: data,
        error: {},
      };
    } catch (error: any) {
      if (error.code === "ERR_NETWORK") {
        return {
          success: false,
          data: null,
          error: NETWORK_ERROR_MSG,
        };
      } else {
        return {
          data: null,
          success: false,
          error: error.response.data,
        };
      }
    }
  }

  async sendAuthorizedGetRequest(r: APIRequest): Promise<APIResponse> {
    const token = window.localStorage.getItem("token");
    r.headers = { ...r.headers, Authorization: `Token ${token}` };
    return this.sendGetRequest(r);
  }

  async sendPostRequest(r: APIRequest): Promise<APIResponse> {
    try {
      const config = {
        headers: {
          ...r.headers,
        },
      };

      const url = `${this.base_url}/${this.base_path}/${r.path}`;
      const res = await axios.post(url, r.body, config);

      const { data } = res;
      return {
        success: true,
        data: data,
        error: {},
      };
    } catch (error: any) {
      console.warn(error);
      if (error.code === "ERR_NETWORK") {
        return {
          success: false,
          data: null,
          error: NETWORK_ERROR_MSG,
        };
      } else {
        return {
          data: null,
          success: false,
          error: error.response.data,
        };
      }
    }
  }

  async sendAuthorizedPostRequest(r: APIRequest): Promise<APIResponse> {
    const token = window.localStorage.getItem("token");
    r.headers = { ...r.headers, Authorization: `Token ${token}` };
    return this.sendPostRequest(r);
  }
}

export { BASE_URL, BaseAPI };
