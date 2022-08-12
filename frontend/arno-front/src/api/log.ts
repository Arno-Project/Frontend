import { BaseListAPI } from "./base";

export class LogAPI extends BaseListAPI {
  protected static instance: LogAPI;

  private constructor(base_path: string = "log") {
    super(base_path);
  }

  public static getInstance(): LogAPI {
    if (!LogAPI.instance) {
      LogAPI.instance = new LogAPI("log");
    }

    return LogAPI.instance;
  }

  async getLogs(query: any) {
    const response = await this.sendAuthorizedGetRequest({
      path: "search/",
      body: null,
      headers: null,
      params: { q: query, timestamp: new Date().getTime() },
    });

    return response;
  }
}
