import { BaseListAPI } from "./base";

export class CoreAPI extends BaseListAPI {
  protected static instance: CoreAPI;

  private constructor(base_path: string = "core") {
    super(base_path);
  }

  public static getInstance(): CoreAPI {
    if (!CoreAPI.instance) {
      CoreAPI.instance = new CoreAPI("core");
    }

    return CoreAPI.instance;
  }

  async getAllRequestsSummary() {
    const response = await this.sendAuthorizedGetRequest({
      path: "request/search/",
      body: null,
      headers: null,
      params: {q:{}},
    });

    console.info("getMyRequestsStats", response);
    return response;
  }

  async getMyRequestsStatus() {
    const response = await this.sendAuthorizedGetRequest({
      path: "request/status/",
      body: null,
      headers: null,
      params: null,
    });

    console.info("getMyRequestsStats", response);
    return response;
  }

  async submitRequest(requestBody: any) {
    const response = await this.sendAuthorizedPostRequest({
      path: "request/submit/",
      body: requestBody,
      headers: null,
      params: null,
    });

    console.info("submitRequest", response);
    return response;
  }

  async cancelRequestByManager(request_id: number) {
    const response = await this.sendAuthorizedPostRequest({
      path: "request/cancel/force/",
      body: { request_id },
      headers: null,
      params: null,
    });

    console.info("cancelRequest", response);
    return response;
  }
}
