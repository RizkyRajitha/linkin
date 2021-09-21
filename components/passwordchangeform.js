import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

import styles from "../styles/form.module.css";

const endpoint =
  process.env.NODE_ENV === "production" ? `` : "http://localhost:3000";

const PasswordChangeForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const [loading, setloading] = useState(false);

  const password = useRef({});
  password.current = watch("newPassword", "");

  const updatePassword = async (data) => {
    console.log(data);
    setloading(true);

    try {
      let res = await fetch(`${endpoint}/api/changepassword`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      if (!res.success) {
        toast.error(`Error : ${res.msg}`, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        reset();
        setloading(false);
        return;
      }

      toast.success(`successfully updated password`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      await logout();
    } catch (error) {
      console.log(error);
      reset();
      toast.error(`Error : ${error.message}`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setloading(false);
  };

  const logout = async () => {
    try {
      let res = await fetch(`${endpoint}/api/logout`).then((res) => res.json());
      console.log(res);

      if (res.success) {
        router.push("/admin");
      }
    } catch (error) {
      toast.error(`Logout Error  : ${error.message}`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <div className={styles.Wrapper}>
        <div
          className={`${styles.Inner} col-10 col-sm-10 col-md-10 col-lg-10 col-xl-8 col-xxl-8 `}
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <h3>Updated Password</h3>
            <div className="mb-3 ">
              <label className="form-label">Current Password</label>
              <input
                type="password"
                className={
                  errors.currentPassword
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="Enter Current Password"
                {...register("currentPassword")}
              />
              {errors.currentPassword && (
                <div className="invalid-feedback">
                  {errors.currentPassword.message}
                </div>
              )}
            </div>
            <div className="mb-3 ">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className={
                  errors.newPassword
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="Enter New Password"
                {...register("newPassword", {
                  required: "You must specify a password",
                  minLength: {
                    value: 6,
                    message: "Password must have at least 6 characters",
                  },
                })}
              />
              {errors.newPassword && (
                <div className="invalid-feedback">
                  {errors.newPassword.message}
                </div>
              )}
            </div>
            <div className="mb-3 ">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className={
                  errors.confirm_password
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="Enter New Password"
                {...register("confirm_password", {
                  validate: (value) => {
                    return (
                      value === password.current || "The passwords do not match"
                    );
                  },
                })}
              />{" "}
              {errors.confirm_password && (
                <div className="invalid-feedback">
                  {errors.confirm_password.message}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={handleSubmit(updatePassword)}
              disabled={loading}
            >
              {loading && (
                <span
                  className="spinner-border spinner-border-sm me-1"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              Change Password
            </button>
          </form>
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </>
  );
};
export default PasswordChangeForm;
