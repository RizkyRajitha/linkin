import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/login.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { cookieValidateLogin } from "../middleware/middleware";
const endpoint =
  process.env.NODE_ENV === "production"
    ? `${window.location.origin}`
    : "http://localhost:3000";

export async function getServerSideProps({ req, res }) {
  try {
    cookieValidateLogin(req, res);
    return { props: {} };
  } catch (error) {
    return { props: {} };
  }
}

const Admin = ({}) => {
  const router = useRouter();
  const [showmsg, setshowmsg] = useState("");
  const [loading, setloading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = async (data) => {
    setloading(true);
    console.log(data);
    setshowmsg("");
    let payload = {
      username: data.username,
      password: data.password,
    };
    console.log(payload);

    try {
      let res = await fetch(`${endpoint}/api/login`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      if (!res.success) {
        setloading(false);

        if (res.message === "invalid_credential") {
          setshowmsg("User creadentials are not valid");
        } else {
          setshowmsg("Server Error");
        }
        return;
      }
      setloading(false);

      router.push("/dashboard");

      console.log(res);
    } catch (error) {
      setloading(false);

      console.log(error);
    }
  };

  return (
    <>
      <div className="d-flex">
        {" "}
        <div className={styles.authWrapper}>
          s{" "}
          <div
            className={`${styles.authInner} col-10 col-sm-8 col-md-8 col-lg-6 col-xl-6 col-xxl-4 `}
          >
            <div hidden={!showmsg} className="alert alert-danger">
              {showmsg}
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <h3>Sign In</h3>
              <div className="mb-3 ">
                <label className="form-label">Email address</label>
                <input
                  type="text"
                  className={
                    errors.username ? "form-control is-invalid" : "form-control"
                  }
                  placeholder="Enter username"
                  {...register("username", {
                    required: "You must specify an Email address",
                  })}
                />
                {errors.username && (
                  <div className="invalid-feedback">
                    {errors.username.message}
                  </div>
                )}
              </div>
              <div class="mb-3 ">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className={
                    errors.password ? "form-control is-invalid" : "form-control"
                  }
                  placeholder="Enter Password"
                  {...register("password", {
                    required: "You must specify a password",
                  })}
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password.message}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={handleSubmit(login)}
                disabled={loading}
              >
                {loading && (
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                Login
              </button>
              {/* <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Admin;
