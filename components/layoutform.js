import { useForm } from "react-hook-form";

import styles from "../styles/form.module.css";

const LayoutForm = ({ data, update, loading }) => {
  const { register, handleSubmit } = useForm({ defaultValues: data });

  return (
    <>
      <div className={styles.Wrapper}>
        <div
          className={`${styles.Inner} col-10 col-sm-10 col-md-10 col-lg-10 col-xl-8 col-xxl-8 `}
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <h3>Linktree layout </h3>
            <div className="mb-4">
              <div className="mb-4">
                <h4>Social icons position</h4>
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <div className="form-check form-check-inline align-self-center">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="position"
                    id="r1"
                    value="top"
                    {...register(`iconsPosition`)}
                  />
                  <label htmlFor="r1">Top</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="position"
                    id="r2"
                    value="bottom"
                    {...register(`iconsPosition`)}
                  />
                  <label className="form-check-label" htmlFor="r2">
                    Bottom
                  </label>
                </div>
              </div>
            </div>

            {/* <div className="mb-3 ">
              <label className="form-label">Footer text</label>
              <input
                type="text"
                className={
                  errors.footerText ? "form-control is-invalid" : "form-control"
                }
                placeholder="Enter Footer text"
                {...register("footerText")}
              />
            </div> */}
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
export default LayoutForm;
