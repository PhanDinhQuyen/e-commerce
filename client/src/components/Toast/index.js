import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Toast({
  title,
  type = "success",
  className,
  children,
  typeBtn = "button",
  disabled = false,
}) {
  const toastType = {
    warning: {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      // pauseOnHover: true,
      draggable: true,
      progress: undefined,
    },
    success: {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      // pauseOnHover: true,
      draggable: true,
      progress: undefined,
    },
    error: {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      // pauseOnHover: true,
      draggable: true,
      progress: undefined,
    },
  };
  const notify = () => toast[type](title, toastType[type]);

  return (
    <>
      <button
        disabled={disabled}
        type={typeBtn}
        className={className}
        onClick={notify}
      >
        {children}
      </button>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        // pauseOnFocusLoss
        draggable
      />
    </>
  );
}
export default Toast;
