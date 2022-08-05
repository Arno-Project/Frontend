import { Feedback, FeedbackType, User } from "../models";
import { BaseListAPI } from "./base";

export class NotificationAPI extends BaseListAPI {
  protected static instance: NotificationAPI;

  private constructor(base_path: string = "notification") {
    super(base_path, "");
  }

  public static getInstance(): NotificationAPI {
    if (!NotificationAPI.instance) {
      NotificationAPI.instance = new NotificationAPI("notification");
    }
    return NotificationAPI.instance;
  }

  async markAsRead(notificationIds: number[]) {
    const response = await this.sendAuthorizedPostRequest({
      path: "",
      body: { ids: notificationIds },
      headers: null,
      params: null,
    });

    console.info("markAsRead", response);
    return response;
  }
}
