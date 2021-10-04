import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import styles from "../styles/form.module.css";

const ColorForm = ({ data, update, loading }) => {
  const [isGradeints, setisGradeints] = useState(false);
  const [colorWiseGradeints, setcolorWiseGradeints] = useState({});

  useEffect(() => {
    //create an object to store color state of each input (gradient or normal(hex))
    let colorWiseGradientState = {
      bgColor: data.bgColor,
      accentColor: data.accentColor,
      handlerFontColor: data.handlerFontColor,
      footerBgColor: data.footerBgColor,
      footerTextColor: data.footerTextColor,
      avatarBorderColor: data.avatarBorderColor,
      handlerDescriptionFontColor: data.handlerDescriptionFontColor,
    };

    // check whether the current value is gradient or hex
    for (const [key, value] of Object.entries(colorWiseGradientState)) {
      if (!String(value).startsWith("#")) {
        colorWiseGradientState[key] = true;
        setisGradeints(true);
      } else {
        colorWiseGradientState[key] = false;
      }
    }
    setcolorWiseGradeints(colorWiseGradientState);
  }, [data]);

  // reset the form when the gradeint switch state change
  useEffect(() => {
    reset({
      bgColor: data.bgColor,
      accentColor: data.accentColor,
      handlerFontColor: data.handlerFontColor,
      footerBgColor: data.footerBgColor,
      footerTextColor: data.footerTextColor,
      avatarBorderColor: data.avatarBorderColor,
      handlerDescriptionFontColor: data.handlerDescriptionFontColor,
    });
  }, [isGradeints]);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      bgColor: data.bgColor,
      accentColor: data.accentColor,
      handlerFontColor: data.handlerFontColor,
      footerBgColor: data.footerBgColor,
      footerTextColor: data.footerTextColor,
      avatarBorderColor: data.avatarBorderColor,
      handlerDescriptionFontColor: data.handlerDescriptionFontColor,
    },
  });

  return (
    <>
      <div className={styles.Wrapper}>
        <div
          className={`${styles.Inner} col-10 col-sm-10 col-md-10 col-lg-10 col-xl-8 col-xxl-8 `}
        >
          {" "}
          <h3>Colors</h3>
          <div className="d-flex justify-content-start mb-4">
            <div className="form-check form-switch">
              <label className="form-check-label">
                Switch to {`${!isGradeints ? "gradient" : "normal"}`} colors
              </label>
              <input
                className="form-check-input"
                type="checkbox"
                value={isGradeints}
                onChange={(e) => {
                  setisGradeints(!isGradeints);
                }}
              />
            </div>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">
                    {`Background color (${
                      colorWiseGradeints.bgColor ? "Gradient" : "Normal"
                    })`}
                  </label>
                  <input
                    type={isGradeints ? "text" : "color"}
                    className={`form-control ${
                      isGradeints ? "" : "form-control-color"
                    }`}
                    title="Choose Background color"
                    {...register("bgColor")}
                  />
                </div>{" "}
              </div>
              <div className="col">
                <div className="mb-3 ">
                  <label className="form-label">
                    {`Accent color (${
                      colorWiseGradeints.accentColor ? "Gradient" : "Normal"
                    })`}
                  </label>
                  <input
                    type={isGradeints ? "text" : "color"}
                    className={`form-control ${
                      isGradeints ? "" : "form-control-color"
                    }`}
                    title="Choose Accent color"
                    {...register("accentColor")}
                  />
                </div>{" "}
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="mb-3 ">
                  <label className="form-label">
                    {`Handler Font color (${
                      colorWiseGradeints.handlerFontColor
                        ? "Gradient"
                        : "Normal"
                    })`}
                  </label>
                  <input
                    type={isGradeints ? "text" : "color"}
                    className={`form-control ${
                      isGradeints ? "" : "form-control-color"
                    }`}
                    title="Choose handler Font color"
                    {...register("handlerFontColor")}
                  />
                </div>{" "}
              </div>
              <div className="col">
                <div className="mb-3 ">
                  <label className="form-label">
                    {`Description Font color (${
                      colorWiseGradeints.handlerDescriptionFontColor
                        ? "Gradient"
                        : "Normal"
                    })`}
                  </label>
                  <input
                    type={isGradeints ? "text" : "color"}
                    className={`form-control ${
                      isGradeints ? "" : "form-control-color"
                    }`}
                    title="Choose Description Font color"
                    {...register("handlerDescriptionFontColor")}
                  />
                </div>{" "}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="mb-3 ">
                  <label className="form-label">
                    {`Footer Font color (${
                      colorWiseGradeints.footerTextColor ? "Gradient" : "Normal"
                    })`}
                  </label>
                  <label className="form-label"> </label>
                  <input
                    type={isGradeints ? "text" : "color"}
                    className={`form-control ${
                      isGradeints ? "" : "form-control-color"
                    }`}
                    title="Choose handler Font color"
                    {...register("footerTextColor")}
                  />
                </div>{" "}
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">
                    {`Footer Background color (${
                      colorWiseGradeints.footerBgColor ? "Gradient" : "Normal"
                    })`}
                  </label>
                  <input
                    type={isGradeints ? "text" : "color"}
                    className={`form-control ${
                      isGradeints ? "" : "form-control-color"
                    }`}
                    title="Choose handler Font color"
                    {...register("footerBgColor")}
                  />
                </div>{" "}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="mb-3 ">
                  <label className="form-label">
                    {`Avatar Border color (${
                      colorWiseGradeints.avatarBorderColor
                        ? "Gradient"
                        : "Normal"
                    })`}
                  </label>
                  <input
                    type={isGradeints ? "text" : "color"}
                    className={`form-control ${
                      isGradeints ? "" : "form-control-color"
                    }`}
                    title="Choose Avatar Border color"
                    {...register("avatarBorderColor")}
                  />
                </div>{" "}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={handleSubmit(update)}
              disabled={loading}
            >
              {loading && (
                <span
                  className="spinner-border spinner-border-sm me-1"
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
