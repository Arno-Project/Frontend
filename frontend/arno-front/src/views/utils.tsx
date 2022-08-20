import { showNotification } from "@mantine/notifications";

import { APIResponse } from "../api/base";
import { useState, useEffect } from "react";

import { Check, X } from "tabler-icons-react";

export function notifyUser(
  res: APIResponse,
  successTitle: string,
  successMessage: string
): boolean {
  if (res.success) {
    showNotification({
      title: successTitle,
      message: successMessage,
      color: "teal",
      icon: <Check size={18} />,
    });
    return true;
  }
  showNotification({
    title: "خطا",
    message: res.error!["error" as keyof object],
    color: "red",
    icon: <X size={18} />,
  });
  return false;
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
