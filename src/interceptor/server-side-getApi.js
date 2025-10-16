import { BaseURL } from "@/resources/utils/helper";
import { handleDecrypt } from "@/resources/utils/helper";
// import { TOKEN_COOKIE_NAME } from "@/resources/utils/cookie";
import Cookies from "js-cookie";

export const getApi = async (endpoint = "") => {
  //   const value = Cookies.get(ACCESS_TOKEN);
  //   const accessToken = value && handleDecrypt(value);
  const accessToken = handleDecrypt(Cookies.get("_xpdx"));

  try {
    const response = await fetch(BaseURL(endpoint), {
      method: "GET",
      headers: {
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }

    return await response.json();
  } catch (error) {
    return null;
  }
};
