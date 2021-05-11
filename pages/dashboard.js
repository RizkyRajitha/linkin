// import styles from "../styles/dashboard.module.css";

import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import { getPageData } from "../lib/dbfunc";
import { cookieValidate } from "../middleware/middleware";

import styles from "../styles/dashboard.module.css";
import Home from "./homeview";

export async function getServerSideProps({ req, res }) {
  try {
    cookieValidate(req, res);
    let data = await getPageData();
    console.log(data);
    return { props: { data } };
  } catch (error) {
    return { props: { error } };
  }
}

const Admin = ({ data }) => {
  const [showmsg, setshowmsg] = useState("");
  const [loading, setloading] = useState(false);
  const [pageData, setpageData] = useState(data);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // const watchAllFields = watch();

  // useEffect(() => {
  //   let prePageData = { ...pageData };

  //   let keys = Object.keys(watchAllFields);

  //   keys.map((x) => {
  //     prePageData[x] = watchAllFields[x];
  //   });

  //   setpageData(prePageData);
  // }, [watchAllFields]);

  // useWatch();

  // form;

  const save = async (data) => {
    console.log(data);
    // console.log(watchAllFields);
    let prePageData = { ...pageData };

    let keys = Object.keys(data);

    keys.map((x) => {
      prePageData[x] = data[x];
    });
    console.log(prePageData);

    setpageData(prePageData);
  };

  return (
    <>
      <div className="d-flex">
        {" "}
        {/* {console.log(data)} */}
        <div className={styles.Wrapper}>
          <div
            className={`${styles.Inner} col-10 col-sm-8 col-md-8 col-lg-6 col-xl-6 col-xxl-4 `}
          >
            {/* <div hidden={!showmsg} className="alert alert-danger">
              {showmsg}
            </div> */}
            <form onSubmit={(e) => e.preventDefault()}>
              <h3>Edit</h3>
              <div className="mb-3 ">
                <label className="form-label">Handler name</label>
                <input
                  type="text"
                  className={
                    errors.handlerText
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  placeholder="Enter Handler name"
                  {...register("handlerText", {
                    required: "You must specify an Email address",
                  })}
                />
                {errors.handlerText && (
                  <div className="invalid-feedback">
                    {errors.handlerText.message}
                  </div>
                )}
              </div>
              <div className="mb-3 ">
                <label className="form-label">Handler link</label>
                <input
                  type="text"
                  className={
                    errors.handlerlink
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  placeholder="Enter Handler link"
                  {...register("handlerlink")}
                />
                {errors.handlerlink && (
                  <div className="invalid-feedback">
                    {errors.handlerlink.message}
                  </div>
                )}
              </div>{" "}
              <div className="mb-3 ">
                <label className="form-label">Footer text</label>
                <input
                  type="text"
                  className={
                    errors.footerText
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  placeholder="Enter Footer text"
                  {...register("footerText")}
                />
              </div>{" "}
              <div className="mb-3 ">
                <label className="form-label">Background color</label>

                <input
                  type="color"
                  className="form-control form-control-color"
                  value="#563d7c"
                  title="Choose Background color"
                  {...register("bgColor")}
                />

                {/* <input
                  type="text"
                  className={
                    errors.bgColor ? "form-control is-invalid" : "form-control"
                  }
                  placeholder="Enter Background color"
                  {...register("bgColor")}
                /> */}
              </div>{" "}
              <div className="mb-3 ">
                <label className="form-label">Accent color </label>
                <input
                  type="color"
                  className="form-control form-control-color"
                  value="#563d7c"
                  title="Choose Accent color"
                  {...register("accentColor")}
                />
              </div>{" "}
              {/* <div className="mb-3 ">
                <label className="form-label">Handler name</label>
                <input
                  type="text"
                  className={
                    errors.handlername
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  placeholder="Enter Handler name"
                  {...register("handlername")}
                />
              </div>{" "}
              <div className="mb-3 ">
                <label className="form-label">Handler name</label>
                <input
                  type="text"
                  className={
                    errors.handlername
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  placeholder="Enter Handler name"
                  {...register("handlername")}
                />
              </div> */}
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
                onClick={handleSubmit(save)}
                // disabled={loading}
              >
                {/* {loading && (
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )} */}
                Save
              </button>
              {/* <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p> */}
            </form>
          </div>
        </div>
        <div className={styles.Wrapper}>
          <Home {...pageData} />
        </div>
      </div>
    </>
  );
};
export default Admin;
