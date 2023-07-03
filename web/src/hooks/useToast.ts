import { toast, ToastOptions } from "react-toastify";

type ToastMessageType = "success" | "error" | "info" | "warning";

export function useToastMessage() {
  function setToastMessage(msg: string, type: ToastMessageType) {
    const options: ToastOptions = {}; // Adicione opções adicionais do Toast, se necessário

    switch (type) {
      case "success":
        toast.success(msg, options);
        break;
      case "error":
        toast.error(msg, options);
        break;
      case "info":
        toast.info(msg, options);
        break;
      case "warning":
        toast.warning(msg, options);
        break;
      default:
        toast(msg, options);
        break;
    }
  }

  return { setToastMessage };
}
