import { useForm } from "react-hook-form";

import styles from "../styles/form.module.css";

const FontForm = ({ data, update, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: data });

  // console.log(data);

  return (
    <>
      <div className={styles.Wrapper}>
        <div
          className={`${styles.Inner} col-10 col-sm-10 col-md-10 col-lg-10 col-xl-8 col-xxl-8 `}
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <h3>Footer Details</h3>
            <div className="form-check form-switch d-grid gap-2 d-md-flex justify-content-md-end">
              <input
                className="form-check-input"
                type="checkbox"
                {...register(`footerEnabled`)}
              />
            </div>
            <div className="mb-3 ">
              <label className="form-label">Footer Font Size</label>
              <div className="input-group mb-3">
                <input
                  type="number"
                  className={
                    errors.footerTextSize
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  placeholder="Enter handler font size"
                  {...register("footerTextSize", {
                    min: { message: "Font Size must be above 1px", value: 1 },
                  })}
                />{" "}
                <span className="input-group-text">px</span>
              </div>
              {errors.footerTextSize && (
                <div className="invalid-feedback">
                  {errors.footerTextSize.message}
                </div>
              )}
            </div>
            <div className="mb-3 ">
              <label className="form-label">Footer text</label>
              <input
                type="text"
                className={
                  errors.footerText ? "form-control is-invalid" : "form-control"
                }
                placeholder="Enter Footer text"
                {...register("footerText")}
              />
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
export default FontForm;
