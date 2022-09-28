import { useState } from "react";

const useCookieManager = () => {
  const setCookie = (key: string, value: any) => {
    document.cookie = `${key}=${value}`
  }

  const getCookie = (key: string) => {
    return document.cookie
      .split("; ")
      .find((entry) => entry.startsWith(`${key}=`))
      ?.split("=")[1];
  }

  return { setCookie, getCookie };
}

export default useCookieManager;