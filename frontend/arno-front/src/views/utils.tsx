import { showNotification } from "@mantine/notifications";

import { APIResponse } from "../api/base";

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
