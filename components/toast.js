import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Toast({ message, type, toaster }) {
  const [msg, setmsg] = useState(message);

  useEffect(() => {
    // console.log(message);

    toaster(showError);

    if (!message && !type) {
      return;
    }

    if (type === "success") {
      showSuccess();
      return;
    }
    if (type === "error") {
      showError();
      return;
    }
  }, [msg]);

  let showError = () => {
    toast.error(message, {
      autoClose: 5000,
    });
  };

  let showSuccess = () => {
    toast.success(message, {
      autoClose: 1000,
    });
  };

  return (
    <div className="mt-4">
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
