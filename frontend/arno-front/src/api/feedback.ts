import { Feedback, FeedbackType } from "../models";
import { BaseListAPI } from "./base";

export class SystemFeedbackAPI extends BaseListAPI {
  protected static instance: SystemFeedbackAPI;

  private constructor(base_path: string = "feedback") {
    const get_path = "system/search/";
    super(base_path, get_path);
  }

  public static getInstance(): SystemFeedbackAPI {
    if (!SystemFeedbackAPI.instance) {
      SystemFeedbackAPI.instance = new SystemFeedbackAPI("feedback");
    }
    return SystemFeedbackAPI.instance;
  }

  async getNonTechnicalFeedbacks() {
    const response = await this.sendAuthorizedGetRequest({
      path: "system/search/",
      body: null,
      headers: null,
      params: { q: { "-type": FeedbackType.Technical } },
    });

    console.info("getFeedbacks", response);
    return response;
  }

  async markAsRead(ids: number[]) {
    const response = await this.sendAuthorizedPostRequest({
      path: "system/search/",
      body: { ids: ids },
      headers: null,
      params: null,
    });

    console.info("markAsRead", response);
    return response;
  }

  async getTechnicalFeedbacks() {
    const response = await this.sendAuthorizedGetRequest({
      path: "system/search/",
      body: null,
      headers: null,
      params: { q: { type: FeedbackType.Technical } },
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

export class FeedbackAPI extends BaseListAPI {
  protected static instance: FeedbackAPI;

  private constructor(base_path: string = "feedback/request") {
    super(base_path, "");
  }

  public static getInstance(): FeedbackAPI {
    if (!FeedbackAPI.instance) {
      FeedbackAPI.instance = new FeedbackAPI("feedback/request");
    }
    return FeedbackAPI.instance;
  }
}
