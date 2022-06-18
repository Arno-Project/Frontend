import axios from "axios";

export const BASE_URL = "http://localhost:8000/api";

const sendGetRequest = async (url: string) => {
  const token = window.localStorage.getItem("token");
  console.log(token);

  try {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Authorization: `Token ${token}`,
      },
    };

    const res = await axios.get(url, config);
    const { data } = res;
    return { success: true, ...data };
  } catch (error: any) {
    if (error.code === "ERR_NETWORK") {
      return {
        success: false,
        error: "در ارتباط با سرور خطایی رخ داد. مجددا تلاش کنید..",
      };
    } else {
      return {
        success: false,
        error: error.response.data,
      };
    }
  }
};
export { sendGetRequest };
