import { Feedback, FeedbackType } from "../models";
import { BaseListAPI } from "./base";

export class FeedbackAPI extends BaseListAPI {
  protected static instance: FeedbackAPI;

  private constructor(base_path: string = "feedback") {
    super(base_path);
  }

  public static getInstance(): FeedbackAPI {
    if (!FeedbackAPI.instance) {
      FeedbackAPI.instance = new FeedbackAPI("feedback");
    }
    return FeedbackAPI.instance;
  }

  async getTechnicalFeedbacks() {
    const response = await this.sendAuthorizedGetRequest({
      path: "system/search/",
      body: null,
      headers: null,
      params: {q:{type: FeedbackType.Technical}},
    });

    console.info("getFeedbacks", response);
    return response;
  }

  async submitFeedback(feedback: Feedback) {
    const response = await this.sendAuthorizedPostRequest({
      path: "system/submit/",
      body: feedback,
      headers: null,
      params: null,
    });

    console.info("submitFeedback", response);
    return response;
  }

	async submitReply(reply: any) {
    const response = await this.sendAuthorizedPostRequest({
      path: "system/reply/submit/",
      body: reply,
      headers: null,
      params: null,
    });

    console.info("submitReply", response);
    return response;
  }
}