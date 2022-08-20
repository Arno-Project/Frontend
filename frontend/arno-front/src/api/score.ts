import { BaseListAPI } from "./base";

export class ScoreAPI extends BaseListAPI {
  protected static instance: ScoreAPI;

  private constructor(base_path: string = "feedback") {
    super(base_path, "score/");
  }

  public static getInstance(): ScoreAPI {
    if (!ScoreAPI.instance) {
      ScoreAPI.instance = new ScoreAPI();
    }
    return ScoreAPI.instance;
  }

  async createScorePolicy(body: any) {
    const response = await this.sendAuthorizedPostRequest({
      path: "score/policy/",
      body: body,
      headers: null,
      params: null,
    });

    console.info("createScorePolicy", response);
    return response;
  }

  async getScorePolicies(policyId: string = "") {
    const response = await this.sendAuthorizedGetRequest({
      path: `score/policy/${policyId}`,
      body: null,
      headers: null,
      params: null,
    });

    console.info("getScorePolicies", response);
    return response;
  }

  async updateScorePolicy(policyId: number, body: any) {
    const response = await this.sendAuthorizedPutRequest({
      path: `score/policy/${policyId}/`,
      body: body,
      headers: null,
      params: null,
    });

    console.info("updateScorePolicy", response);
    return response;
  }

  async deleteScorePolicy(policyId: number) {
    const response = await this.sendAuthorizedDeleteRequest({
      path: `score/policy/${policyId}/`,
      body: null,
      headers: null,
      params: null,
    });

    console.info("deleteScorePolicies", response);
    return response;
  }
}
