import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import styles from "../styles/genaralform.module.css";

const endpoint =
  process.env.NODE_ENV === "production" ? `` : "http://localhost:3000";

const ColorForm = ({ data, update }) => {
  const router = useRouter();

  const [showmsg, setshowmsg] = useState("");
  const [loading, setloading] = useState(false);
  const [pageData, setpageData] = useState(data);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ defaultValues: data });

  // watch((data, { name, type }) => {
  //   console.log(data, name, type);

  //   let prePageData = { ...pageData };

  //   let keys = Object.keys(data);

  //   keys.map((x) => {
  //     prePageData[x] = data[x];
  //   });

  //   setpageData(prePageData);
  // });

  // const watchAllFields = watch();

  // useEffect(() => {
  // let prePageData = { ...pageData };

  // let keys = Object.keys(watchAllFields);

  // keys.map((x) => {
  //   prePageData[x] = watchAllFields[x];
  // });

  // setpageData(prePageData);
  // }, [watchAllFields]);

  // useWatch();

  // form;

  const save = async (data) => {
    setloading(true);
    setshowmsg("");
    console.log(data);
    let prePageData = { ...pageData };

    let keys = Object.keys(data);

    keys.map((item) => {
      prePageData[item] = data[item];
    });

    console.log(prePageData);

    try {
      let res = await fetch(`${endpoint}/api/updatepagedata`, {
        method: "POST",
        body: JSON.stringify(prePageData),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      if (!res.success) {
        if (res.message === "invalid_credential") {
          setshowmsg("User creadentials are not valid");
        } else {
          setshowmsg("Server Error");
        }
        return;
      }
      setloading(false);
      update(res.updatedPageData);
      console.log(res);
      // setshowmsg("updated");
      setpageData(res.updatedPageData);
    } catch (error) {
      setloading(false);
      console.log(error);
      setshowmsg("Server Error " + error.message);
    }
  };

  return (
    <>
      {/* <div className="d-flex"> */}
      <div className={styles.Wrapper}>
        <div
          className={`${styles.Inner} col-10 col-sm-8 col-md-8 col-lg-6 col-xl-6 col-xxl-6 `}
        >
          {/* {console.log(errors)} */}
          <div hidden={!showmsg} className="alert alert-danger">
            {showmsg}
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <h3>Colors</h3>
            <div className="mb-3 ">
              <label className="form-label">Background color</label>

              <input
                type="color"
                className="form-control form-control-color"
                // value="#563d7c"
                title="Choose Background color"
                {...register("bgColor")}
              />
            </div>{" "}
            <div className="mb-3 ">
              <label className="form-label">Accent color </label>
              <input
                type="color"
                className="form-control form-control-color"
                // value="#563d7c"
                title="Choose Accent color"
                {...register("accentColor")}
              />
            </div>{" "}
            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={handleSubmit(save)}
              disabled={loading}
            >
              {loading && (
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default ColorForm;
