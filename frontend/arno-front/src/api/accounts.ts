import { BASE_URL, sendGetRequest } from "./base";

export async function getMyAccount() {
  let url = `${BASE_URL}/account/my-account/`;

  const response = await sendGetRequest(url);
  console.log("get my", response)

  return response;
}
