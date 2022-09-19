import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastError = (message) => {
  return toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
};

export const toastSuccess = (message) => {
  return toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    pauseOnHover: false,
  });
};
