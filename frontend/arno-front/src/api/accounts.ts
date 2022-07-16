import { BASE_URL, BaseAPI } from "./base";

export async function getMyAccount() {
  let url = `${BASE_URL}/account/my-account/`;

  const b = new BaseAPI('account') 
 
  const response = await b.sendAuthorizedGetRequest({
    path: 'my-account/',
    body: null,
    headers: null
  })
  
  console.info("getMyAccount", response)

  return response;
}
