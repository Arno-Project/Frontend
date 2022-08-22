import axios from "axios";

const BASE_HOST = process.env.REACT_APP_BASE_HOST || "http://localhost:8000";
const BASE_URL = `${BASE_HOST}/api`;

const NETWORK_ERROR_MSG = {
  error: "در ارتباط با سرور خطایی رخ داد. مجددا تلاش کنید.",
};

export enum FieldFilterType {
  Exact,
  Contains,
}

export enum FieldFilterName {
  Role = "role",
  Speciality = "speciality",
  RequestID = "request_id",
  Name = "name",
  Phone = "phone",
  Email = "email",
  Roles = "roles",
  Sort = "sort",
  Status = "status",
  Customer = "customer",
  Specialist = "specialist",
  DateRange = "dateRange",
  UserID="user_id"
}

export class FieldFilter {
  name: string;
  value: string | string[] | {id:string} | {name: string};
  type: FieldFilterType;

  constructor(name: string, value: any, type: FieldFilterType) {
    this.name = name;
    this.value = value;
    this.type = type;
  }

  get_pair(): any[] {
    if (Array.isArray(this.value)) {
      return [this.name, this.value.join(",")];
    }
    return [this.name, this.value];
  }
}

export type APIRequest = {
  path: string;
  body: object | null;
  headers: object | null;
  params: object | null;
};

export type APIResponse = {
  success: boolean;
  data: object | null;
  error: object | null;
};

abstract class BaseAPI {
  private base_url: string = BASE_URL;
  private base_path: string;

  constructor(base_path: string) {
    this.base_path = base_path;
  }

  async sendGetRequest(r: APIRequest): Promise<APIResponse> {
    try {
      const config = {
        params: {
          ...r.params,
        },
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

  async sendDeleteRequest(r: APIRequest): Promise<APIResponse> {
    try {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          ...r.headers,
        },
        data: r.body,
      };

      const url = `${this.base_url}/${this.base_path}/${r.path}`;
      const res = await axios.delete(url, config);

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

  async sendPutOrPostRequest(
    r: APIRequest,
    axiosMethod: any
  ): Promise<APIResponse> {
    try {
      const config = {
        params: {
          ...r.params,
        },
        headers: {
          ...r.headers,
        },
      };

      const url = `${this.base_url}/${this.base_path}/${r.path}`;
      const res = await axiosMethod(url, r.body, config);

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

  async sendPostRequest(r: APIRequest): Promise<APIResponse> {
    return this.sendPutOrPostRequest(r, axios.post);
  }

  async sendPutRequest(r: APIRequest): Promise<APIResponse> {
    return this.sendPutOrPostRequest(r, axios.put);
  }

  async sendAuthorizedPostRequest(r: APIRequest): Promise<APIResponse> {
    const token = window.localStorage.getItem("token");
    r.headers = { ...r.headers, Authorization: `Token ${token}` };
    return this.sendPostRequest(r);
  }

  async sendAuthorizedPutRequest(r: APIRequest): Promise<APIResponse> {
    const token = window.localStorage.getItem("token");
    r.headers = { ...r.headers, Authorization: `Token ${token}` };
    return this.sendPutRequest(r);
  }

  async sendAuthorizedDeleteRequest(r: APIRequest): Promise<APIResponse> {
    const token = window.localStorage.getItem("token");
    r.headers = { ...r.headers, Authorization: `Token ${token}` };
    return this.sendDeleteRequest(r);
  }
}

abstract class BaseListAPI extends BaseAPI {
  get_path: string;
  // add_path: string
  // edit_path: string
  // remove_path: string
  // get_report_path: string

  constructor(base_path: string, get_path: string = "all/") {
    super(base_path);
    this.get_path = get_path;
  }

  async get(fieldFilters: FieldFilter[]) {
    const paramDict = Object.fromEntries(
      fieldFilters.map((field) => field.get_pair())
    );

    console.log("param dict", paramDict);

    const response = await this.sendAuthorizedGetRequest({
      path: this.get_path,
      body: null,
      headers: null,
      params: paramDict,
    });

    return response;
  }

  async add(newItem: any) {
    const response = await this.sendAuthorizedPostRequest({
      path: this.get_path,
      body: newItem,
      headers: null,
      params: null,
    });

    return response;
  }

  async edit(itemID: number, newItem: any) {
    const response = await this.sendAuthorizedPutRequest({
      path: `${this.get_path}${itemID}/`,
      body: newItem,
      headers: null,
      params: null,
    });

    return response;
  }

  async remove(itemID: number) {
    const response = await this.sendAuthorizedDeleteRequest({
      path: `${this.get_path}${itemID}/`,
      body: null,
      headers: null,
      params: null,
    });

    return response;
  }
}

export { BASE_HOST, BASE_URL, BaseAPI, BaseListAPI };
