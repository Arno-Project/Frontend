import { BaseListAPI } from "./base";

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

  async editMyProfile(newInfo: any) {
    const response = await this.sendAuthorizedPutRequest({
      path: `edit/`,
      body: newInfo,
      headers: null,
      params: null,
    });

    console.info("editMyProfile", response);
    return response;
  }

  async getSpecialities() {
    const response = await this.sendAuthorizedGetRequest({
      path: "speciality/",
      body: null,
      headers: null,
      params: null,
    });

    console.info("getSpecialities", response);
    return response;
  }

  async defineNewSpeciality(specialty: any) {
    const response = await this.sendAuthorizedPostRequest({
      path: `speciality/`,
      body: specialty,
      headers: null,
      params: null,
    });

    console.info("defineNewSpeciality", response);
    return response;
  }

  async addSpeciality(specialityId: number) {
    const response = await this.sendAuthorizedPostRequest({
      path: "speciality/add/",
      body: { speciality_id: specialityId },
      headers: null,
      params: null,
    });

    console.info("addSpeciality", response);
    return response;
  }

  async removeSpeciality(specialityId: number) {
    const response = await this.sendAuthorizedDeleteRequest({
      path: "speciality/add/",
      body: { speciality_id: specialityId },
      headers: null,
      params: null,
    });

    console.info("removeSpeciality", response);
    return response;
  }

  async confirmSpecialist(specialistId: number) {
    const response = await this.sendAuthorizedPostRequest({
      path: "specialist/confirm/",
      body: { specialist_id: specialistId },
      headers: null,
      params: null,
    });

    console.info("confirmSpecialist", response);
    return response;
  }
}
