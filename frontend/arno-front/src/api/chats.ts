import { Feedback, FeedbackType, User } from "../models";
import { BaseListAPI } from "./base";

export class ChatsAPI extends BaseListAPI {
  protected static instance: ChatsAPI;

  private constructor(base_path: string = "chats") {
    super(base_path);
  }

  public static getInstance(): ChatsAPI {
    if (!ChatsAPI.instance) {
        ChatsAPI.instance = new ChatsAPI("chats");
    }
    return ChatsAPI.instance;
  }

  async getUserChatsList() {
    const response = await this.sendAuthorizedGetRequest({
      path: `all/`,
      body: null,
      headers: null,
      params: null,
    });

    console.info("getChats", response);
    return response;
  }

  async getUserChatsWithPeer(peerId: number) {
    const response = await this.sendAuthorizedGetRequest({
      path: `all/${peerId}/`,
      body: null,
      headers: null,
      params: null,
    });

    console.info("getMsgs", response);
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

}
