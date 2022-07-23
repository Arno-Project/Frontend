import { BaseAPI, BaseListAPI } from "./base";

export class AccountAPI extends BaseListAPI {
  protected static instance: AccountAPI;

  private constructor(base_path: string = "account") {
    super(base_path);
  }

  public static getInstance(): AccountAPI {
    if (!AccountAPI.instance) {
      AccountAPI.instance = new AccountAPI("account");
    }

    return AccountAPI.instance;
  }

  async getMyAccount() {
    const response = await this.sendAuthorizedGetRequest({
      path: "my-account/",
      body: null,
      headers: null,
      params: null,
    });

    console.info("getMyAccount", response);
    return response;
  }
}
