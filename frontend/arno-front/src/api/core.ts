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

  async getRequestsSummary(query: any) {
    const response = await this.sendAuthorizedGetRequest({
      path: "request/search/",
      body: null,
      headers: null,
      params: { q: query, timestamp: new Date().getTime() },
    });

    return response;
  }

  async getAllRequestsSummary() {
    const response = await this.getRequestsSummary({});

    console.info("getMyRequestsStats", response);
    return response;
  }

  async getRequestDetails(requestId: string) {
    const response = await this.getRequestsSummary({ id: requestId });

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

  async cancelRequest(request_id: number) {
    const response = await this.sendAuthorizedPostRequest({
      path: "request/cancel/",
      body: { request_id },
      headers: null,
      params: null,
    });

    console.info("cancelRequest", response);
    return response;
  }

  async cancelRequestByManager(request_id: number) {
    const response = await this.sendAuthorizedPostRequest({
      path: "request/cancel/force/",
      body: { request_id },
      headers: null,
      params: null,
    });

    console.info("cancelRequestByManager", response);
    return response;
  }

  async submitLocation(location: any) {
    const response = await this.sendAuthorizedPostRequest({
      path: "location/",
      body: location,
      headers: null,
      params: null,
    });

    console.info("submitLocation", response);
    return response;
  }

  async acceptOrRejectSpecialist(requestID: number, is_accept: boolean) {
    const response = await this.sendAuthorizedPostRequest({
      path: "request/accept/customer/final/",
      body: {
        request_id: requestID,
        is_accept: is_accept ? "1" : "0",
      },
      headers: null,
      params: null,
    });

    return response;
  }
  async chooseSpecialist(requestID: number, specialistUserID: number) {
    const response = await this.sendAuthorizedPostRequest({
      path: "request/select/specialist/",
      body: {
        request_id: requestID,
        specialist_id: specialistUserID,
      },
      headers: null,
      params: null,
    });

    return response;
  }

  async acceptOrRejectCustomerRequest(requestID: number, is_accept: boolean) {
    const response = await this.sendAuthorizedPostRequest({
      path: "request/accept/specialist/final/",
      body: {
        request_id: requestID,
        is_accept: is_accept ? "1" : "0",
      },
      headers: null,
      params: null,
    });

    return response;
  }

  async selectRequestBySpecialist(requestID: number) {
    const response = await this.sendAuthorizedPostRequest({
      path: "request/accept/specialist/initial/",
      body: {
        request_id: requestID,
      },
      headers: null,
      params: null,
    });

    return response;
  }

  async endRequest(requestID: number) {
    const response = await this.sendAuthorizedPostRequest({
      path: "request/accept/specialist/initial/",
      body: {
        request_id: requestID,
      },
      headers: null,
      params: null,
    });

    return response;
  }

  async getRequestPopularityReport(query: any) {
    const response = await this.sendAuthorizedGetRequest({
      path: "request/popularity/",
      body: null,
      headers: null,
      params: { q: query },
    });

    console.info("getRequestPopularityReport", response);
    return response;
  }
}
