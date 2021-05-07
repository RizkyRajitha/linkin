// import styles from "../styles/dashboard.module.css";

import { parse } from "cookie";
import { parseSecureToken } from "../lib/crypto";
import { getPageData } from "../lib/dbfunc";
import styles from "../styles/dashboard.module.css";
import Home from "./homeview";
export async function getServerSideProps({ req, res }) {
  let data = false; //await data.json();
  let cookie = req.headers?.cookie;
  if (!cookie) {
    // res.send({ success: false, message: "no cookie error" });
    res.setHeader("location", "/admin");
    res.statusCode = 302;
    res.end();
    return;
    // return { props: { data } };
  }

  let token = parse(cookie)["linkin.auth"];
  console.log(token);
  let decodedToken = parseSecureToken(token);

  if (!decodedToken) {
    // res.send({ success: false, message: "auth token error" });
    res.setHeader("location", "/admin");
    res.statusCode = 302;
    res.end();
    return;
  }

  data = await getPageData();
  console.log(data);

  return { props: { data } };
}

const Admin = ({ data }) => {
  return (
    <>
      <div className="d-flex">
        {" "}
        {console.log(data)}
        <div className={styles.Wrapper}>
          s{" "}
          <div
            className={`${styles.Inner} col-10 col-sm-8 col-md-8 col-lg-6 col-xl-6 col-xxl-4 `}
          >
            {/* <div hidden={!showmsg} className="alert alert-danger">
              {showmsg}
            </div> */}
            <form onSubmit={(e) => e.preventDefault()}>
              <h3>Sign In</h3>
              <div className="mb-3 ">
                <label className="form-label">Email address</label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  // className={
                  //   errors.email ? "form-control is-invalid" : "form-control"
                  // }
                  placeholder="Enter email"
                  // ref={register({
                  //   required: "You must specify an Email address",
                  //   pattern: {
                  //     value: RegExp(
                  //       /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  //     ),
                  //     message: "You must specify an valid Email address",
                  //   },
                  // })}
                />
                {/* {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )} */}
              </div>
              <div class="mb-3 ">
                <label className="form-label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  // className={
                  //   errors.password ? "form-control is-invalid" : "form-control"
                  // }
                  // placeholder="Enter Password"
                  // ref={register({
                  //   required: "You must specify a password",
                  // })}
                />
                {/* {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password.message}
                  </div>
                )} */}
              </div>

              {/* <button class="btn btn-primary" type="button" disabled>
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </button> */}

              <button
                type="submit"
                className="btn btn-primary btn-block"
                // onClick={handleSubmit(login)}
                // disabled={loading}
              >
                {/* {loading && (
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )} */}
                Login
              </button>
              {/* <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p> */}
            </form>
          </div>
        </div>
        <div className={styles.Wrapper}>
          <Home {...data} />
        </div>
      </div>
    </>
  );
};
export default Admin;
