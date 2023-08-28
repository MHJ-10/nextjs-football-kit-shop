import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Toast() {
  return (
    <ToastContainer
      autoClose={2000}
      bodyClassName={() => "font-lalezar text-c4 text-lg flex mt-3 h-6"}
      theme="colored"
      position="top-center"
      rtl={true}
    />
  );
}

export default Toast;
